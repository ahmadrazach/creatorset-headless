import ProductCatCard from "@/components/card/ProductCatCard";
import ProductCategorisCard from "@/components/card/ProductCategorisCard";
import { HeaderTabs } from "@/components/nav/HeaderTabs";
import {
    ActionIcon,
    Box,
    Center,
    Container,
    Flex,
    Loader,
    SimpleGrid,
    Text,
} from "@mantine/core";
import React, { useState } from "react";
import useStyles from "@/styles/styles";
import Image from "next/image";
import Dropdown from "@/components/dropdown/DropDown";
import useSWR from "swr";
import CardSkeleton from "@/components/skeleton";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useMediaQuery, useScrollIntoView } from "@mantine/hooks";
import {
    fetchProfileData,
    getAllProducts,
    searchProducts,
} from "../../../common/api";
import {
    AllProductsDataResponse,
    AllProductsResponse,
    PageInfo,
    ProfileProps,
} from "../../../common/types";
import { END_POINT } from "../../../common/constants";

export async function getServerSideProps(context: {
    query: { vendor: string };
}) {
    const { query } = context;
    const userDetails = await fetchProfileData(
        query.vendor ? query.vendor.toLowerCase() : "CreatorSet".toLowerCase()
    );
    const response: AllProductsDataResponse = await getAllProducts({
        title: query.vendor
            ? query.vendor.toLowerCase()
            : "CreatorSet".toLowerCase(),
        collectionType: "all-products",
        query: query.vendor
            ? query.vendor.toLowerCase()
            : "CreatorSet".toLowerCase(),
    });
    const products = response?.edges;
    const filters = response?.filters;

    return {
        props: { userDetails, products, filters },
    };
}
export default function ProductsCategoris({
    userDetails,
    products,
    filters,
}: ProfileProps) {
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    const [dropdownValue, setDropdownValue] = useState("Featured");
    const [activeTab, setActiveTab] = useState<string | null>(`My Products`);
    const [reverse, setReverse] = useState<boolean>(false);
    const [isComponentLoading, setIsComponentLoading] =
        useState<boolean>(false);
    const [pageInfo, setPageInfo] = useState<PageInfo | undefined>();
    const [, setCustomFilters] = useState(filters);
    const [totalPages, setTotalPages] = useState(1);
    const [, setTotalCount] = useState<number>(0);
    const [greenScreenCount, setGreenScreenCount] = useState<number>(0);
    const [otherProductCount, setOtherProductCount] = useState<number>(0);
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 60,
    });

    // const totalPages = useMemo(() => {
    //     const allProductsFilter = customFilters?.find(
    //         filter => filter.id === "filter.v.availability"
    //     );

    //     const total = allProductsFilter
    //         ? allProductsFilter.values.reduce(
    //               (sum, value) => sum + value.count,
    //               0
    //           )
    //         : 1;
    //     return Math.ceil(total / 8);
    // }, [customFilters]);

    const [page, setPage] = useState<number>(1);

    const tabs = [`My Products`, `My Green Screen`];

    const fetcher = async () => {
        const response: AllProductsDataResponse = await searchProducts({
            sortBy: dropdownValue,
            reverse,
            isProfilePage: true,
            query: userDetails?.url,
            ...pageInfo,
            collectionType:
                activeTab === "My Green Screen" ? "Green Screen" : "Product",
        });
        const pages = response.totalCount || 1;
        setTotalCount(response?.totalCount || 0);
        setCustomFilters(response.productFilters);
        setTotalPages(Math.ceil(pages / 12));
        setPageInfo(response.pageInfo);

        const allProductsFilter = response.productFilters?.find(
            filter => filter.id === "filter.p.product_type"
        );

        setGreenScreenCount(
            allProductsFilter?.values?.find(
                value => value.id === "filter.p.product_type.green-screen"
            )?.count || 0
        );
        setOtherProductCount(
            response?.edges.filter(
                product =>
                    product.node.productType !== "Green Screen" &&
                    product.node.productType !== ""
            ).length || 0
        );
        return response.edges;
    };
    const { data, isLoading, mutate } = useSWR<AllProductsResponse[]>(
        END_POINT,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: products,
        }
    );

    const loadNextData = async () => {
        setIsComponentLoading(true);
        setPageInfo(prev => ({ ...prev, isNext: true }));
        await mutate(fetcher);
        setPage(prev => {
            if (prev + 1 <= totalPages) return prev + 1;
            return totalPages;
        });
        setIsComponentLoading(false);
        scrollIntoView({
            alignment: "center",
        });
    };
    const loadPreviousData = async () => {
        setIsComponentLoading(true);
        setPageInfo(prev => ({ ...prev, isNext: false }));
        await mutate(fetcher);
        setPage(prev => {
            if (prev - 1 > 0) return prev - 1;
            return 1;
        });
        setIsComponentLoading(false);
        scrollIntoView({
            alignment: "center",
        });
    };
    const handleMenuItemActivate = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const { value } = event.currentTarget;
        if (
            value === "Alphabetically, Z-A" ||
            value === "Date, new to old" ||
            value === "Price, high to low"
        ) {
            setReverse(true);
        } else {
            setReverse(false);
        }
        setIsComponentLoading(true);
        setDropdownValue(value);

        await mutate(fetcher);
        setIsComponentLoading(false);
    };

    return (
        <div>
            <Container className={classes.w100}>
                <Image
                    src="/images/productCategorisBanner.png"
                    alt="Banner"
                    height={327}
                    width={1920}
                    className="md:mt-[-40px]"
                />
            </Container>
            <Container className={classes.w90}>
                <ProductCategorisCard userDetails={userDetails} />
            </Container>
            <Container className={classes.w90} ref={targetRef}>
                <div className="my-5 mt-20">
                    <Text className={classes.heading1}>
                        {userDetails.display_name
                            ? userDetails.display_name
                            : userDetails.displayName}
                    </Text>
                </div>
                <HeaderTabs
                    tabs={tabs}
                    defaultTab={`My Products (${data?.length})`}
                    activeTab={activeTab}
                    setActiveTab={async tab => {
                        setIsComponentLoading(true);
                        setActiveTab(tab);
                        await mutate(fetcher);
                        setPage(1);
                        setIsComponentLoading(false);
                    }}
                />

                {(isComponentLoading || isLoading) && (
                    <Center maw={400} h={300} mx="auto">
                        <Loader color="#EF174B" size="lg" variant="bars" />
                    </Center>
                )}
                {activeTab === `My Products` && !isComponentLoading && (
                    <>
                        <div className="flex justify-between mb-5">
                            <div
                                style={{
                                    display: matches ? "block" : "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <div>
                                    <h6 className={`${classes.heading1} mb-3`}>
                                        My Products
                                    </h6>
                                </div>

                                {activeTab === `My Products` &&
                                    otherProductCount > 0 && (
                                        <Box
                                            style={{
                                                width: matches ? "85vw" : "",
                                            }}
                                        >
                                            <Dropdown
                                                selectedValue={dropdownValue}
                                                handleMenuItemActivate={
                                                    handleMenuItemActivate
                                                }
                                            />
                                        </Box>
                                    )}
                            </div>
                        </div>
                        <SimpleGrid
                            cols={5}
                            spacing="lg"
                            breakpoints={[
                                {
                                    maxWidth: "62rem",
                                    cols: 4,
                                    spacing: "md",
                                },
                                {
                                    maxWidth: "48rem",
                                    cols: 3,
                                    spacing: "sm",
                                },
                                {
                                    maxWidth: "36rem",
                                    cols: 2,
                                    spacing: "sm",
                                },
                            ]}
                        >
                            {data
                                ?.filter(
                                    product =>
                                        product.node.productType !==
                                            "Green Screen" &&
                                        product.node.productType !== ""
                                )
                                .map((product: AllProductsResponse) => {
                                    return (
                                        <Box>
                                            {(isLoading ||
                                                isComponentLoading) &&
                                            otherProductCount <= 0 ? (
                                                <CardSkeleton />
                                            ) : (
                                                <ProductCatCard
                                                    product={product}
                                                />
                                            )}
                                        </Box>
                                    );
                                })}
                        </SimpleGrid>
                        {activeTab === `My Products` &&
                        otherProductCount === 0 ? (
                            <Center maw={400} h={100} mx="auto">
                                <div>No products to show</div>
                            </Center>
                        ) : (
                            <Flex
                                justify="space-between"
                                align="center"
                                className="mt-5"
                            >
                                <div className="flex ml-6 gap-4 items-start">
                                    <ActionIcon
                                        className="bg-[#EF174B] rounded-full"
                                        onClick={loadPreviousData}
                                        disabled={
                                            !pageInfo?.hasPreviousPage ||
                                            isLoading ||
                                            isComponentLoading
                                        }
                                    >
                                        <IconChevronLeft color="white" />
                                    </ActionIcon>
                                    <Text className="mt-1">{page}</Text>
                                    <ActionIcon
                                        className="bg-[#EF174B] rounded-full"
                                        onClick={loadNextData}
                                        disabled={
                                            !pageInfo?.hasNextPage ||
                                            isLoading ||
                                            isComponentLoading
                                        }
                                    >
                                        <IconChevronRight color="white" />
                                    </ActionIcon>
                                </div>

                                <Text className="text-[16px]">
                                    Total Pages: {totalPages}
                                </Text>
                            </Flex>
                        )}
                    </>
                )}
                {activeTab === `My Green Screen` && !isComponentLoading && (
                    <>
                        <div className="flex justify-between mb-5">
                            <div
                                style={{
                                    display: matches ? "block" : "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <div>
                                    <h6 className={`${classes.heading1} mb-3`}>
                                        My Green Screens
                                    </h6>
                                </div>

                                {activeTab === `My Green Screen` &&
                                    greenScreenCount > 0 && (
                                        <Box
                                            style={{
                                                width: matches ? "85vw" : "",
                                            }}
                                        >
                                            <Dropdown
                                                selectedValue={dropdownValue}
                                                handleMenuItemActivate={
                                                    handleMenuItemActivate
                                                }
                                            />
                                        </Box>
                                    )}
                            </div>
                        </div>
                        <SimpleGrid
                            cols={5}
                            spacing="lg"
                            breakpoints={[
                                {
                                    maxWidth: "62rem",
                                    cols: 4,
                                    spacing: "md",
                                },
                                {
                                    maxWidth: "48rem",
                                    cols: 3,
                                    spacing: "sm",
                                },
                                {
                                    maxWidth: "36rem",
                                    cols: 2,
                                    spacing: "sm",
                                },
                            ]}
                        >
                            {data
                                ?.filter(
                                    product =>
                                        product.node.productType ===
                                        "Green Screen"
                                )
                                .map((product: AllProductsResponse) => {
                                    return (
                                        <Box>
                                            {isLoading || isComponentLoading ? (
                                                <CardSkeleton />
                                            ) : (
                                                <ProductCatCard
                                                    product={product}
                                                />
                                            )}
                                        </Box>
                                    );
                                })}
                        </SimpleGrid>
                        {activeTab === `My Green Screen` &&
                        greenScreenCount === 0 ? (
                            <Center maw={400} h={100} mx="auto">
                                <div>No products to show</div>
                            </Center>
                        ) : (
                            <Flex
                                justify="space-between"
                                align="center"
                                className="mt-5"
                            >
                                <div className="flex ml-6 gap-4 items-start">
                                    <ActionIcon
                                        className="bg-[#EF174B] rounded-full"
                                        onClick={loadPreviousData}
                                        disabled={
                                            !pageInfo?.hasPreviousPage ||
                                            isLoading ||
                                            isComponentLoading
                                        }
                                    >
                                        <IconChevronLeft color="white" />
                                    </ActionIcon>
                                    <Text className="mt-1">{page}</Text>
                                    <ActionIcon
                                        className="bg-[#EF174B] rounded-full"
                                        onClick={loadNextData}
                                        disabled={
                                            !pageInfo?.hasNextPage ||
                                            isLoading ||
                                            isComponentLoading
                                        }
                                    >
                                        <IconChevronRight color="white" />
                                    </ActionIcon>
                                </div>

                                <Text className="text-[16px]">
                                    Total Pages: {totalPages}
                                </Text>
                            </Flex>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}
