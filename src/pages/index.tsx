import TopBanner from "@/components/banner/TopBanner";
import BasicCard from "@/components/card/BasicCard";
import PopularSellerCard from "@/components/card/PopularSellerCard";
import { CardsCarousel } from "@/components/carousel/CardsCarousel";
import IconList from "@/components/list/IconList";
import { HeaderTabs } from "@/components/nav/HeaderTabs";
import {
    Box,
    Button,
    Container,
    ScrollArea,
    SimpleGrid,
    Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import CardSkeleton from "@/components/skeleton";
import Dropdown from "@/components/dropdown/DropDown";
import CreatorSetStudioBanner from "@/components/banner/CreatorSetStudioBanner";
import { LatestProductsCarousel } from "@/components/carousel/LatestProductsCarousel";
import Link from "next/link";
import useStyles from "../styles/styles";
import { getAllProducts, getMenuItems } from "../../common/api";
import {
    AllProductsResponse,
    ProductNode,
    ProductsProps,
} from "../../common/types";
import { END_POINT } from "../../common/constants";
import { getPopularSeller } from "../../lib/populerSellerAPI";
import { getHomePageReviews } from "../../lib/reviewsAPI";

export default function Home({
    products,
    InTrendProducts,
    populerSeller,
    reviews,
}: ProductsProps) {
    const matches = useMediaQuery("(max-width: 720px)");
    const { classes, cx } = useStyles();
    const [activeTab, setActiveTab] = useState<string | null>("In Trend");
    const [loadMore, setLoadMore] = useState<number>(8);
    const [reverse, setReverse] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isComponentLoading, setIsComponentLoading] =
        useState<boolean>(false);
    const fetcher = async () => {
        const response = await getAllProducts({
            sortBy: selectedValue,
            loadMore,
            reverse,
            tab: activeTab,
        });
        return response.edges;
    };
    const { data, isLoading, mutate } = useSWR<AllProductsResponse[]>(
        END_POINT,
        fetcher,
        {
            fallbackData: InTrendProducts,
            revalidateOnReconnect: true,
        }
    );
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
        setSelectedValue(value);

        await mutate(fetcher);
        setIsComponentLoading(false);
    };
    const loadMoreHandler = async () => {
        setIsComponentLoading(true);
        setLoadMore(loadMore + 8);
        await mutate(fetcher);
        setIsComponentLoading(false);
    };
    const tabs = ["In Trend", "Popular", "New", "Trending Sellers"];
    const tabData = (
        <SimpleGrid
            cols={5}
            spacing="xl"
            p={0}
            breakpoints={[
                { maxWidth: "62rem", cols: 4, spacing: "md" },
                { maxWidth: "48rem", cols: 3, spacing: "sm" },
                { maxWidth: "36rem", cols: 2, spacing: "sm" },
            ]}
        >
            {data?.map((product: AllProductsResponse) => {
                return (
                    <Box>
                        {isLoading || isComponentLoading ? (
                            <CardSkeleton />
                        ) : (
                            <BasicCard product={product} cardKey="card1" />
                        )}
                    </Box>
                );
            })}
        </SimpleGrid>
    );

    const newData = (
        <SimpleGrid
            cols={5}
            spacing="xl"
            p={0}
            breakpoints={[
                { maxWidth: "62rem", cols: 4, spacing: "md" },
                { maxWidth: "48rem", cols: 3, spacing: "sm" },
                { maxWidth: "36rem", cols: 2, spacing: "sm" },
            ]}
        >
            {products?.map((product: ProductNode) => {
                return (
                    <Box>
                        {isLoading || isComponentLoading ? (
                            <CardSkeleton />
                        ) : (
                            <BasicCard product={product} cardKey="card2" />
                        )}
                    </Box>
                );
            })}
        </SimpleGrid>
    );
    const tabsData = [tabData, tabData, newData, tabData];

    return (
        <div>
            <Container className={matches ? classes.w100 : classes.w90}>
                <div className="mt-5">
                    <TopBanner />
                </div>
            </Container>
            <Container
                className={
                    matches ? `${classes.w100} mt-10` : `${classes.w95} mt-10`
                }
            >
                <Text className={`${classes.heading1} pt-20 pl-10`}>
                    Latest Arrival
                </Text>
                <div className={classes.marginTopN30}>
                    <LatestProductsCarousel InTrendProducts={InTrendProducts} />
                </div>
            </Container>
            <Container
                className={cx(classes.w90, {
                    [(classes.w100, "p-[0px]")]: matches,
                })}
            >
                <div className="my-5">
                    <Text className={classes.heading1}>Explore</Text>
                </div>
                <div style={{ position: "relative" }}>
                    {!matches ? (
                        <div
                            style={{
                                position: "absolute",
                                top: "0",
                                right: "0px",
                                zIndex: 1,
                            }}
                        >
                            <Dropdown
                                selectedValue={
                                    selectedValue !== null
                                        ? selectedValue
                                        : "Featured"
                                }
                                handleMenuItemActivate={handleMenuItemActivate}
                            />
                        </div>
                    ) : (
                        <div className="mb-5">
                            <Dropdown
                                selectedValue={
                                    selectedValue !== null
                                        ? selectedValue
                                        : "Featured"
                                }
                                handleMenuItemActivate={handleMenuItemActivate}
                            />
                        </div>
                    )}
                    <HeaderTabs
                        tabs={tabs}
                        tabsData={tabsData}
                        defaultTab="In Trend"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>
                <div
                    style={{ display: "flex", justifyContent: "center" }}
                    className="my-5"
                >
                    <Button
                        className={classes.viewBtn}
                        onClick={loadMoreHandler}
                    >
                        <div className={`${classes.ViewBtnText} pt-2`}>
                            View More
                        </div>
                    </Button>
                </div>
            </Container>

            <h6 className={`text-center mt-5 ${classes.heading1}`}>
                Popular Sellers
            </h6>
            <Container size="md">
                <PopularSellerCard populerSeller={populerSeller} />
            </Container>
            <h6 className={`text-center my-5 py-5 ${classes.heading1}`}>
                Compatible With
            </h6>
            <ScrollArea type="never">
                <IconList />
            </ScrollArea>
            {matches ? (
                <Container className={matches ? classes.w100 : classes.w90}>
                    <div className="mt-5">
                        <Link href="https://studio.creatorset.com/">
                            <Image
                                src="/images/MobileBanner.svg"
                                alt="Banner"
                                height={500}
                                width={1600}
                            />
                        </Link>
                    </div>
                </Container>
            ) : (
                <CreatorSetStudioBanner />
            )}
            <Container className={matches ? classes.w100 : classes.w90}>
                <div className="mt-5">
                    <h6
                        className={`text-center md:my-5 md:py-5 ${
                            matches ? classes.headingMobile1 : classes.heading1
                        }`}
                    >
                        What Our Customers Had To Say
                    </h6>
                    <CardsCarousel reviews={reviews} />
                </div>
            </Container>
        </div>
    );
}

export async function getStaticProps() {
    const products = await getAllProducts();
    const InTrendProducts = await getAllProducts({
        sortBy: "Featured",
        loadMore: 10,
    });
    const menuItems = await getMenuItems();
    const populerSeller = await getPopularSeller();
    const reviews = await getHomePageReviews(20);
    return {
        props: {
            products: products?.edges ? products?.edges : null,
            InTrendProducts: InTrendProducts?.edges
                ? InTrendProducts?.edges
                : null,
            menuItems,
            populerSeller,
            reviews,
        },
    };
}
