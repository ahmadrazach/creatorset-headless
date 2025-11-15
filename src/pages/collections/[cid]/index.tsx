import AllProductBanner from "@/components/banner/AllProductBanner";
import BasicCard from "@/components/card/BasicCard";
import FilterDrawer from "@/components/drawer/FilterDrawer";
import useStyles from "@/styles/styles";
import { useRouter } from "next/router";
import { useScrollIntoView, useMediaQuery } from "@mantine/hooks";
import {
    ActionIcon,
    Box,
    Button,
    Center,
    Container,
    Flex,
    Grid,
    Input,
    Text,
    useMantineTheme,
    Pagination,
} from "@mantine/core";
import {
    IconAlignJustified,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";
import Image from "next/image";
import React, {
    ChangeEvent,
    ChangeEventHandler,
    useEffect,
    useMemo,
    useState,
} from "react";
import useSWR from "swr";
import CardSkeleton from "@/components/skeleton";
import Dropdown from "@/components/dropdown/DropDown";
import Link from "next/link";
import FilterSidebar from "@/components/FilterSidebar";
import {
    getAllProducts,
    getMenuItems,
    searchProducts,
} from "../../../../common/api";
import {
    ProductsProps,
    AllProductsResponse,
    ProductNode,
    AllProductsDataResponse,
    FilterValue,
    PageInfo,
} from "../../../../common/types";
import { END_POINT } from "../../../../common/constants";
import { getAllCollection } from "../../../../lib/collectionApi";

export async function getServerSideProps(context: { params: { cid: string } }) {
    const { params } = context;
    const response: AllProductsDataResponse = await getAllProducts({
        // eslint-disable-next-line sonarjs/no-duplicate-string
        collectionType: params.cid,
    });
    const products = response?.edges;
    const filters = response?.filters;
    const menuItems = await getMenuItems();
    const collectionItems = await getAllCollection();
    // If the collection data couldn't be fetched, return a 404
    if (!products) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            products,
            menuItems,
            filters,
            collectionItems,
        },
    };
}

function AllProduct({
    products,
    menuItems,
    filters,
    collectionItems,
}: ProductsProps) {
    const { push, query } = useRouter();
    const { cid } = query as { cid: string };
    const matches = useMediaQuery("(max-width: 720px)");
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [reverse, setReverse] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState("Featured");
    const [searchValue, setSearchValue] = useState("");
    const [rangeValue, setRangeValue] = useState<[number, number]>([0, 79]);
    const [pageInfo, setPageInfo] = useState<PageInfo | undefined>();
    const [isComponentLoading, setIsComponentLoading] =
        useState<boolean>(false);
    const [customFilters, setCustomFilters] = useState(filters);
    const [filterStates, setFilterStates] = useState<Record<string, boolean>>(
        {}
    );

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 60,
    });
    const totalPages = useMemo(() => {
        const allProductsFilter = customFilters?.find(
            filter => filter.id === "filter.v.availability"
        );

        const total = allProductsFilter
            ? allProductsFilter.values.reduce(
                  (sum, value) => sum + value.count,
                  0
              )
            : 1;
        return Math.ceil(total / 12);
    }, [customFilters]);

    const [page, setPage] = useState<number>(1);
    const [selectedOptions, setSelectedOptions] = useState<FilterValue[]>([]);
    const fetcher = async () => {
        let response: AllProductsDataResponse;
        if (searchValue) {
            response = await searchProducts({
                sortBy: selectedValue,
                reverse,
                priceRangeFilter: rangeValue,
                title: searchValue,
                selectedOptions,
                ...pageInfo,
            });
        } else {
            response = await getAllProducts({
                sortBy: selectedValue,
                reverse,
                priceRangeFilter: rangeValue,
                title: searchValue,
                collectionType: cid !== "all-products" ? cid : "all-products",
                selectedOptions,
                ...pageInfo,
            });
        }

        setCustomFilters(prev =>
            Array.isArray(response?.filters) && response.filters.length
                ? response.filters
                : prev
        );
        setPageInfo(response.pageInfo);
        return response.edges;
    };

    const { data, isLoading, mutate } = useSWR<AllProductsResponse[]>(
        END_POINT,
        fetcher,
        {
            fallbackData: products,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
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

    useEffect(() => {
        mutate(fetcher);
        setPageInfo({});
    }, [cid]);

    const handleSearchInput: ChangeEventHandler<HTMLInputElement> = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { target } = event;
        setSearchValue(target.value);
    };

    const handleSearchInputSubmit = async () => {
        setIsComponentLoading(true);
        push(`/search?q=${searchValue}`);
        setIsComponentLoading(false);
    };

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

    const loadData = async (value: number) => {
        setIsComponentLoading(true);
        if (page <= value && value <= totalPages) {
            const skip = value - page - 1;
            setPageInfo(prev => ({
                ...prev,
                isNext: true,
                currentPage: page,
                skip,
                direction: true,
                targetPage: value,
            }));
            await mutate(fetcher);
            setPage(() => {
                if (value <= totalPages) return value;
                return totalPages;
            });
        } else if (page > value && value > 0) {
            const skip = page - value - 1;
            setPageInfo(prev => ({
                ...prev,
                isNext: false,
                skip,
                direction: false,
                currentPage: page,
                targetPage: value,
            }));
            await mutate(fetcher);
            setPage(() => {
                if (value > 0) return value;
                return 1;
            });
        }
        setIsComponentLoading(false);
        scrollIntoView({
            alignment: "center",
        });
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setPage(1);
    }, [searchValue]);

    useEffect(() => {
        setPage(1);
        setSearchValue("");
    }, [selectedOptions, rangeValue, selectedValue]);

    return (
        <Box>
            <Container
                className={matches ? `${classes.w100} mb-10` : classes.w90}
                ref={targetRef}
            >
                <div className={matches ? classes.marginN20 : "mt-5"}>
                    <AllProductBanner path={cid} />
                </div>
            </Container>
            <Container className={matches ? `` : `${classes.w90} mt-10`}>
                <Grid>
                    {!matches && (
                        <FilterSidebar
                            collectionItems={collectionItems}
                            customFilters={customFilters}
                            mutate={mutate}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            rangeValue={rangeValue}
                            setRangeValue={setRangeValue}
                            filterStates={filterStates}
                            setFilterStates={setFilterStates}
                            setIsComponentLoading={setIsComponentLoading}
                        />
                    )}
                    <Grid.Col span={matches ? 12 : 9}>
                        <div
                            className={`${
                                matches ? "block" : "flex mx-5"
                            }  justify-between`}
                        >
                            {matches && (
                                <Button
                                    className="w-full rounded p-3 mt-3 flex justify-start items-center"
                                    style={{
                                        backgroundColor:
                                            theme.colorScheme === "light"
                                                ? "#E5E4E6"
                                                : "#353540",
                                        color:
                                            theme.colorScheme === "light"
                                                ? "#757592"
                                                : "#FFFFFF",
                                        height: "48px",
                                    }}
                                    onClick={handleOpen}
                                    onKeyDown={handleOpen}
                                >
                                    <div
                                        className="inline"
                                        style={{
                                            marginTop: "2px",
                                            marginLeft: "5px",
                                        }}
                                    >
                                        <IconAlignJustified size="1.4rem" />
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            marginTop: "13px",
                                            marginLeft: "5px",
                                            color:
                                                theme.colorScheme === "dark"
                                                    ? "#FFF"
                                                    : "#24242D",
                                        }}
                                    >
                                        {" "}
                                        Filters
                                    </span>
                                </Button>
                            )}
                            <Input
                                type="text"
                                style={{ width: matches ? "95%" : "" }}
                                className={
                                    matches
                                        ? `${classes.search} my-5 mr-4`
                                        : `${classes.search}`
                                }
                                onChange={handleSearchInput}
                                onKeyDown={e => {
                                    if (e.code === "Enter")
                                        handleSearchInputSubmit();
                                }}
                                placeholder="Search products"
                                rightSection={
                                    <Button
                                        style={{
                                            borderRadius: "24px",
                                            marginTop: matches ? "0" : "-18px",
                                            color: "#FFF",
                                            width: "90px",
                                            height: "38px",
                                            backgroundColor: "#EF174B",
                                            border: "2px solid #EF174B",
                                            cursor: "pointer",
                                            marginRight: matches ? "25px" : "",
                                        }}
                                        onClick={handleSearchInputSubmit}
                                    >
                                        <div
                                            style={{
                                                display: "block",
                                                marginTop: "10px",
                                                marginRight: "8px",
                                            }}
                                        >
                                            Search{" "}
                                        </div>
                                    </Button>
                                }
                            />
                            <Dropdown
                                selectedValue={selectedValue}
                                handleMenuItemActivate={handleMenuItemActivate}
                            />
                        </div>
                        <Grid className="flex m-3 mx-0">
                            {data?.map((product: ProductNode) => {
                                return (
                                    <Grid.Col sm={3} span={6}>
                                        {isLoading || isComponentLoading ? (
                                            <CardSkeleton />
                                        ) : (
                                            <BasicCard
                                                product={product}
                                                cardKey="card4"
                                            />
                                        )}
                                    </Grid.Col>
                                );
                            })}
                        </Grid>
                        {data !== undefined && data.length > 0 ? (
                            <Flex
                                justify={`${
                                    matches ? "center" : "space-between"
                                }`}
                                align="center"
                            >
                                {!searchValue && (
                                    // <Text className="text-[16px]">
                                    //     Total Pages: {totalPages}
                                    // </Text>
                                    <Pagination
                                        value={page}
                                        onChange={loadData}
                                        total={totalPages}
                                        withControls={false}
                                        sx={{
                                            ".mantine-Pagination-control[data-active]":
                                                {
                                                    backgroundColor: "#EF174B",
                                                },
                                        }}
                                    />
                                )}
                                <div
                                    className={`${
                                        matches
                                            ? "hidden"
                                            : "flex ml-6 gap-4 items-start"
                                    }`}
                                >
                                    <ActionIcon
                                        className="bg-[#EF174B] rounded"
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
                                        className="bg-[#EF174B] rounded"
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
                            </Flex>
                        ) : (
                            <Center maw={400} h={100} mx="auto">
                                <div>Product not found</div>
                            </Center>
                        )}
                    </Grid.Col>
                </Grid>
            </Container>
            {matches && (
                <div className={`${classes.w100} ${classes.marginBN120}`}>
                    <Link href="https://studio.creatorset.com/">
                        <Image
                            src="/images/MobileBanner.svg"
                            alt="Banner"
                            height={500}
                            width={1600}
                        />
                    </Link>
                </div>
            )}
            {matches && isOpen && menuItems && (
                <FilterDrawer
                    collectionItems={collectionItems}
                    isOpen={isOpen}
                    customFilters={customFilters}
                    mutate={mutate}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
            )}
        </Box>
    );
}

export default AllProduct;
