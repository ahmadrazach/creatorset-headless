import {
    Avatar,
    Box,
    Button,
    Grid,
    Group,
    Input,
    Radio,
    ScrollArea,
    Select,
    Text,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import { useAppDisatch, useAppSelector } from "@/redux/store/store";
import { removeItemToCustomCart } from "@/redux/services/customCartServices";
import useStyles from "@/styles/styles";
import React, { forwardRef, useEffect, useState } from "react";
import { useBundleFormContext } from "@/context/bundleFormContext";
import componentStyles from "./styles";
import {
    BundleItemProps,
    ItemProps,
    YouTubeChannel,
} from "../../../common/types";
import { getChannels } from "../../../lib/youtubeAPI";
import useCurrencyConverter from "../currencyConverter";

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <ScrollArea>
                <Group noWrap>
                    <Avatar src={image} />

                    <div>
                        <Text className="mt-3">{label}</Text>
                    </div>
                </Group>
            </ScrollArea>
        </div>
    )
);

function BundleItem(props: BundleItemProps) {
    const { product, index } = props;
    const { title, images, description, fields, priceRange } = product.node;
    const form = useBundleFormContext();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const { classes: componentClass } = componentStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    const dispatch = useAppDisatch();
    const allFields = fields && JSON.parse(fields.value);
    const nameArray = allFields?.map((obj: { name: string }) => obj.name);
    const currencyData = useAppSelector(state => state.currency.data);
    const [channels, setChannels] = useState<YouTubeChannel[]>([]);
    const { products } = form.values;

    const fetchChannels = async (channel?: string) => {
        try {
            const response = await getChannels(channel || "");
            setChannels(response);
        } catch (error) {
            console.error("Error fetching YouTube channels:", error);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    const RadioBtnStyle = {
        "& .mantine-Radio-radio": {
            backgroundColor: "transparent",
            borderColor: theme.colorScheme === "dark" ? "white" : "black",
        },
        "& .mantine-Radio-radio:checked": {
            backgroundColor: "transparent",
            borderColor: theme.colorScheme === "dark" ? "white" : "black",
        },
        "& .mantine-Radio-label": {
            color: theme.colorScheme === "dark" ? "white" : "black",
            fontFamily: "GothamMedium",
            fontSize: "15px",
            paddingTop: "4px",
        },
        "& .mantine-Radio-icon": {
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    };
    const removeFromCart = async (nodeId: string) => {
        await removeItemToCustomCart(dispatch, nodeId);
        form.removeListItem("products", index);
    };

    const convertedPrice = useCurrencyConverter({
        price: priceRange?.minVariantPrice?.amount || "0",
        currencyData,
    });

    useEffect(() => {
        form.setFieldValue(`products.${index}.node.nameArray`, nameArray);
    }, []);

    return (
        <Grid>
            <Grid.Col md={3} lg={3}>
                <div
                    style={{
                        position: "relative",
                        padding: "10px",
                    }}
                >
                    {!matches ? (
                        <Image
                            src={
                                images?.edges[0]?.node?.originalSrc
                                    ? images?.edges[0]?.node?.originalSrc
                                    : "/images/productImage.svg"
                            }
                            height={232}
                            width={228}
                            alt="image"
                        />
                    ) : (
                        <Box className={classes.dFlex}>
                            <Image
                                src={
                                    images.edges[0].node.originalSrc
                                        ? images.edges[0].node.originalSrc
                                        : "/images/productImage.svg"
                                }
                                height={110}
                                width={110}
                                alt="image"
                            />
                            <Text
                                className="ml-2"
                                style={{
                                    color:
                                        theme.colorScheme === "dark"
                                            ? theme.white
                                            : theme.black,
                                }}
                            >
                                {title || ""}
                            </Text>
                        </Box>
                    )}
                </div>
            </Grid.Col>
            <Grid.Col md={8} lg={8}>
                <div
                    style={{
                        position: "relative",
                        padding: "10px",
                    }}
                >
                    {!matches && (
                        <div>
                            <Text className={componentClass.bundleTitleText}>
                                {title || ""}
                            </Text>
                        </div>
                    )}
                    <div>
                        <Text className={componentClass.bundleCurrencyText}>
                            {currencyData.currency} {convertedPrice}
                        </Text>
                    </div>
                    <div className="mt-3">
                        <p className={componentClass.bundleParagraphText}>
                            {description || ""}
                        </p>
                    </div>
                    {!nameArray?.includes("Channel Url") &&
                        allFields?.map(
                            (field: {
                                name: string;
                                type: string;
                                values: RadioNodeList[];
                            }) => {
                                return (
                                    <>
                                        <Box className="mt-5">
                                            <Text
                                                style={{
                                                    fontSize: rem(15),
                                                    color:
                                                        theme.colorScheme ===
                                                        "light"
                                                            ? "24242D"
                                                            : "#FFFFFF",
                                                    opacity:
                                                        theme.colorScheme ===
                                                        "light"
                                                            ? "0.8"
                                                            : "0.5",
                                                }}
                                            >
                                                {field.name}
                                            </Text>
                                        </Box>
                                        <Box>
                                            {field.type === "radio" ? (
                                                <Radio.Group
                                                    {...field}
                                                    {...form.getInputProps(
                                                        `products.${index}.node.attributes.${field.name}`
                                                    )}
                                                    required
                                                >
                                                    {field.values.map(
                                                        (
                                                            item: RadioNodeList
                                                        ) => {
                                                            return (
                                                                <Radio
                                                                    className="mb-2"
                                                                    {...item}
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </Radio.Group>
                                            ) : (
                                                <Input
                                                    sx={{
                                                        ".mantine-Input-input":
                                                            {
                                                                backgroundColor:
                                                                    theme.colorScheme ===
                                                                    "dark"
                                                                        ? "#5B5D6E"
                                                                        : "#E7E5E8",
                                                                color:
                                                                    theme.colorScheme ===
                                                                    "dark"
                                                                        ? theme.white
                                                                        : theme.black,
                                                                borderRadius:
                                                                    "10px",
                                                                border: "none",
                                                                width: "100%",
                                                                height: "35px",
                                                            },

                                                        ".mantine-Input-input::placeholder":
                                                            {
                                                                color:
                                                                    theme.colorScheme ===
                                                                    "dark"
                                                                        ? theme.white
                                                                        : theme.black,
                                                            },
                                                    }}
                                                    {...field}
                                                    {...form.getInputProps(
                                                        `products.${index}.node.attributes.${field.name}`
                                                    )}
                                                    required
                                                />
                                            )}
                                        </Box>
                                    </>
                                );
                            }
                        )}
                    {nameArray?.includes("Channel Url") && (
                        <>
                            <Box className="mt-2">
                                <Text
                                    style={{
                                        fontSize: rem(15),
                                        color:
                                            theme.colorScheme === "light"
                                                ? "24242D"
                                                : "#FFFFFF",
                                        opacity:
                                            theme.colorScheme === "light"
                                                ? "0.8"
                                                : "0.5",
                                    }}
                                >
                                    Search Channel
                                </Text>
                            </Box>
                            <Box>
                                <Select
                                    sx={{
                                        "& .mantine-Select-input": {
                                            backgroundColor:
                                                theme.colorScheme === "dark"
                                                    ? "#5B5D6E"
                                                    : "#E7E5E8",
                                            color:
                                                theme.colorScheme === "dark"
                                                    ? theme.white
                                                    : theme.black,
                                            borderRadius: "10px",
                                            border: "none",
                                        },
                                        ".mantine-Select-input::placeholder": {
                                            color:
                                                theme.colorScheme === "dark"
                                                    ? theme.white
                                                    : theme.black,
                                        },
                                    }}
                                    placeholder="Select a channel"
                                    required
                                    data={channels.map(channel => ({
                                        value: channel.username,
                                        image: channel.thumbnailUrl,
                                        label: channel.username,
                                    }))}
                                    itemComponent={SelectItem}
                                    searchable
                                    maxDropdownHeight={400}
                                    nothingFound="Channel not found"
                                    filter={(value, item) =>
                                        item.value
                                            .toLowerCase()
                                            .includes(
                                                value.toLowerCase().trim()
                                            )
                                    }
                                    searchValue={
                                        (products[index].node?.attributes
                                            ?.channelUrl as string) || ""
                                    }
                                    onSearchChange={value => {
                                        form.setFieldValue(
                                            `products.${index}.node.attributes.channelUrl`,
                                            value
                                        );
                                        fetchChannels(value);
                                    }}
                                />
                            </Box>
                            <Box className="mt-3">
                                <Radio.Group
                                    label="Customize Subscribers Count?"
                                    {...form.getInputProps(
                                        `products.${index}.node.attributes.subscribeValue`
                                    )}
                                    required
                                >
                                    <Group
                                        mt="xs"
                                        style={{
                                            display: "block",
                                        }}
                                    >
                                        <Radio
                                            value="Hide"
                                            label="Hide subscribes count"
                                            className="mt-2"
                                            sx={
                                                matches
                                                    ? RadioBtnStyle
                                                    : undefined
                                            }
                                        />
                                        <Radio
                                            value="Use"
                                            label="Use current count"
                                            className="mt-2"
                                            sx={
                                                matches
                                                    ? RadioBtnStyle
                                                    : undefined
                                            }
                                        />
                                        <Radio
                                            value="Yes"
                                            label="Yes"
                                            className="mt-2"
                                            sx={
                                                matches
                                                    ? RadioBtnStyle
                                                    : undefined
                                            }
                                        />
                                    </Group>
                                </Radio.Group>
                            </Box>
                            {products[index].node?.attributes
                                ?.subscribeValue === "Yes" && (
                                <>
                                    <Box className="mt-5">
                                        <Text
                                            style={{
                                                fontSize: rem(15),
                                                color:
                                                    theme.colorScheme ===
                                                    "light"
                                                        ? "24242D"
                                                        : "#FFFFFF",
                                                opacity:
                                                    theme.colorScheme ===
                                                    "light"
                                                        ? "0.8"
                                                        : "0.5",
                                            }}
                                        >
                                            Subscribers Count
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Input
                                            sx={{
                                                ".mantine-Input-input": {
                                                    backgroundColor:
                                                        theme.colorScheme ===
                                                        "dark"
                                                            ? "#5B5D6E"
                                                            : "#E7E5E8",
                                                    color:
                                                        theme.colorScheme ===
                                                        "dark"
                                                            ? theme.white
                                                            : theme.black,
                                                    borderRadius: "10px",
                                                    border: "none",
                                                    width: "100%",
                                                    height: "35px",
                                                },

                                                ".mantine-Input-input::placeholder":
                                                    {
                                                        color:
                                                            theme.colorScheme ===
                                                            "dark"
                                                                ? theme.white
                                                                : theme.black,
                                                    },
                                            }}
                                            type="number"
                                            placeholder="Value between 0 and 999,999,999"
                                            required
                                            {...form.getInputProps(
                                                `products.${index}.node.attributes.subscribeCount`
                                            )}
                                        />
                                    </Box>
                                </>
                            )}
                        </>
                    )}
                </div>
            </Grid.Col>
            <Grid.Col
                sm={12}
                md={1}
                lg={1}
                ml="3"
                mb={12}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                }}
            >
                <div
                    style={{
                        position: "fixed",
                        right: "0",
                    }}
                >
                    <Button
                        className={`${componentClass.Linkh6} ${componentClass.removeBtn} `}
                        onClick={() => removeFromCart(product.node.id)}
                    >
                        <IconX
                            size={24}
                            strokeWidth={1.5}
                            color={
                                theme.colorScheme === "dark"
                                    ? theme.white
                                    : theme.black
                            }
                        />
                    </Button>
                </div>
            </Grid.Col>
        </Grid>
    );
}

export default BundleItem;
