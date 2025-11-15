import FilterSidebar from "@/components/FilterSidebar";
import useStyles from "@/styles/styles";
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
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
    IconAlignJustified,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";
import CardSkeleton from "@/components/skeleton";
import BasicCard from "@/components/card/BasicCard";
import Image from "next/image";
import Link from "next/link";
import FilterDrawer from "@/components/drawer/FilterDrawer";
import React, {
    ChangeEvent,
    ChangeEventHandler,
    useEffect,
    useState,
} from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import SearchBanner from "@/components/banner/SearchBanner";
import {
    AllProductsDataResponse,
    AllProductsResponse,
    FilterValue,
    PageInfo,
    ProductNode,
    ProductsProps,
} from "../../../common/types";
import { getMenuItems, searchProducts } from "../../../common/api";
import { getAllCollection } from "../../../lib/collectionApi";
import { SEARCH_END_POINT } from "../../../common/constants";

export async function getServerSideProps(context: { query: { q: string } }) {
    const { query } = context;
    const { q } = query;
    const response: AllProductsDataResponse = await searchProducts({
        query: q,
    });
    const products = response?.edges;
    const filters = response?.productFilters;
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

export default function Search({
    products,
    menuItems,
    filters,
    collectionItems,
}: ProductsProps) {
    const { push, query } = useRouter();
    const { q } = query as { q: string };
    const matches = useMediaQuery("(max-width: 720px)");
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [rangeValue, setRangeValue] = useState<[number, number]>([0, 79]);
    const [pageInfo, setPageInfo] = useState<PageInfo | undefined>();
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isComponentLoading, setIsComponentLoading] =
        useState<boolean>(false);
    const [customFilters, setCustomFilters] = useState(filters);
    const [filterStates, setFilterStates] = useState<Record<string, boolean>>(
        {}
    );

    const [page, setPage] = useState<number>(1);
    const [selectedOptions, setSelectedOptions] = useState<FilterValue[]>([]);
    const fetcher = async () => {
        const response = await searchProducts({
            priceRangeFilter: rangeValue,
            query: q,
            selectedOptions,
            ...pageInfo,
        });
        const pages = response.totalCount || 1;
        setTotalCount(response?.totalCount || 0);
        setCustomFilters(response.productFilters);
        setTotalPages(Math.ceil(pages / 8));
        setPageInfo(response.pageInfo);
        return response.edges;
    };

    const { data, isLoading, mutate } = useSWR<AllProductsResponse[]>(
        SEARCH_END_POINT,
        fetcher,
        {
            fallbackData: products,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

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
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setPage(1);
        setSearchValue("");
    }, [selectedOptions, rangeValue]);

    useEffect(() => {
        const fetchData = async () => {
            setIsComponentLoading(true);
            await mutate();
            setIsComponentLoading(false);
        };
        fetchData();
    }, [q]);

    return (
        <Box>
            <Container
                className={matches ? `${classes.w100} mb-10` : classes.w90}
            >
                <div className={matches ? classes.marginN20 : "mt-5"}>
                    <SearchBanner totalCount={totalCount || 0} />
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
                                            color: "#FFF",
                                            width: "90px",
                                            height: "35px",
                                            backgroundColor: "#EF174B",
                                            border: "2px solid #EF174B",
                                            cursor: "pointer",
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
                            <Flex justify="space-between" align="center">
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
