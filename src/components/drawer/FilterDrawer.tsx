import {
    Box,
    Center,
    Collapse,
    Divider,
    Drawer,
    rem,
    RangeSlider,
    ScrollArea,
    UnstyledButton,
    useMantineTheme,
    Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { KeyedMutator } from "swr";
import { useRouter } from "next/router";
import useStyles from "./styles";
import {
    AllProductsResponse,
    CollectionItem,
    Filter,
    FilterValue,
} from "../../../common/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FilterDrawer({
    isOpen,
    collectionItems,
    customFilters,
    mutate,
    selectedOptions,
    setSelectedOptions,
}: {
    isOpen: boolean;
    collectionItems: CollectionItem[] | undefined;
    customFilters: Filter[] | undefined;
    mutate: KeyedMutator<AllProductsResponse[]>;
    selectedOptions: FilterValue[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<FilterValue[]>>;
}) {
    const { query } = useRouter();
    const { cid } = query;
    const theme = useMantineTheme();
    const { classes, cx } = useStyles();
    const [opened, { close }] = useDisclosure(isOpen);
    const [filterStates, setFilterStates] = useState<Record<string, boolean>>(
        {}
    );
    const toggleCategoriesOptions = (filterId: string) => {
        setFilterStates(prevState => ({
            ...prevState,
            [filterId]: !prevState[filterId],
        }));
    };
    const optionHandler = async (option: FilterValue) => {
        // Check if the option is already selected
        const isSelected = selectedOptions.some(
            selectedOption => selectedOption.id === option.id
        );

        // Update the selectedOptions state based on whether the option is selected or not
        await setSelectedOptions(
            prevState =>
                isSelected
                    ? prevState.filter(
                          selectedOption => selectedOption.id !== option.id
                      ) // Unselect the option if it was selected
                    : [...prevState, option] // Select the option if it was not selected
        );
        mutate();
    };

    function categoriesOption(filter: Filter) {
        const options = filter.values;

        return (
            <div className="mt-3 ml-2">
                {options.map((option: FilterValue) => (
                    <div className="flex">
                        <Checkbox
                            key={option.id}
                            size={27}
                            label={option.label}
                            value={option.input}
                            sx={{
                                "& .mantine-Checkbox-label": {
                                    color:
                                        theme.colorScheme === "dark"
                                            ? "#FFFF"
                                            : theme.black,
                                },
                                ".mantine-1rnipim:checked+.___ref-icon": {
                                    color:
                                        theme.colorScheme === "dark"
                                            ? theme.white
                                            : theme.black,
                                },
                            }}
                            checked={selectedOptions.some(
                                selectedOption =>
                                    selectedOption.id === option.id
                            )}
                            onChange={() => optionHandler(option)}
                            className={classes.filterAccodionInnerItemText}
                        />
                        <span className="ml-2 mt-2">{`(${option.count})`}</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            {/* <div style={{ height: "100vh", position: "relative" }}> */}
            {/* Your main content */}
            <Drawer
                opened={opened}
                onClose={close}
                withCloseButton={false}
                // title="Authentication"
                position="bottom"
                overlayProps={{ opacity: 0.5, blur: 4 }}
                withinPortal={false}
                size="92%"
                sx={{
                    "& .mantine-Drawer-overlay": {
                        zIndex: 100,
                    },
                    "& .mantine-Drawer-body": {
                        overflowY: "visible",
                    },
                    "& .mantine-Drawer-content": {
                        overflowY: "inherit",
                    },
                }}
            >
                <div
                    style={{
                        backgroundColor: "#000",
                        position: "sticky",
                        // zIndex: "100000000",
                        top: "0px" /* Adjust the distance from the drawer */,
                        left: "80%",
                    }}
                >
                    <Divider
                        style={{
                            position: "relative",
                            top: "0px",
                            border: "2px solid #EF174B",
                            zIndex: "-1",
                        }}
                    />
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? "#2F2D37"
                                    : theme.white,
                            zIndex: "1",
                            top: "10",
                        }}
                    >
                        <IconX
                            style={{
                                // zIndex: "11111111",
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? "#2F2D37"
                                        : theme.white,
                                borderRadius: "50%",
                                border:
                                    theme.colorScheme === "dark"
                                        ? "5px solid #201F26"
                                        : "5px solid #5D5D66",
                                marginTop: "-30px",
                            }}
                            size={64}
                            strokeWidth={1}
                            onClick={close}
                            // variant="transparent"
                            aria-label="Close"
                        />
                    </div>
                </div>
                <div
                    style={{
                        width: "100%",
                        padding: "1rem",
                        maxHeight: "800px",
                        overflowX: "scroll",
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? "#2F2D37"
                                : theme.white,
                    }}
                >
                    <div className="flex justify-start items-center">
                        <span
                            style={{
                                fontSize: "28px",
                                color:
                                    theme.colorScheme === "dark"
                                        ? "#FFF"
                                        : "#24242D",
                            }}
                        >
                            {" "}
                            Filters
                        </span>
                    </div>
                    <p className="text-base">Price</p>
                    <RangeSlider
                        thumbSize={14}
                        size={5}
                        sx={{
                            "& .mantine-Slider-bar": {
                                backgroundColor: "#EF174B",
                            },
                        }}
                        styles={() => ({
                            thumb: {
                                borderWidth: rem(10),
                                borderColor: "#EF174B",
                            },
                        })}
                        mt="md"
                        defaultValue={[0, 79]}
                    />
                    <div className="text-start my-3 ml-2">
                        <input
                            type="text"
                            value={0}
                            className={`${classes.priceTextInput} inline w-2/6 pl-2`}
                        />
                        <span className="mx-2"> tot </span>
                        <input
                            type="text"
                            value={79}
                            className={`${classes.priceTextInput} inline w-2/6 pl-2`}
                        />
                    </div>
                    {customFilters?.map(filter => (
                        <React.Fragment key={filter.id}>
                            <hr className={`${classes.hrLine} mt-2 mb-2`} />
                            <UnstyledButton
                                className={classes.link}
                                onClick={() =>
                                    toggleCategoriesOptions(filter.id)
                                }
                                style={{
                                    width: "100%",
                                    paddingTop: "5%",
                                }}
                            >
                                <Center
                                    inline
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box
                                        component="span"
                                        className={`${classes.filterAccodionTitle} text-base ml-1`}
                                    >
                                        {filter.label}
                                    </Box>
                                    {filterStates[filter.id] ? (
                                        <IconChevronUp size={16} color="#FFF" />
                                    ) : (
                                        <IconChevronDown
                                            size={16}
                                            color="#FFF"
                                        />
                                    )}
                                </Center>
                            </UnstyledButton>
                            <Collapse in={filterStates[filter.id]}>
                                {categoriesOption(filter)}
                            </Collapse>
                        </React.Fragment>
                    ))}
                    <hr className={`${classes.hrLine} mt-5 mb-10`} />
                    <h3
                        className={
                            theme.colorScheme === "dark"
                                ? `mt-3 font-bold text-white text-3xl`
                                : `mt-3 font-bold text-black text-3xl`
                        }
                    >
                        Collections
                    </h3>
                    <ScrollArea
                        className="mt-3"
                        h={500}
                        type="always"
                        styles={styles => ({
                            scrollbar: {
                                "&, &:hover": {
                                    background:
                                        styles.colorScheme === "dark"
                                            ? styles.colors.dark[6]
                                            : styles.colors.gray[0],
                                },

                                '&[data-orientation="vertical"] .mantine-ScrollArea-thumb':
                                    {
                                        backgroundColor: "#EF174B",
                                    },

                                '&[data-orientation="horizontal"]': {
                                    display: "none",
                                },

                                '&[data-orientation="vertical"]': {
                                    width: "0.5rem",
                                },
                            },

                            corner: {
                                opacity: 1,
                                background:
                                    styles.colorScheme === "dark"
                                        ? styles.colors.dark[6]
                                        : styles.colors.gray[0],
                            },
                        })}
                    >
                        {collectionItems?.map(
                            (collectionItem: CollectionItem) => {
                                return (
                                    <>
                                        <Link
                                            href={`/collections/${collectionItem.handle}`}
                                        >
                                            <h6 className="flex justify-between ms-2 me-5 mb-4 hover:text-red-600 cursor-pointer">
                                                <span
                                                    className={cx(
                                                        classes.collectionsTextTitle,
                                                        {
                                                            "text-[#EF174B]":
                                                                collectionItem.handle ===
                                                                cid,
                                                        }
                                                    )}
                                                >
                                                    {collectionItem?.title}
                                                </span>
                                                <span
                                                    className={
                                                        classes.collectionsTextContent
                                                    }
                                                >
                                                    {
                                                        collectionItem.productsCount
                                                    }
                                                </span>
                                            </h6>
                                        </Link>
                                        {/* {menuItem.items?.map(
                                                        (
                                                            nestedItem: MenuItem
                                                        ) => {
                                                            const nestedItemPath =
                                                                new URL(
                                                                    nestedItem.url
                                                                );
                                                            return (
                                                                <Link
                                                                    href={
                                                                        nestedItemPath.pathname
                                                                    }
                                                                >
                                                                    <h6 className="flex justify-between ms-2 me-5 mb-4 hover:text-red-600 cursor-pointer">
                                                                        <span>
                                                                            {
                                                                                nestedItem?.title
                                                                            }
                                                                        </span>
                                                                        <span
                                                                            className={
                                                                                classes.collectionsTextContent
                                                                            }
                                                                        >
                                                                            {1}
                                                                        </span>
                                                                    </h6>
                                                                </Link>
                                                            );
                                                        }
                                                    )} */}
                                    </>
                                );
                            }
                        )}
                    </ScrollArea>
                </div>
            </Drawer>
            {/* </div> */}

            {/* <Group position="center">
                <Button onClick={open}>Open Drawer</Button>
            </Group> */}
        </>
    );
}

export default FilterDrawer;
