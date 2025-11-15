/* eslint-disable import/named */
import {
    IMAGE,
    NODE,
    PRICE_RANGE,
    PRODUCT_SEARCH_NODE,
    VARIANT,
} from "../common/constants";
import {
    AllAnimationOptions,
    AllProductsOptions,
    CustomOutput,
    RecursiveObject,
} from "../common/types";

const parseOutput = (jsonStr: string): CustomOutput => {
    const parsedObject = JSON.parse(jsonStr);
    if (parsedObject.variantOption) {
        return {
            variantOption: {
                name: parsedObject.variantOption.name,
                value: parsedObject.variantOption.value,
            },
        };
    }
    return parsedObject;
};
const convertObjectToString = (
    obj: RecursiveObject | RecursiveObject[]
): string => {
    const entries = Object.entries(obj).map(([key, value]) => {
        // Check if the key is a number from "0" to "7"
        if (!/^[0-7]$/.test(key)) {
            return `${key}:${
                typeof value === "object"
                    ? convertObjectToString(value)
                    : JSON.stringify(value)
            }`;
        }
        return typeof value === "object"
            ? convertObjectToString(value)
            : JSON.stringify(value);
    });
    return `{${entries.join(", ")}}`;
};

const getPaginationOptions = (options?: AllProductsOptions) => {
    return options?.isNext && options.endCursor
        ? `after: "${options.endCursor}"
        first: ${options?.loadMore ?? 12}`
        : !options?.isNext &&
          options?.isNext !== undefined &&
          options?.startCursor
        ? `before: "${options.startCursor}"
        last: 12`
        : `first: ${options?.loadMore ?? 12}`;
};

export const getSearchProductsQuery = (options?: AllProductsOptions) => {
    const minPrice = options?.priceRangeFilter?.[0] ?? 0;
    const maxPrice = options?.priceRangeFilter?.[1] ?? 0;
    let customFilters;
    let filterData;
    if (
        options?.selectedOptions !== undefined &&
        options?.selectedOptions?.length > 0
    ) {
        const result = options.selectedOptions.map(data =>
            parseOutput(data.input)
        );
        customFilters = convertObjectToString(result);
        customFilters = customFilters.substring(1, customFilters.length - 1);
    }

    if (customFilters !== undefined) {
        filterData = `productFilters: [${customFilters}],`;
    } else if (options?.isProfilePage) {
        filterData = `productFilters: { productType: "${options?.collectionType}"},`;
    } else {
        filterData = `productFilters: { price: { min: ${minPrice}, max: ${maxPrice} }},`;
    }

    const paginationQuery = getPaginationOptions(options);
    return `
    {
      search(
        query: "${options?.query}" 
        ${paginationQuery}
        ${filterData}
        reverse:${options?.reverse ?? false}
        types: PRODUCT
      ) {
        productFilters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        edges {
          ${PRODUCT_SEARCH_NODE}
        }
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
        }
        totalCount
      }
    }
    fragment mediaFieldsByType on Media {
      ...on ExternalVideo {
        id
        host
        originUrl
      }
      ...on MediaImage {
        image {
          url
        }
      }
      ...on Model3d {
        sources {
          url
          mimeType
          format
          filesize
        }
      }
      ...on Video {
        sources {
          url
          mimeType
          format
          height
          width
        }
      }
    }
  `;
};

export const getQuery = (options?: AllProductsOptions) => {
    const query = `, query:"variants.price:>${
        options?.priceRangeFilter !== undefined && options?.priceRangeFilter[0]
    } AND variants.price:<=${
        options?.priceRangeFilter !== undefined && options?.priceRangeFilter[1]
    } AND title:${options?.title}"`;
    const getSortKeyValue: { [key: string]: string } = {
        "Best selling": "CREATED_AT",
        Featured: "BEST_SELLING",
        "Alphabetically, A-Z": "TITLE",
        "Alphabetically, Z-A": "TITLE",
        "Price, low to high": "PRICE",
        "Price, high to low": "PRICE",
        "Date, old to new": "CREATED_AT",
        "Date, new to old": "CREATED_AT",
    };
    const queryParam =
        options?.priceRangeFilter || options?.title
            ? `first:${options?.loadMore ?? "12"} ${query},reverse:${
                  options?.reverse ?? false
              } ${
                  options?.sortBy !== null && options?.sortBy !== undefined
                      ? `,sortKey:${getSortKeyValue[options.sortBy]}`
                      : ``
              }`
            : `first:${options?.loadMore ?? "12"} ,reverse:${
                  options?.reverse ?? false
              } ${
                  options?.sortBy !== null && options?.sortBy !== undefined
                      ? `,sortKey:${getSortKeyValue[options.sortBy]}`
                      : ``
              }`;

    return `
  {
    products(${queryParam}) {
      edges {
        ${NODE}
      }
    }
  }
  fragment mediaFieldsByType on Media {
    ...on ExternalVideo {
      id
      host
      originUrl
    }
    ...on MediaImage {
      image {
        url
      }
    }
    ...on Model3d {
      sources {
        url
        mimeType
        format
        filesize
      }
    }
    ...on Video {
      sources {
        url
        mimeType
        format
        height
        width
      }
    }
  }
`;
};

export const getMyProductsQuery = (options?: AllProductsOptions) => {
    const query = options?.tab?.includes("Green Screen")
        ? `, query:"vendor:${
              options?.vendor ? options.vendor : "creatorset"
          } && title:(Green Screen)"`
        : `, query:"vendor:${options?.vendor ? options.vendor : "creatorset"}"`;
    const getSortKeyValue: { [key: string]: string } = {
        "Best selling": "CREATED_AT",
        Featured: "BEST_SELLING",
        "Alphabetically, A-Z": "TITLE",
        "Alphabetically, Z-A": "TITLE",
        "Price, low to high": "PRICE",
        "Price, high to low": "PRICE",
        "Date, old to new": "CREATED_AT",
        "Date, new to old": "CREATED_AT",
    };
    const queryParam = options?.tab?.includes("Green Screen")
        ? `first:${options?.loadMore ?? "8"} ${query},reverse:${
              options?.reverse ?? false
          } ${
              options?.sortBy !== null && options?.sortBy !== undefined
                  ? `,sortKey:${getSortKeyValue[options.sortBy]}`
                  : ``
          }`
        : `first:${options?.loadMore ?? "8"} ,reverse:${
              options?.reverse ?? false
          } ${
              options?.sortBy !== null && options?.sortBy !== undefined
                  ? `,sortKey:${getSortKeyValue[options.sortBy]}`
                  : ``
          }`;

    return `
  {
    products(${queryParam}) {
      edges {
        ${NODE}
      }
    }
  }
  fragment mediaFieldsByType on Media {
    ...on ExternalVideo {
      id
      host
          originUrl
    }
    ...on MediaImage {
      image {
        url
      }
    }
    ...on Model3d {
      sources {
        url
        mimeType
        format
        filesize
      }
    }
    ...on Video {
      sources {
        url
        mimeType
        format
        height
        width
      }
    }
  }
`;
};
export const getProductsByHandleQuery = (options?: AllProductsOptions) => {
    const getSortKeyValue: { [key: string]: string } = {
        "Best selling": "CREATED",
        Featured: "BEST_SELLING",
        "Alphabetically, A-Z": "TITLE",
        "Alphabetically, Z-A": "TITLE",
        "Price, low to high": "PRICE",
        "Price, high to low": "PRICE",
        "Date, old to new": "CREATED",
        "Date, new to old": "CREATED",
    };

    const sortKey = options?.sortBy
        ? `sortKey:${getSortKeyValue[options.sortBy]}`
        : "";
    const minPrice = options?.priceRangeFilter?.[0] ?? 0;
    const maxPrice = options?.priceRangeFilter?.[1] ?? 0;
    let customFilters;
    let filterData;
    if (
        options?.selectedOptions !== undefined &&
        options?.selectedOptions?.length > 0
    ) {
        const result = options.selectedOptions.map(data =>
            parseOutput(data.input)
        );
        customFilters = convertObjectToString(result);
        customFilters = customFilters.substring(1, customFilters.length - 1);
    }

    if (customFilters !== undefined) {
        filterData = `filters: [${customFilters}],`;
    } else {
        filterData = `filters: { price: { min: ${minPrice}, max: ${maxPrice} }},`;
    }

    const paginationQuery = getPaginationOptions(options);

    return `
  {
    collectionByHandle(
      handle: "${options?.collectionType}"	
    ) {
      products(
        ${sortKey}
        ${filterData}
        reverse:${options?.reverse ?? false}
        ${paginationQuery}
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        edges {
          ${NODE}
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  fragment mediaFieldsByType on Media {
    ...on ExternalVideo {
      id
      host
      originUrl
    }
    ...on MediaImage {
      image {
        url
      }
    }
    ...on Model3d {
      sources {
        url
        mimeType
        format
        filesize
      }
    }
    ...on Video {
      sources {
        url
        mimeType
        format
        height
        width
      }
    }
  }
`;
};

export const getAnimationQuery = (options?: AllAnimationOptions) => {
    const getSortKeyValue: { [key: string]: string } = {
        "Best selling": "CREATED",
        Featured: "BEST_SELLING",
        "Alphabetically, A-Z": "TITLE",
        "Alphabetically, Z-A": "TITLE",
        "Price, low to high": "PRICE",
        "Price, high to low": "PRICE",
        "Date, old to new": "CREATED",
        "Date, new to old": "CREATED",
    };

    const sortKey = options?.sortBy
        ? `sortKey:${getSortKeyValue[options.sortBy]}`
        : "";

    const filterData = options?.title
        ? `, filters: { productType: ${options?.title}}`
        : "";

    return `
    {
      collectionByHandle(handle: "bundleable") {
        products(${sortKey}, first:250,reverse:${
        options?.reverse ?? false
    }${filterData}) {
          edges {
            ${NODE}
          }
        }
      }
    }
    fragment mediaFieldsByType on Media {
      ...on ExternalVideo {
        id
        host
            originUrl
      }
      ...on MediaImage {
        image {
          url
        }
      }
      ...on Model3d {
        sources {
          url
          mimeType
          format
          filesize
        }
      }
      ...on Video {
        sources {
          url
          mimeType
          format
          height
          width
        }
      }
    }
  `;
};

export const getSingleProductQuery = (handle: string) => {
    return `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        delivered_files:metafield(namespace: "global", key: "delivered_files") {
          type
          value
         }
         fields:metafield(namespace: "global", key: "fields") {
           type
           value
         }
         whatyouget:metafield(namespace: "global", key: "whatyouget") {
           type
           value
          }
        audio:metafield(namespace: "global", key: "audio") {
         value
         }
        downloads:metafield(namespace: "global", key: "downloads") {
        value
         }
        views:metafield(namespace: "global", key: "views") {
        value
         }
        productType
        media(first: 10) {
          edges {
              node {
                mediaContentType
                alt
                ...mediaFieldsByType
              }
            }
          }
        vendor
        tags
        ${PRICE_RANGE}
        ${IMAGE}
        options {
          name
          values
          id
        }
        ${VARIANT}   
      }
    }
    fragment mediaFieldsByType on Media {
      ...on ExternalVideo {
        id
        host
            originUrl
      }
      ...on MediaImage {
        image {
          url
        }
      }
      ...on Model3d {
        sources {
          url
          mimeType
          format
          filesize
        }
      }
      ...on Video {
        sources {
          url
          mimeType
          format
          height
          width
        }
      }
    }
  `;
};

export const getAllRecommendedProductsQuery = (Id: string) => {
    return `
  {
    products:productRecommendations(productId: "${Id}") {
              id
              title
              handle
              description
              createdAt
              vendor
              productType
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                    minVariantPrice {
                  amount
                  currencyCode
                }
              }
              media(first: 10) {
                edges {
                    node {
                      mediaContentType
                      alt
                      ...mediaFieldsByType
                    }
                  }
                }
              ${VARIANT}   
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
  }
  }
  fragment mediaFieldsByType on Media {
    ...on ExternalVideo {
      id
      host
          originUrl
    }
    ...on MediaImage {
      image {
        url
      }
    }
    ...on Model3d {
      sources {
        url
        mimeType
        format
        filesize
      }
    }
    ...on Video {
      sources {
        url
        mimeType
        format
        height
        width
      }
    }
  }
`;
};

export const getSearchedDataQuery = (query: string) => {
    // predictiveSearch(query: "${query}") { queries { text } collections { id title } products { id title }  }
    return `
      { 
        predictiveSearch(query: "${query}") { 
          queries { text } 
          collections { id title handle } 
          products {
            id
            title 
            handle
            productType
            variants(first: 1) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                  title
                  id
                  availableForSale
                  priceV2 {
                    amount
                  }
                  compareAtPrice{
                    amount,
                    currencyCode
                  }
                }
              }
            }
            media(first: 1) {
              edges {
                node {
                  mediaContentType
                  alt
                  ...mediaFieldsByType
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
        }
      }
    }
    fragment mediaFieldsByType on Media {
      ... on ExternalVideo {
        id
        embeddedUrl
      }
      ... on MediaImage {
        image {
          url
        }
      }
      ... on Model3d {
        sources {
          url
          mimeType
          format
          filesize
        }
      }
      ... on Video {
        sources {
          url
          mimeType
          format
          height
          width
        }
      }
    }
`;
};
