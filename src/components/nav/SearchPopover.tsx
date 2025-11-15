import {
    Box,
    Divider,
    Flex,
    Grid,
    Input,
    Loader,
    Space,
    Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { useClickOutside } from "@mantine/hooks";
import {
    Collections,
    PredictiveSearchResponse,
    Product,
    Query,
} from "../../../common/types";
import SearchedProductCard from "../card/SearchedProductCard";
import useStyles from "./styles";
import Popover from "../popover";
import { getSearchedData } from "../../../common/api";
import { SEARCH_END_POINT } from "../../../common/constants";

function SearchPopover() {
    const { classes, cx } = useStyles();
    const [searchResult, setSearchResult] = useState<
        PredictiveSearchResponse | undefined
    >();
    const [query, setQuery] = useState("");
    const [popoverOpened, setPopoverOpened] = useState(false);
    const ref = useClickOutside(() => setPopoverOpened(false));

    const fetcher = async (
        url: string,
        { arg }: { arg: { query: string } }
    ) => {
        const response = await getSearchedData(arg.query);
        setSearchResult(response);
    };

    const { trigger, isMutating } = useSWRMutation(SEARCH_END_POINT, fetcher);

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);
        trigger({ query: searchQuery });
        setPopoverOpened(true);
    };

    return (
        <Popover
            position="bottom"
            width="target"
            transitionProps={{ transition: "pop" }}
            opened={popoverOpened}
            target={
                <Input
                    className={classes.search}
                    placeholder="Super Creators"
                    value={query}
                    onChange={handleSearchInputChange}
                    onFocusCapture={() => setPopoverOpened(true)}
                    rightSection={
                        <div
                            style={{
                                borderRadius: "50%",
                                color: "#FFF",
                                width: "40px",
                                height: "38px",
                                backgroundColor: "#EF174B",
                                border: "2px solid #EF174B",
                            }}
                        >
                            <IconSearch
                                onClick={() => setPopoverOpened(true)}
                                className="cursor-pointer"
                                size="1.5rem"
                                style={{
                                    display: "block",
                                    marginTop: "5px",
                                    marginLeft: "5px",
                                }}
                            />
                        </div>
                    }
                />
            }
        >
            <Box ref={ref}>
                {isMutating ? (
                    <Box className="flex justify-center py-12">
                        <Loader color="#EF174B" size="lg" />
                    </Box>
                ) : searchResult ? (
                    <>
                        <Grid className="py-[0.75rem] px-[1rem]">
                            <Grid.Col sm={5}>
                                <Flex direction="column" gap={20}>
                                    <Box>
                                        <Text className="text-[15px] text-[#757592] !font-['Gotham']">
                                            Popular suggestion
                                        </Text>
                                        <Flex direction="column">
                                            {searchResult?.queries.map(
                                                (item: Query) => {
                                                    return (
                                                        <Text
                                                            className={cx(
                                                                classes.h6,
                                                                "cursor-pointer"
                                                            )}
                                                            onClick={() => {
                                                                setQuery(
                                                                    item.text
                                                                );
                                                                trigger({
                                                                    query: item.text,
                                                                });
                                                            }}
                                                        >
                                                            {item.text}
                                                        </Text>
                                                    );
                                                }
                                            )}
                                        </Flex>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Text className="text-[15px] text-[#757592] !font-['Gotham']">
                                            Collections
                                        </Text>
                                        <Flex direction="column">
                                            {searchResult?.collections.map(
                                                (item: Collections) => {
                                                    return (
                                                        <Link
                                                            href={`/collections/${item.handle}`}
                                                            onClick={() =>
                                                                setPopoverOpened(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                className={cx(
                                                                    classes.h6,
                                                                    "cursor-pointer"
                                                                )}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col sm={7}>
                                <Box>
                                    <Text className="text-[15px] text-[#757592] !font-['Gotham']">
                                        Products
                                    </Text>
                                    <Flex direction="column">
                                        {searchResult?.products.map(
                                            (product: Product) => {
                                                return (
                                                    <>
                                                        <SearchedProductCard
                                                            product={product}
                                                            setPopoverOpened={
                                                                setPopoverOpened
                                                            }
                                                        />
                                                        <Space h="xs" />
                                                    </>
                                                );
                                            }
                                        )}
                                    </Flex>
                                </Box>
                            </Grid.Col>
                        </Grid>
                        <Box className="bg-[#E5E4E6] pt-[0.75rem] rounded-bl-[14px] rounded-br-[14px] font-[]">
                            <Link
                                href={`/search?q=${query}`}
                                onClick={() => setPopoverOpened(false)}
                            >
                                <Text className="text-[14px] text-[#757592] text-center !font-['GothamLight']">
                                    View all{" "}
                                    <span className="text-[14px] text-[#757592]">
                                        {query}
                                    </span>{" "}
                                    Products
                                </Text>
                            </Link>
                        </Box>
                    </>
                ) : (
                    <Text className={cx(classes.h6, "block text-center py-12")}>
                        No Products found.
                    </Text>
                )}
            </Box>
        </Popover>
    );
}

export default SearchPopover;
