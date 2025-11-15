import useStyles from "@/styles/styles";
import {
    Avatar,
    Button,
    Container,
    Flex,
    Grid,
    Group,
    List,
    Stack,
    Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { useAppSelector } from "@/redux/store/store";
import { useEffect, useState } from "react";
import componentStyles from "./styles";
import { CartItem, RetrieveCartResponse } from "../../../common/types";
import useCurrencyConverter from "../currencyConverter";
import itemCurrencyConverter from "../itemcurrencyConverter";

function CartSection({
    cartDataNodes,
    cartDataList,
    checkoutUrl,
    removeFromCartHandler,
}: {
    cartDataNodes: CartItem[] | undefined;
    cartDataList: RetrieveCartResponse | undefined;
    checkoutUrl: string | undefined;
    removeFromCartHandler: (cartItemId: string) => Promise<void>;
}) {
    const { classes } = useStyles();
    const { classes: componentClass } = componentStyles();
    const currencyData = useAppSelector(state => state.currency.data);
    const matches = useMediaQuery("(max-width: 769px)");
    const [productPrices, setProductPrices] = useState<number[]>([]);
    const convertedTotalPrice = useCurrencyConverter({
        price: cartDataList?.estimatedCost?.subtotalAmount?.amount
            ? cartDataList?.estimatedCost?.subtotalAmount?.amount.toString()
            : "0",
        currencyData,
    });

    const fetchProductsCurrencies = async () => {
        try {
            const data = await itemCurrencyConverter({
                dataNodes:
                    Array.isArray(cartDataNodes) && cartDataNodes.length
                        ? cartDataNodes.map(
                              cart => cart.merchandise?.priceV2.amount || 0
                          )
                        : [0],
                currencyData,
            });
            setProductPrices(data);
        } catch (error) {
            console.error("Error fetching YouTube channels:", error);
        }
    };

    function getConvertedPrice(index: number, item: CartItem): string {
        const convertedPrice =
            productPrices.length > 0 ? productPrices[index] : 0;

        const price = parseFloat(convertedPrice.toString()) * item.quantity;
        const formattedPrice = price.toFixed(2);

        return `${formattedPrice} ${currencyData.currency ?? ""}`;
    }

    useEffect(() => {
        fetchProductsCurrencies();
    }, [cartDataNodes, currencyData]);

    return (
        <div>
            <Container
                className={
                    matches
                        ? `${classes.w100} ${classes.marginBN120}`
                        : `${classes.w90}`
                }
            >
                <Grid>
                    <Grid.Col sm={12} md={9} lg={9} order={matches ? 2 : 1}>
                        <Container
                            className={
                                matches
                                    ? `hidden`
                                    : `${componentClass.productsBannerHeader} mt-5`
                            }
                        >
                            <Grid className="xs:d-none">
                                <Grid.Col md={3} lg={3} className="pl-5">
                                    <div>Product</div>
                                </Grid.Col>
                                <Grid.Col md={5} lg={5} className="pl-5">
                                    <div>Properties</div>
                                </Grid.Col>
                                <Grid.Col md={3} lg={3} className="pl-5">
                                    <div>Price</div>
                                </Grid.Col>
                            </Grid>
                        </Container>

                        <Container
                            className={
                                matches
                                    ? `${componentClass.productsBanner} mt-5 w-full rounded-none`
                                    : `${componentClass.productsBanner}  mt-3`
                            }
                        >
                            {cartDataNodes?.map((item, index) => {
                                const {
                                    title = "",
                                    currency = "",
                                    theme = "",
                                    username = "",
                                    channelUrl = "",
                                }: {
                                    image?: string;
                                    title?: string;
                                    currency?: string;
                                    theme?: string;
                                    username?: string;
                                    channelUrl?: string;
                                } = Object.fromEntries(
                                    item.attributes
                                        ? item.attributes.map(
                                              ({ key, value }) => [key, value]
                                          )
                                        : []
                                );
                                return (
                                    <Grid
                                        className={
                                            !matches
                                                ? componentClass.hoverProduct
                                                : componentClass.hoverProductMobile
                                        }
                                    >
                                        <Grid.Col md={3} lg={3}>
                                            <div
                                                style={{
                                                    position: "relative",
                                                    padding: "10px",
                                                }}
                                            >
                                                <Group noWrap>
                                                    <Avatar
                                                        src={
                                                            item?.merchandise
                                                                ?.image?.url
                                                                ? item
                                                                      ?.merchandise
                                                                      ?.image
                                                                      ?.url
                                                                : "/images/productImage.svg"
                                                        }
                                                        size={80}
                                                        radius="md"
                                                    />
                                                    <div>
                                                        <Text
                                                            fz="lg"
                                                            fw={500}
                                                            className={
                                                                componentClass.productTitle
                                                            }
                                                        >
                                                            {title || ""}
                                                        </Text>
                                                    </div>
                                                </Group>
                                            </div>
                                        </Grid.Col>
                                        {!matches ? (
                                            <Grid.Col md={5} lg={5}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        padding: "10px",
                                                    }}
                                                >
                                                    {username !== "" ? (
                                                        <div className="mt-5">
                                                            <span
                                                                className={
                                                                    componentClass.propertyTitleText
                                                                }
                                                            >
                                                                {username &&
                                                                    " username:"}
                                                            </span>
                                                            <span
                                                                className={
                                                                    componentClass.propertyDescriptionText
                                                                }
                                                            >
                                                                {username || ""}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div>
                                                                <span
                                                                    className={
                                                                        componentClass.propertyTitleText
                                                                    }
                                                                >
                                                                    {theme &&
                                                                        `Theme:`}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        componentClass.propertyDescriptionText
                                                                    }
                                                                >
                                                                    {theme ||
                                                                        ""}
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={
                                                                    componentClass.propertyContainer
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        componentClass.propertyTitleText
                                                                    }
                                                                >
                                                                    {channelUrl &&
                                                                        `Channel Url:`}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        componentClass.propertyDescriptionText
                                                                    }
                                                                >
                                                                    {channelUrl ||
                                                                        ""}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span
                                                                    className={
                                                                        componentClass.propertyTitleText
                                                                    }
                                                                >
                                                                    {currency &&
                                                                        " Language:"}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        componentClass.propertyDescriptionText
                                                                    }
                                                                >
                                                                    {currency ||
                                                                        ""}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </Grid.Col>
                                        ) : (
                                            <Grid.Col md={6} lg={6}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <div>
                                                        <span
                                                            className={
                                                                componentClass.propertyTitleText
                                                            }
                                                        >
                                                            {channelUrl || ""}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="mb-5"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <div>
                                                            {theme && (
                                                                <Button
                                                                    className={
                                                                        componentClass.mobileTextContainer
                                                                    }
                                                                    mr="md"
                                                                >
                                                                    <div className="pt-3">
                                                                        {theme ||
                                                                            ""}
                                                                    </div>
                                                                </Button>
                                                            )}
                                                            {currency && (
                                                                <Button
                                                                    className={
                                                                        componentClass.mobileTextContainer
                                                                    }
                                                                >
                                                                    <div className="pt-3">
                                                                        {currency ||
                                                                            ""}
                                                                    </div>
                                                                </Button>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <Button
                                                                className={`${componentClass.Linkh6} ${componentClass.removeBtn} `}
                                                                onClick={() => {
                                                                    removeFromCartHandler(
                                                                        item.id
                                                                    );
                                                                }}
                                                            >
                                                                <div className="pt-2">
                                                                    x
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid.Col>
                                        )}
                                        {!matches ? (
                                            <Grid.Col md={3} lg={3}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        padding: "10px",
                                                    }}
                                                >
                                                    <div className="mt-5">
                                                        <Text
                                                            fz="lg"
                                                            fw={500}
                                                            className={
                                                                componentClass.priceText
                                                            }
                                                        >
                                                            {/* {data[index] &&
                                                                `${(
                                                                    (parseFloat(
                                                                        data[
                                                                            index
                                                                        ]
                                                                    ) ?? 0) *
                                                                    item.quantity
                                                                ).toFixed(2)} ${
                                                                    currencyData.currency ??
                                                                    ""
                                                                }`} */}
                                                            {getConvertedPrice(
                                                                index,
                                                                item
                                                            )}
                                                        </Text>
                                                    </div>
                                                    {/* <div>
                                                        <Text
                                                            fz="lg"
                                                            fw={500}
                                                            className={
                                                                componentClass.lineThroughPrice
                                                            }
                                                        >
                                                            {getConvertedPrice(
                                                                index,
                                                                item
                                                            )}
                                                        </Text>
                                                    </div> */}
                                                </div>
                                            </Grid.Col>
                                        ) : (
                                            <div
                                                className={classes.w100}
                                                style={{
                                                    display: "flex",
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <Text
                                                    fz="lg"
                                                    fw={500}
                                                    ml="md"
                                                    className={
                                                        componentClass.priceText
                                                    }
                                                >
                                                    {`${item?.merchandise?.priceV2.amount} ${item?.merchandise?.priceV2.currencyCode}`}
                                                </Text>

                                                {/* <Text
                                                    fz="lg"
                                                    ml="md"
                                                    fw={500}
                                                    className={
                                                        componentClass.lineThroughPrice
                                                    }
                                                >
                                                    {`${item?.merchandise?.priceV2.amount} ${item?.merchandise?.priceV2.currencyCode}`}
                                                </Text> */}
                                            </div>
                                        )}
                                        {!matches && (
                                            <Grid.Col
                                                sm={12}
                                                md={1}
                                                lg={1}
                                                ml="3"
                                            >
                                                <Flex
                                                    mih={70}
                                                    gap="xs"
                                                    justify="flex-end"
                                                    align="flex-end"
                                                    direction="column"
                                                    wrap="wrap"
                                                    style={{
                                                        position: "fixed",
                                                        right: "0",
                                                    }}
                                                >
                                                    <Button
                                                        className={`${componentClass.Linkh6} ${componentClass.removeBtn} `}
                                                        onClick={() => {
                                                            removeFromCartHandler(
                                                                item.id
                                                            );
                                                        }}
                                                    >
                                                        <div className="pt-2">
                                                            x
                                                        </div>
                                                    </Button>
                                                </Flex>
                                            </Grid.Col>
                                        )}
                                    </Grid>
                                );
                            })}
                            {!matches && (
                                <hr
                                    className={`${componentClass.hrLine} mt-5`}
                                />
                            )}
                            <Flex
                                mih={50}
                                gap="md"
                                justify="space-between"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "80%",
                                }}
                            >
                                <Text
                                    ta="start"
                                    className={componentClass.subTotalText}
                                >
                                    Subtotal
                                </Text>

                                <Text
                                    pt="md"
                                    ta="end"
                                    py="xl"
                                    className={
                                        componentClass.subTotalAmmountText
                                    }
                                >
                                    {`${convertedTotalPrice} ${currencyData.currency}`}
                                </Text>
                            </Flex>
                        </Container>
                    </Grid.Col>

                    <Grid.Col sm={12} md={3} lg={3} order={matches ? 1 : 2}>
                        <Container
                            className={
                                matches
                                    ? `${classes.w90} ${componentClass.CheckoutBanner} mt-5`
                                    : `${classes.w90} ${componentClass.CheckoutBanner}   mt-10 ml-10`
                            }
                            style={{
                                marginTop: "3.5rem",
                                paddingTop: "15px",
                            }}
                        >
                            <Stack>
                                <Text className={classes.heading1}>
                                    Cart {cartDataList?.lines.edges.length}
                                </Text>
                                <List type="ordered">
                                    <List.Item>
                                        1. Clone or download repository from
                                        GitHub
                                    </List.Item>
                                    <List.Item>
                                        2. Install dependencies with yarn
                                    </List.Item>
                                </List>

                                <span
                                    className={`${componentClass.checkoutBtn} ${componentClass.Linkh6} ${componentClass.Active} mb-5`}
                                >
                                    <Link href={checkoutUrl || ""}>
                                        <Text className="text-center">
                                            Checkout
                                        </Text>
                                    </Link>
                                </span>
                            </Stack>
                        </Container>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    );
}

export default CartSection;
