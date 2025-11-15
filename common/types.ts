/* eslint-disable no-undef */

export interface MP4Media {
    format: string;
    height: number;
    mimeType: string;
    url?: string;
    width: number;
}
export interface CollectionItem {
    id: string;
    title: string;
    handle: string;
    updatedAt: string;
    productsCount: number;
    sortOrder: string;
}

export interface FilterStates {
    [key: string]: boolean;
}

export interface Option {
    id: string;
    label: string;
    count: string;
}

export interface FilterValue {
    id: string;
    label: string;
    count: number;
    input: string;
}

export interface Filter {
    id: string;
    label: string;
    type: "LIST" | "PRICE_RANGE";
    values: FilterValue[];
}

export interface MediaSource {
    url?: string;
    mimeType: string;
    format: string;
    height: number;
    width: number;
}

interface VideoNode {
    mediaContentType: "VIDEO";
    alt: string;
    sources?: MediaSource[];
}

export interface MediaImageNode {
    mediaContentType: "IMAGE";
    alt: string;
    image: {
        url: string;
    };
}

type MediaNode = VideoNode | MediaImageNode;

export interface MediaEdge {
    node: {
        mediaContentType: MediaNode["mediaContentType"];
        alt: string;
        sources?: MediaSource[];
        image?: {
            url: string;
        };
    };
}

export interface Product {
    id: string;
    title: string;
    handle: string;
    description: string;
    productType: string;
    media: { edges: MediaEdge[] };
    vendor: string;
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    variants: {
        edges: {
            node: {
                selectedOptions: {
                    name: string;
                    value: string;
                }[];
                image: {
                    url: string;
                    altText: string | null;
                };
                title: string;
                id: string;
                availableForSale: boolean;
                priceV2: {
                    amount: string;
                };
                compareAtPrice: {
                    amount: string;
                    currencyCode: string;
                };
            };
        }[];
    };
    images: {
        edges: {
            node: {
                originalSrc: string;
                altText: string | null;
            };
        }[];
    };
    delivered_files: {
        type: string;
        value: string;
    };
    views?: {
        type: string;
        value: string;
    };
    downloads?: {
        type: string;
        value: string;
    };
    audio?: {
        type: string;
        value: string;
    };
    fields: {
        type: string;
        value: string;
    };
    whatyouget: {
        type: string;
        value: string;
    };
}

export interface ShopifyDataResponse {
    products: {
        edges: {
            node: Product;
        }[];
    };
}

export interface ShopifySearchResponse {
    search: {
        edges: {
            node: Product;
        }[];
    };
}

export interface PageInfo {
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    startCursor?: string;
    isNext?: boolean;
    endCursor?: string;
}
export interface ShopifyCollectionDataResponse {
    collectionByHandle: {
        products: {
            edges: {
                node: Product;
            }[];
            filters: Filter[];
            pageInfo?: PageInfo;
        };
    };
}
export interface AnimationsCollectionResponse {
    collectionByHandle: {
        products: {
            edges: {
                node: Product;
            }[];
        };
    };
}
export interface FilterCollectionDataResponse {
    edges: {
        node: Product;
    }[];
    filters: Filter[];
}
export interface AllProductsDataResponse {
    edges: {
        node: Product;
    }[];
    pageInfo?: PageInfo;
    filters?: Filter[];
    totalCount?: number;
    productFilters?: Filter[];
}
export interface AllAnimationDataResponse {
    edges: {
        node: Product;
    }[];
}
export interface AllProductsResponse {
    node: Product;
}

export interface AllProductsByCollectionResponse {
    collectionByHandle: {
        node: Product;
    };
}

export interface Collection {
    node: {
        id: string;
        title: string;
        handle: string;
    };
}

export interface MenuItem {
    id: string;
    title: string;
    url: string;
    items: MenuItem[];
}

export interface Menu {
    menu: {
        id: string;
        title: string;
        handle: string;
        items: MenuItem[];
        itemsCount: number;
    };
}

export interface MenuResponse {
    id: string;
    title: string;
    handle: string;
    items: MenuItem[];
    itemsCount: number;
}

export interface CartResponse {
    id: string;
    itemCount: number;
}

export interface CurrencyResponse {
    currency: string;
}

export interface CartRequest {
    id: string;
    quantity: number;
    image?: string;
    title?: string;
    userName?: string | null;
    productType?: string | null;
    attributes: Record<string, string | unknown>;
    channelUrl?: string | null;
    language?: string | null;
    theme?: string;
}

export interface CollectionData {
    collections: {
        edges: Collection[];
    };
}
export interface RequestOptions {
    endpoint: string;
    method: string;
    headers: {
        "X-Shopify-Storefront-Access-Token": string;
        Accept: string;
        "Content-Type": string;
    };
    body: string;
}

export interface ProductNode {
    node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        productType: string;
        attributes?: Record<string, string | unknown>;
        media: { edges: MediaEdge[] };
        vendor: string;
        priceRange: {
            minVariantPrice: {
                amount: string;
                currencyCode: string;
            };
        };
        variants: {
            edges: {
                node: {
                    selectedOptions: {
                        name: string;
                        value: string;
                    }[];
                    image: {
                        url: string;
                        altText: string | null;
                    };
                    title: string;
                    id: string;
                    availableForSale: boolean;
                    priceV2: {
                        amount: string;
                    };
                    compareAtPrice: {
                        amount: string;
                        currencyCode: string;
                    };
                };
            }[];
        };
        images: {
            edges: {
                node: {
                    originalSrc: string;
                    altText: string | null;
                };
            }[];
        };
        delivered_files: {
            type: string;
            value: string;
        };
        views?: {
            type: string;
            value: string;
        };
        downloads?: {
            type: string;
            value: string;
        };
        audio?: {
            type: string;
            value: string;
        };
        fields: {
            type: string;
            value: string;
        };
        whatyouget: {
            type: string;
            value: string;
        };
    };
}

export interface Attribute {
    key: string;
    value: string;
}
export interface CustomCartLine {
    quantity: number;
    merchandiseId: string; // or number, depending on your ID type
    attributes: Attribute[];
}
export interface ProductProps {
    node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        productType: string;
        media: { edges: MediaEdge[] };
        vendor: string;
        priceRange: {
            minVariantPrice: {
                amount: string;
                currencyCode: string;
            };
        };
        variants: {
            edges: {
                node: {
                    selectedOptions: {
                        name: string;
                        value: string;
                    }[];
                    image: {
                        url: string;
                        altText: string | null;
                    };
                    title: string;
                    id: string;
                    availableForSale: boolean;
                    priceV2: {
                        amount: string;
                    };
                    compareAtPrice: {
                        amount: string;
                        currencyCode: string;
                    };
                };
            }[];
        };
        images: {
            edges: {
                node: {
                    originalSrc: string;
                    altText: string | null;
                };
            }[];
        };

        delivered_files: {
            type: string;
            value: string;
        };
        views?: {
            type: string;
            value: string;
        };
        downloads?: {
            type: string;
            value: string;
        };
        audio?: {
            type: string;
            value: string;
        };
        fields: {
            type: string;
            value: string;
        };
        whatyouget: {
            type: string;
            value: string;
        };
    };
}

export interface AnimationProps {
    animations?: ProductNode[];
}

interface SocialMediaProfile {
    platform: string;
    url: string;
}

export interface PopulerSeller {
    views: number;
    displayName: string;
    id: string;
    socialMedia: SocialMediaProfile[];
    userId?: string;
    url: string;
    products: unknown[]; // You can replace 'any' with a more specific product type if needed
    picture_url?: string;
    profilePictureETag?: string;
    verified?: boolean;
    bio?: string;
    thumbnail?: string;
}

export interface BestSellingProductsProps {
    bestSellingProducts?: ProductNode[];
}

export interface AllProductsOptions {
    loadMore?: number;
    reverse?: boolean;
    productsCollection?: boolean;
    sortBy?: string | null;
    sortByTag?: string;
    collectionType?: string;
    priceRangeFilter?: [number, number];
    title?: string;
    query?: string;
    tab?: string | null;
    first?: number;
    last?: number;
    isNext?: boolean;
    endCursor?: string;
    startCursor?: string;
    vendor?: string;
    selectedOptions?: FilterValue[];
    isProfilePage?: boolean;
    direction?: boolean;
    currentPage?: number;
    targetPage?: number;
    skip?: number;
}
export interface AllAnimationOptions {
    sortBy?: string | null;
    title?: string;
    vendor?: string;
    reverse?: boolean;
}
export interface TopLinksProps {
    menuItems?: MenuResponse;
}
export interface CustomOutput {
    [key: string]: string | CustomOutput | CustomOutput[];
}

export interface DropDownProps {
    selectedValue: string;
    handleMenuItemActivate: (
        event: React.MouseEvent<HTMLButtonElement>
    ) => void;
}

export interface ImageNode {
    url: string;
    altText: string;
}

export interface SelectedOption {
    name: string;
    value: string;
}

export interface VariantNode {
    selectedOptions: SelectedOption[];
    image: ImageNode;
    title: string;
    id: string;
    availableForSale: boolean;
    priceV2: {
        amount: number;
    };
}

export interface Edge<T> {
    node: T;
}

export interface SingleProduct {
    id: string;
    title: string;
    handle: string;
    description: string;
    productType: string;
    media: { edges: MediaEdge[] };
    vendor: string;
    tags: string[];
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    variants: {
        edges: {
            node: {
                selectedOptions: {
                    name: string;
                    value: string;
                }[];
                image: {
                    url: string;
                    altText: string | null;
                };
                title: string;
                id: string;
                availableForSale: boolean;
                priceV2: {
                    amount: string;
                };
                compareAtPrice: {
                    amount: string;
                    currencyCode: string;
                };
                sku: string;
            };
        }[];
    };
    images: {
        edges: {
            node: {
                originalSrc: string;
                altText: string | null;
            };
        }[];
    };
    options: {
        name: string;
        values: string[];
        id: string;
    }[];
    delivered_files: {
        type: string;
        value: string;
    };
    views?: {
        type: string;
        value: string;
    };
    downloads?: {
        type: string;
        value: string;
    };
    audio?: {
        type: string;
        value: string;
    };
    fields: {
        type: string;
        value: string;
    };
    whatyouget: {
        type: string;
        value: string;
    };
}

export interface ProductQueryResponse {
    product: SingleProduct;
}

export interface SingleProductProps {
    product: SingleProduct;
}
interface RecommendedProductPriceRange {
    maxVariantPrice: {
        amount: string;
        currencyCode: string;
    };
    minVariantPrice: {
        amount: string;
        currencyCode: string;
    };
}

export interface RecommendedProduct {
    id: string;
    title: string;
    handle: string;
    description: string;
    createdAt: string;
    vendor: string;
    productType: string;
    media: { edges: MediaEdge[] };
    priceRange: RecommendedProductPriceRange;
    variants: {
        edges: {
            node: {
                selectedOptions: {
                    name: string;
                    value: string;
                }[];
                image: {
                    url: string;
                    altText: string | null;
                };
                title: string;
                id: string;
                availableForSale: boolean;
                priceV2: {
                    amount: string;
                };
                compareAtPrice: {
                    amount: string;
                    currencyCode: string;
                };
            };
        }[];
    };
    images: {
        edges: {
            node: {
                originalSrc: string;
                altText: string | null;
            };
        }[];
    };
    delivered_files: {
        type: string;
        value: string;
    };
    views?: {
        type: string;
        value: string;
    };
    downloads?: {
        type: string;
        value: string;
    };
    audio?: {
        type: string;
        value: string;
    };
    fields: {
        type: string;
        value: string;
    };
    whatyouget: {
        type: string;
        value: string;
    };
}

export interface Query {
    text: string;
}

export interface Collections {
    id: string;
    title: string;
    handle: string;
}

export interface PredictiveSearchResponse {
    queries: Query[];
    collections: Collections[];
    products: Product[];
}
export interface PredictiveSearchResult {
    predictiveSearch: {
        queries: Query[];
        collections: Collections[];
        products: Product[];
    };
}

export interface RecommendedProductResponse {
    products: RecommendedProduct[];
}

export interface RecommendedProductProps {
    products: RecommendedProduct[];
}

interface SocialMedia {
    platform: string;
    url: string;
}
export interface ProfileResponse {
    data: {
        picture_url: string;
        profilePictureETag: string;
        displayName: string;
        display_name?: string;
        userId: string;
        url: string;
        products: unknown[]; // Update this with the appropriate type for the "products" property
        bio: string;
        verified: boolean;
        thumbnail: string;
        id: string;
        socialMedia: SocialMedia[];
    };
}
export interface ProfileProps {
    userDetails: {
        picture_url: string;
        profilePictureETag: string;
        displayName?: string;
        display_name?: string;
        userId: string;
        url: string;
        products: unknown[]; // Update this with the appropriate type for the "products" property
        bio: string;
        verified: boolean;
        thumbnail: string;
        id: string;
        socialMedia: SocialMedia[];
    };
    products?: ProductNode[];
    filters?: Filter[];
    pageInfo?: PageInfo;
}

export interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    value: string;
    label: string;
}

export interface VarientProduct {
    selectedOptions: {
        name: string;
        value: string;
    }[];
    image: {
        url: string;
        altText: string | null;
    };
    title: string;
    id: string;
    availableForSale: boolean;
    priceV2: {
        amount: string;
    };
    compareAtPrice: {
        amount: string;
        currencyCode: string;
    };
}

export interface RetrieveCartResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    lines: {
        edges: {
            node: {
                id: string;
                quantity: number;
                merchandise: {
                    id: string;
                    title: string;
                    image: {
                        url: string;
                        altText: string;
                    };
                    priceV2: {
                        amount: number;
                        currencyCode: string;
                    };
                } | null;
                attributes: Attribute[];
            };
        }[];
    };
    estimatedCost: {
        totalAmount: {
            amount: number;
            currencyCode: string;
        };
        subtotalAmount: {
            amount: number;
            currencyCode: string;
        };
        totalTaxAmount: {
            amount: number;
            currencyCode: string;
        };
        totalDutyAmount: {
            amount: number;
            currencyCode: string;
        };
    };
}

interface ProductVariant {
    id: string;
    title: string;
    image: {
        url: string;
        altText: string;
    };
    priceV2: {
        amount: number;
        currencyCode: string;
    };
    compareAtPrice: {
        amount: string;
        currencyCode: string;
    };
}

export interface CartLine {
    id: string;
    quantity: number;
    merchandise: ProductVariant | null;
}

export interface CartItem {
    id: string;
    quantity: number;
    attributes?: {
        key: string;
        value: string;
    }[];
    merchandise: {
        id: string;
        title: string;
        image: {
            url: string;
            altText: string;
        };
        priceV2: {
            amount: number;
            currencyCode: string;
        };
    } | null;
}

export interface CartState {
    data: { id: string; itemCount: number };
}

export interface CustomCartState {
    data: {
        products: {
            node: {
                id: string;
                title: string;
                handle: string;
                description: string;
                productType: string;
                media: { edges: MediaEdge[] };
                vendor: string;
                priceRange: {
                    minVariantPrice: {
                        amount: string;
                        currencyCode: string;
                    };
                };
                variants: {
                    edges: {
                        node: {
                            selectedOptions: {
                                name: string;
                                value: string;
                            }[];
                            image: {
                                url: string;
                                altText: string | null;
                            };
                            title: string;
                            id: string;
                            availableForSale: boolean;
                            priceV2: {
                                amount: string;
                            };
                            compareAtPrice: {
                                amount: string;
                                currencyCode: string;
                            };
                        };
                    }[];
                };
                images: {
                    edges: {
                        node: {
                            originalSrc: string;
                            altText: string | null;
                        };
                    }[];
                };
                delivered_files: {
                    type: string;
                    value: string;
                };
                views?: {
                    type: string;
                    value: string;
                };
                downloads?: {
                    type: string;
                    value: string;
                };
                audio?: {
                    type: string;
                    value: string;
                };
                fields: {
                    type: string;
                    value: string;
                };
                whatyouget: {
                    type: string;
                    value: string;
                };
            };
        }[];
    };
}

export interface CustomCartResponse {
    node: {
        id: string;
        title: string;
        handle: string;
        isValid?: boolean;
        description: string;
        productType: string;
        media: { edges: MediaEdge[] };
        vendor: string;
        priceRange: {
            minVariantPrice: {
                amount: string;
                currencyCode: string;
            };
        };
        variants: {
            edges: {
                node: {
                    selectedOptions: {
                        name: string;
                        value: string;
                    }[];
                    image: {
                        url: string;
                        altText: string | null;
                    };
                    title: string;
                    id: string;
                    availableForSale: boolean;
                    priceV2: {
                        amount: string;
                    };
                    compareAtPrice: {
                        amount: string;
                        currencyCode: string;
                    };
                };
            }[];
        };
        images: {
            edges: {
                node: {
                    originalSrc: string;
                    altText: string | null;
                };
            }[];
        };
        delivered_files: {
            type: string;
            value: string;
        };
        views?: {
            type: string;
            value: string;
        };
        downloads?: {
            type: string;
            value: string;
        };
        audio?: {
            type: string;
            value: string;
        };
        fields: {
            type: string;
            value: string;
        };
        whatyouget: {
            type: string;
            value: string;
        };
    };
}

export interface CurrencyState {
    data: { currency: string };
}

interface Cart {
    checkoutUrl: string;
}

export interface User {
    cart: Cart;
}

export interface Checkout {
    cartDiscountCodesUpdate: {
        cart: Cart;
    };
}

export interface YouTubeChannel {
    thumbnailUrl: string;
    username: string;
    channelId: string;
}

export interface Review {
    id: number;
    title: string | null;
    body: string;
    rating: number;
    product_external_id: number;
    reviewer: {
        id: number;
        external_id: number;
        email: string;
        name: string;
        phone: string | null;
        accepts_marketing: boolean;
        unsubscribed_at: string | null;
        tags: string[] | null;
    };
    source: string;
    curated: "ok" | "not-yet";
    published: boolean;
    hidden: boolean;
    verified: "nothing" | "verified-purchase" | "unconfirmed-buyer";
    featured: boolean;
    created_at: string;
    updated_at: string;
    has_published_pictures: boolean;
    has_published_videos: boolean;
    pictures: unknown[]; // Replace 'any' with the type representing pictures data if possible
    ip_address: string;
    product_title: string;
    product_handle: string;
}

export interface ProductsProps {
    products?: ProductNode[];
    InTrendProducts?: ProductNode[];
    collections?: Collection[];
    menuItems?: MenuResponse;
    filters?: Filter[];
    pageInfo?: PageInfo;
    reviews?: Review[];
    populerSeller?: PopulerSeller[];
    collectionItems?: CollectionItem[];
}

export interface ReviewResponse {
    current_page: number;
    per_page: number;
    reviews: Review[];
}
export interface FileItem {
    filename: string;
    type: string;
    files?: FileItem[]; // This property is optional and is used only for folder types
}

export interface ExtendedMediaEdge extends MediaEdge {
    node: MediaNode;
}

export type RecursiveObject = {
    [key: string]: string | RecursiveObject | RecursiveObject[];
};

export interface NodeValueProps {
    node: {
        selectedOptions: {
            name: string;
            value: string;
        }[];
        image: {
            url: string;
            altText: string | null;
        };
        title: string;
        id: string;
        availableForSale: boolean;
        priceV2: {
            amount: string;
        };
        compareAtPrice: {
            amount: string;
            currencyCode: string;
        };
    };
}
export interface ProdNode {
    node: {
        selectedOptions: {
            name: string;
            value: string;
        }[];
        image: {
            url: string;
            altText: string | null;
        };
        title: string;
        id: string;
        availableForSale: boolean;
        priceV2: {
            amount: string;
        };
        compareAtPrice: {
            amount: string;
            currencyCode: string;
        };
    };
}

export interface BundleItemStateUpdate {
    channelData: YouTubeChannel[];
}
export interface BundleItemProps {
    product: ProductNode;
    index: number;
}
