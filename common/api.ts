/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
import { gql, GraphQLClient } from "graphql-request";
import axios from "axios";
import {
    getAllRecommendedProductsQuery,
    getAnimationQuery,
    getMyProductsQuery,
    getProductsByHandleQuery,
    getQuery,
    getSearchedDataQuery,
    getSearchProductsQuery,
    getSingleProductQuery,
} from "../utils/helper";
import {
    AllAnimationDataResponse,
    AllAnimationOptions,
    AllProductsDataResponse,
    AllProductsOptions,
    AllProductsResponse,
    AnimationsCollectionResponse,
    Attribute,
    CartRequest,
    Collection,
    CollectionData,
    CustomCartLine,
    Menu,
    MenuResponse,
    PredictiveSearchResponse,
    PredictiveSearchResult,
    ProductNode,
    ProductQueryResponse,
    ProfileResponse,
    RecommendedProduct,
    RecommendedProductResponse,
    RetrieveCartResponse,
    ShopifyCollectionDataResponse,
    // ShopifyCollectionDataResponse,
    ShopifyDataResponse,
    ShopifySearchResponse,
    SingleProduct,
} from "./types";
import {
    CONTENT_TYPE,
    END_POINT,
    SEARCH_END_POINT,
    STORE_FRONT_ACCESS_TOKEN,
} from "./constants";

const graphQLClient = new GraphQLClient(END_POINT, {
    headers: {
        "X-Shopify-Storefront-Access-Token": `${STORE_FRONT_ACCESS_TOKEN}`,
        Accept: `${CONTENT_TYPE}`,
        "Content-Type": `${CONTENT_TYPE}`,
    },
});

const graphQLSearchClient = new GraphQLClient(SEARCH_END_POINT, {
    headers: {
        "X-Shopify-Storefront-Access-Token": `${STORE_FRONT_ACCESS_TOKEN}`,
        Accept: `${CONTENT_TYPE}`,
        "Content-Type": `${CONTENT_TYPE}`,
    },
});
// async function ShopifyData(query: string): Promise<ShopifyDataResponse> {
//     const URL = `https://${domain}/api/2023-04/graphql.json`;

//     const options = {
//         endpoint: URL,
//         method: "POST",
//         headers: {
//             "X-Shopify-Storefront-Access-Token": `${storefrontAccessToken}`,
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//     };

//     try {
//         return await fetch(URL, options).then(response => {
//             return response.json();
//         });
//     } catch (error) {
//         throw new Error("Products not fetched");
//     }
// }

// export async function getAllProducts(
//     options?: AllProductsOptions
// ): Promise<AllProductsResponse[]> {
//     const query = getQuery(options);
//     const gqlQuery = gql`
//         ${query}
//     `;
//     const response = await graphQLClient.request<ShopifyDataResponse>(gqlQuery);
//     return response?.products?.edges ? response?.products?.edges : [];
// }

export async function searchProducts(
    options?: AllProductsOptions
): Promise<AllProductsDataResponse> {
    if (!options?.query) {
        return {
            edges: [],
            pageInfo: {},
            productFilters: [],
        };
    }
    const query = getSearchProductsQuery(options);
    const gqlQuery = gql`
        ${query}
    `;

    const response: ShopifyCollectionDataResponse | ShopifySearchResponse =
        await graphQLSearchClient.request<ShopifySearchResponse>(gqlQuery);

    return (response as ShopifySearchResponse)?.search;
}

export async function getAllProducts(
    options?: AllProductsOptions
): Promise<AllProductsDataResponse> {
    let query = options?.collectionType
        ? getProductsByHandleQuery(options)
        : getQuery(options);
    let gqlQuery = gql`
        ${query}
    `;

    // Array to hold all the responses
    const responses: (ShopifyCollectionDataResponse | ShopifyDataResponse)[] =
        [];

    if (options?.direction && options.currentPage && options.targetPage) {
        let previousResponse:
            | ShopifyCollectionDataResponse
            | ShopifyDataResponse
            | null = null;

        // eslint-disable-next-line no-plusplus
        for (let i = options.currentPage + 1; i <= options.targetPage; i++) {
            // Use the previous response to modify the options or query if needed
            if (previousResponse && "collectionByHandle" in previousResponse) {
                // eslint-disable-next-line no-param-reassign
                options.endCursor =
                    previousResponse.collectionByHandle.products?.pageInfo?.endCursor;
            }

            query = options?.collectionType
                ? getProductsByHandleQuery(options)
                : getQuery(options);
            gqlQuery = gql`
                ${query}
            `;

            const currentResponse = options?.collectionType
                ? // eslint-disable-next-line no-await-in-loop
                  await graphQLClient.request<ShopifyCollectionDataResponse>(
                      gqlQuery
                  )
                : await graphQLClient.request<ShopifyDataResponse>(gqlQuery);

            responses.push(currentResponse);
            previousResponse = currentResponse;
        }

        // Assuming you want the last response
        const lastResponse = responses[responses.length - 1];
        return options?.collectionType
            ? (lastResponse as ShopifyCollectionDataResponse).collectionByHandle
                  ?.products
            : (lastResponse as ShopifyDataResponse)?.products;
    }
    if (
        options?.direction === false &&
        options.currentPage &&
        options.targetPage
    ) {
        let previousResponse:
            | ShopifyCollectionDataResponse
            | ShopifyDataResponse
            | null = null;

        // eslint-disable-next-line no-plusplus
        for (let i = options.currentPage - 1; i >= options.targetPage; i--) {
            // Use the previous response to modify the options or query if needed
            if (previousResponse && "collectionByHandle" in previousResponse) {
                // eslint-disable-next-line no-param-reassign
                options.startCursor =
                    previousResponse.collectionByHandle.products?.pageInfo?.startCursor;
            }

            query = options?.collectionType
                ? getProductsByHandleQuery(options)
                : getQuery(options);
            gqlQuery = gql`
                ${query}
            `;

            const currentResponse = options?.collectionType
                ? // eslint-disable-next-line no-await-in-loop
                  await graphQLClient.request<ShopifyCollectionDataResponse>(
                      gqlQuery
                  )
                : // eslint-disable-next-line no-await-in-loop
                  await graphQLClient.request<ShopifyDataResponse>(gqlQuery);

            responses.push(currentResponse);
            previousResponse = currentResponse;
        }

        // Assuming you want the last response
        const lastResponse = responses[responses.length - 1];
        return options?.collectionType
            ? (lastResponse as ShopifyCollectionDataResponse).collectionByHandle
                  ?.products
            : (lastResponse as ShopifyDataResponse)?.products;
    }

    const response: ShopifyCollectionDataResponse | ShopifyDataResponse =
        options?.collectionType
            ? await graphQLClient.request<ShopifyCollectionDataResponse>(
                  gqlQuery
              )
            : await graphQLClient.request<ShopifyDataResponse>(gqlQuery);
    return options?.collectionType
        ? (response as ShopifyCollectionDataResponse).collectionByHandle
              ?.products
        : (response as ShopifyDataResponse)?.products;
}

export async function getAllCollections(): Promise<Collection[]> {
    const query = `{
        collections(first: 100) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }`;
    const gqlQuery = gql`
        ${query}
    `;
    const response = await graphQLClient.request<CollectionData>(gqlQuery);
    return response?.collections?.edges ? response?.collections?.edges : [];
}

export async function getSingleProduct(handle: string): Promise<SingleProduct> {
    const query = getSingleProductQuery(handle);
    const gqlQuery = gql`
        ${query}
    `;
    const response: ProductQueryResponse =
        await graphQLClient.request<ProductQueryResponse>(gqlQuery);

    return response.product;
}

export async function getAllRemommendedProducts(
    Id: string
): Promise<RecommendedProduct[]> {
    const query = getAllRecommendedProductsQuery(Id);
    const gqlQuery = gql`
        ${query}
    `;
    const response = await graphQLClient.request<RecommendedProductResponse>(
        gqlQuery
    );

    return response.products;
}

export async function getSearchedData(
    query: string
): Promise<PredictiveSearchResponse> {
    const apiQuery = getSearchedDataQuery(query);
    const gqlQuery = gql`
        ${apiQuery}
    `;

    const response = await graphQLSearchClient.request<PredictiveSearchResult>(
        gqlQuery
    );

    return {
        ...response.predictiveSearch,
        queries: response.predictiveSearch.queries.splice(0, 3),
    };
}

export async function getMenuItems(): Promise<MenuResponse> {
    const query = `
    {
      menu(handle: "main-menu-new") {
        id
        title
        handle
        items {
          id
          title
          url
          items {
            id
            title
            url
          }
        }
        itemsCount
      }
    }`;
    const gqlQuery = gql`
        ${query}
    `;
    const response = await graphQLClient.request<Menu>(gqlQuery);
    return response.menu || [];
}

// eslint-disable-next-line consistent-return
export async function fetchProfileData(
    searchParam: string
): Promise<ProfileResponse> {
    const response = await axios.get(
        `https://api.creatorset.com/api/v1/profile/getProfile?id=${searchParam}`
    );
    // eslint-disable-next-line prefer-destructuring
    const data = response.data.data;
    return data || {};
}

export async function getMyProducts(
    options?: AllProductsOptions
): Promise<AllProductsResponse[]> {
    const query = getMyProductsQuery(options);
    const gqlQuery = gql`
        ${query}
    `;

    const response: ShopifyDataResponse =
        await graphQLClient.request<ShopifyDataResponse>(gqlQuery);
    return (response as ShopifyDataResponse)?.products?.edges;
}

interface CartCreateResponse {
    cartCreate: {
        cart: {
            id: string;
        };
    };
}

export async function addToCart(cartData: CartRequest) {
    const createCartMutation = gql`
        mutation createCart($cartInput: CartInput) {
            cartCreate(input: $cartInput) {
                cart {
                    id
                }
            }
        }
    `;
    const variables = {
        cartInput: {
            lines: [
                {
                    quantity: parseInt(cartData?.quantity.toString(), 10),
                    merchandiseId: cartData?.id,
                    attributes: [
                        {
                            key: "image",
                            value: cartData.image || "",
                        },
                        {
                            key: "title",
                            value: cartData.title,
                        },
                    ],
                },
            ],
        },
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const key in cartData?.attributes) {
        // eslint-disable-next-line no-prototype-builtins
        if (cartData.attributes.hasOwnProperty(key)) {
            variables.cartInput.lines[0].attributes.push({
                key,
                // eslint-disable-next-line security/detect-object-injection
                value: cartData.attributes[key] as string,
            });
        }
    }

    try {
        const response = await graphQLClient.request<CartCreateResponse>(
            createCartMutation,
            variables
        );
        const { cartCreate } = response;
        const { cart } = cartCreate;
        return cart;
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
}

export async function addCutomItemsToCart(products: ProductNode[]) {
    const createCartMutation = gql`
        mutation createCart($cartInput: CartInput) {
            cartCreate(input: $cartInput) {
                cart {
                    id
                }
            }
        }
    `;

    const cartLines: CustomCartLine[] = [];
    if (products?.length > 0) {
        products.forEach((product: ProductNode) => {
            const attributes: Attribute[] = [
                {
                    key: "title",
                    value: product?.node?.title,
                },
            ];

            // eslint-disable-next-line no-restricted-syntax
            for (const key in product.node.attributes) {
                // eslint-disable-next-line no-prototype-builtins
                if (product.node.attributes.hasOwnProperty(key)) {
                    attributes.push({
                        key,
                        // eslint-disable-next-line security/detect-object-injection
                        value: product.node.attributes[key] as string,
                    });
                }
            }

            attributes.push({
                key: "bundle",
                value: "true",
            });

            cartLines.push({
                quantity: 1,
                merchandiseId: product.node?.variants?.edges[0]?.node?.id,
                attributes,
            });
        });
    }

    const variables = {
        cartInput: {
            lines: cartLines,
        },
    };

    try {
        const response = await graphQLClient.request<CartCreateResponse>(
            createCartMutation,
            variables
        );
        const { cartCreate } = response;
        const { cart } = cartCreate;
        return cart;
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
}

export async function updateCustomCart(
    cartId: string,
    products: ProductNode[]
) {
    const updateCartMutation = gql`
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                }
            }
        }
    `;

    const lines: CustomCartLine[] = [];
    if (products?.length > 0) {
        products.forEach((product: ProductNode) => {
            const attributes: Attribute[] = [
                {
                    key: "title",
                    value: product?.node?.title,
                },
            ];

            // eslint-disable-next-line no-restricted-syntax
            for (const key in product.node.attributes) {
                // eslint-disable-next-line no-prototype-builtins
                if (product.node.attributes.hasOwnProperty(key)) {
                    attributes.push({
                        key,
                        // eslint-disable-next-line security/detect-object-injection
                        value: product.node.attributes[key] as string,
                    });
                }
            }

            attributes.push({
                key: "bundle",
                value: "true",
            });

            lines.push({
                quantity: 1,
                merchandiseId: product.node?.variants?.edges[0]?.node?.id,
                attributes,
            });
        });
    }

    const variables = {
        cartId,
        lines,
    };
    try {
        return await graphQLClient.request(updateCartMutation, variables);
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
}

export async function updateCart(cartId: string, cartData: CartRequest) {
    const updateCartMutation = gql`
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                }
            }
        }
    `;
    const commonAttributes = [
        {
            key: "image",
            value: cartData.image || "",
        },
        {
            key: "title",
            value: cartData.title || "",
        },
    ];

    const lines = [
        {
            quantity: parseInt(cartData?.quantity.toString(), 10),
            merchandiseId: cartData?.id,
            attributes: [...commonAttributes],
        },
    ];

    // eslint-disable-next-line no-restricted-syntax
    for (const key in cartData.attributes) {
        // eslint-disable-next-line no-prototype-builtins
        if (cartData.attributes.hasOwnProperty(key)) {
            lines[0].attributes.push({
                key,
                // eslint-disable-next-line security/detect-object-injection
                value: cartData.attributes[key] as string,
            });
        }
    }

    const variables = {
        cartId,
        lines,
    };
    try {
        return await graphQLClient.request(updateCartMutation, variables);
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
}

export async function retrieveCart(cartId: string) {
    const cartQuery = gql`
        query cartQuery($cartId: ID!) {
            cart(id: $cartId) {
                id
                createdAt
                updatedAt
                lines(first: 10) {
                    edges {
                        node {
                            id
                            quantity
                            attributes {
                                key
                                value
                            }
                            merchandise {
                                ... on ProductVariant {
                                    id
                                    title
                                    image {
                                        url
                                        altText
                                    }
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
                estimatedCost {
                    totalAmount {
                        amount
                        currencyCode
                    }
                    subtotalAmount {
                        amount
                        currencyCode
                    }
                }
            }
        }
    `;
    const variables = {
        cartId,
    };
    try {
        const data: { cart: RetrieveCartResponse } =
            await graphQLClient.request(cartQuery, variables);
        return data.cart;
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
}

export async function removeCartItem(cartId: string, cartItemId: string) {
    const removeCartItemMutation = gql`
        mutation removeCartItem($cartId: ID!, $cartItemId: ID!) {
            cartLinesRemove(cartId: $cartId, lineIds: [$cartItemId]) {
                cart {
                    id
                }
            }
        }
    `;

    const variables = {
        cartId,
        cartItemId,
    };

    try {
        return await graphQLClient.request(removeCartItemMutation, variables);
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
}

export const getCheckoutUrl = async (cartId: string) => {
    const getCheckoutUrlQuery = gql`
        query checkoutURL($cartId: ID!) {
            cart(id: $cartId) {
                checkoutUrl
            }
        }
    `;
    const variables = {
        cartId,
    };
    try {
        return await graphQLClient.request(getCheckoutUrlQuery, variables);
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
};

export const addDiscountCode = async (
    cartId: string,
    discountCodes: string[]
) => {
    const getCheckoutUrlQuery = gql`
        mutation cartDiscountCodesUpdate(
            $cartId: ID!
            $discountCodes: [String!]
        ) {
            cartDiscountCodesUpdate(
                cartId: $cartId
                discountCodes: $discountCodes
            ) {
                cart {
                    checkoutUrl
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    const variables = {
        cartId,
        discountCodes,
    };
    try {
        return await graphQLClient.request(getCheckoutUrlQuery, variables);
    } catch (error) {
        const errorMessage =
            typeof error === "string" ? error : JSON.stringify(error);
        throw new Error(errorMessage);
    }
};

export async function getAllAnimation(
    options?: AllAnimationOptions
): Promise<AllAnimationDataResponse> {
    const query = getAnimationQuery(options);
    const gqlQuery = gql`
        ${query}
    `;
    const response: AnimationsCollectionResponse =
        await graphQLClient.request<AnimationsCollectionResponse>(gqlQuery);
    return (response as AnimationsCollectionResponse).collectionByHandle
        ?.products;
}
