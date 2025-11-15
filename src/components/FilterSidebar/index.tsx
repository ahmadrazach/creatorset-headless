import {
    Box,
    Center,
    Checkbox,
    Collapse,
    Grid,
    RangeSlider,
    ScrollArea,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconAlignJustified,
    IconChevronDown,
    IconChevronUp,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import useStyles from "@/styles/styles";
import { KeyedMutator } from "swr";
import { useRouter } from "next/router";
import {
    AllProductsResponse,
    CollectionItem,
    Filter,
    FilterValue,
} from "../../../common/types";

interface Props {
    collectionItems: CollectionItem[] | undefined;
    customFilters: Filter[] | undefined;
    mutate: KeyedMutator<AllProductsResponse[]>;
    selectedOptions: FilterValue[];
    rangeValue: [number, number];
    setRangeValue: (input: [number, number]) => void;
    filterStates: Record<string, boolean>;
    setFilterStates: React.Dispatch<
        React.SetStateAction<Record<string, boolean>>
    >;
    setIsComponentLoading: (input: boolean) => void;
    setSelectedOptions: React.Dispatch<React.SetStateAction<FilterValue[]>>;
}

export default function FilterSidebar({
    collectionItems,
    customFilters,
    mutate,
    selectedOptions,
    setSelectedOptions,
    rangeValue,
    setRangeValue,
    filterStates,
    setFilterStates,
    setIsComponentLoading,
}: Props) {
    const { query } = useRouter();
    const { cid } = query;
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();

    const handleSliderChange = async (newValue: [number, number]) => {
        setIsComponentLoading(true);
        setRangeValue(newValue);
        await mutate();
        setIsComponentLoading(false);
    };
    const handleInputSliderChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setIsComponentLoading(true);
        const [currentMin, currentMax] = rangeValue;
        const desiredNumber = Number(value);

        if (
            name === "min" &&
            desiredNumber >= 0 &&
            desiredNumber <= currentMax
        ) {
            setRangeValue([desiredNumber, currentMax]);
        } else if (
            name === "max" &&
            desiredNumber >= currentMin &&
            desiredNumber <= 100
        ) {
            setRangeValue([currentMin, desiredNumber]);
        }

        await mutate();
        setIsComponentLoading(false);
    };

    const toggleCategoriesOptions = (filterId: string) => {
        setFilterStates((prevState: Record<string, boolean>) => ({
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
        <Grid.Col span={3}>
            <div
                className={` p-5 rounded-xl  ${classes.bgfilter} ${classes.shadow}`}
            >
                <div className="flex justify-start items-center mb-5">
                    <div
                        className="inline"
                        style={{
                            marginTop: "-5px",
                            marginLeft: "-5px",
                        }}
                    >
                        <IconAlignJustified size="2.5rem" />
                    </div>
                    <span
                        style={{
                            fontSize: "28px",
                            marginTop: "10px",
                            marginLeft: "10px",
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
                    sx={{
                        "& .mantine-Slider-bar": {
                            backgroundColor: "#EF174B",
                        },
                    }}
                    styles={() => ({
                        thumb: {
                            borderWidth: rem(8),
                            borderColor: "#EF174B",
                        },
                    })}
                    mt="md"
                    value={rangeValue}
                    onChange={handleSliderChange}
                />
                <div className="text-start my-3 ml-2">
                    <input
                        type="number"
                        name="min"
                        value={rangeValue[0]}
                        className={`${classes.priceTextInput} inline w-2/6 pl-2`}
                        onChange={handleInputSliderChange}
                    />
                    <span className="mx-2"> tot </span>
                    <input
                        type="number"
                        name="max"
                        value={rangeValue[1]}
                        className={`${classes.priceTextInput} inline w-2/6 pl-2`}
                        onChange={handleInputSliderChange}
                    />
                </div>
                {customFilters?.map(filter => (
                    <React.Fragment key={filter.id}>
                        <hr className={`${classes.hrLine} mt-2 mb-2`} />
                        <UnstyledButton
                            className={classes.link}
                            onClick={() => toggleCategoriesOptions(filter.id)}
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
                                    <IconChevronDown size={16} color="#FFF" />
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
                    {collectionItems?.map((collectionItem: CollectionItem) => {
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
                                            {collectionItem.productsCount}
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
                    })}
                </ScrollArea>
            </div>
        </Grid.Col>
    );
}
