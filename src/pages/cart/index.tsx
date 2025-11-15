import BasicCard from "@/components/card/BasicCard";
import CartSection from "@/components/cart/CartSection";
import useStyles from "@/styles/styles";
import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Loader,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useAppDisatch, useAppSelector } from "@/redux/store/store";
import { useCallback, useEffect, useState } from "react";
import { setCount } from "@/redux/services/cartServices";
import {
    addDiscountCode,
    getAllProducts,
    removeCartItem,
    retrieveCart,
} from "../../../common/api";
import {
    BestSellingProductsProps,
    ProductNode,
    CartItem,
    RetrieveCartResponse,
    Checkout,
} from "../../../common/types";
import { setCartIdToLocalStorage } from "../../../helper/helper";
import {
    BUNDLE_3_DISCOUNT,
    BUNDLE_4_DISCOUNT,
    BUNDLE_5_DISCOUNT,
} from "../../../common/constants";

// eslint-disable-next-line sonarjs/cognitive-complexity
function Cart({ bestSellingProducts }: BestSellingProductsProps) {
    const router = useRouter();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDisatch();
    const cartData = useAppSelector(state => state.cart.data);
    const [cartDataList, setCartDataList] = useState<RetrieveCartResponse>(); // State to store cart data
    const [cartDataNodes, setCartDataNodes] = useState<CartItem[]>(); // State to store cart data
    const [checkoutUrl, setCheckoutUrl] = useState<string>(); // State to store cart data
    const [isLoading, setIsLoading] = useState(false);
    const matches = useMediaQuery("(max-width: 769px)");

    const getDiscountVoucher = useCallback((bundleItems: CartItem[]) => {
        if (Array.isArray(bundleItems) && bundleItems.length) {
            switch (bundleItems.length) {
                case 3:
                    return [BUNDLE_3_DISCOUNT];
                case 4:
                    return [BUNDLE_4_DISCOUNT];

                default:
                    if (bundleItems.length >= 5) {
                        return [BUNDLE_5_DISCOUNT];
                    }
                    return [""];
            }
        } else return [""];
    }, []);

    const removeFromCartHandler = async (cartItemId: string) => {
        if (cartData.id) {
            try {
                await removeCartItem(cartData.id, cartItemId);
                const response: RetrieveCartResponse = await retrieveCart(
                    cartData.id
                );

                const updatedCartData: CartItem[] | undefined =
                    response?.lines?.edges?.map(edge => edge.node);

                if (updatedCartData?.length === 0) {
                    setCartIdToLocalStorage("");
                }
                await setCount(
                    dispatch,
                    updatedCartData?.length,
                    updatedCartData?.length === 0 ? "" : cartData.id
                );
                setCartDataList(response);
                setCartDataNodes(updatedCartData);
            } catch (error) {
                console.error("Error fetching menu:", error);
                throw error;
            }
        }
    };
    useEffect(() => {
        const fetchCartData = async () => {
            setIsLoading(true);
            if (cartData.id !== "") {
                const response: RetrieveCartResponse = await retrieveCart(
                    cartData.id
                );

                const updatedCartData = response?.lines?.edges?.map(
                    edge => edge.node
                );
                const bundleItems = updatedCartData.filter(cartItem => {
                    // Check if attributes array contains an object with key "bundle" and value "true"
                    return cartItem?.attributes?.some(
                        attribute =>
                            attribute.key === "bundle" &&
                            attribute.value === "true"
                    );
                });
                const discountVoucher = getDiscountVoucher(bundleItems);
                const checkUrl = (await addDiscountCode(
                    cartData.id,
                    discountVoucher
                )) as Checkout;
                setCartDataList(response);
                setCartDataNodes(updatedCartData);
                setCheckoutUrl(
                    checkUrl?.cartDiscountCodesUpdate?.cart?.checkoutUrl
                );
            }
            setIsLoading(false);
        };

        fetchCartData();
    }, []);

    const items = [
        {
            title: "Home",
            href: "/",
            color: "#EE184B",
            secondaryColor: "#EE184B",
        },
        {
            title: "Cart",
            href: "/cart",
            color: "#FFFFFF",
            secondaryColor: "24242D",
        },
    ].map((item, index) => (
        <Link
            style={{
                color:
                    item.color === "#FFFFFF"
                        ? theme.colorScheme === "dark"
                            ? theme.white
                            : theme.black
                        : item.color,
                fontFamily: "GothamMedium",
            }}
            href={item.href}
            key={index}
        >
            {item.title}
        </Link>
    ));
    const goBack = () => {
        router.back();
    };

    return (
        <Box>
            {matches ? (
                <Box className="ml-5 mt-5 mb-5" onClick={goBack}>
                    <IconArrowLeft
                        size={18}
                        strokeWidth={5}
                        style={{ display: "inline" }}
                    />{" "}
                    <span>Back</span>
                </Box>
            ) : (
                <Container
                    className={matches ? classes.w100 : `${classes.w90} mb-5`}
                >
                    <div className={classes.margin80}>
                        <Breadcrumbs
                            separator={
                                <IconChevronRight
                                    size={12}
                                    strokeWidth={2}
                                    style={{
                                        marginBottom: "10px",
                                        color: "#EF174B",
                                    }}
                                />
                            }
                            mt="xs"
                        >
                            {items}
                        </Breadcrumbs>
                    </div>
                </Container>
            )}

            {isLoading ? (
                <Box className="flex justify-center py-12">
                    <Loader color="#EF174B" size="lg" />
                </Box>
            ) : cartDataNodes && cartDataNodes?.length > 0 && cartData ? (
                <>
                    <CartSection
                        cartDataNodes={cartDataNodes}
                        cartDataList={cartDataList}
                        checkoutUrl={checkoutUrl}
                        removeFromCartHandler={removeFromCartHandler}
                    />
                    <div>
                        {!matches && (
                            <Container
                                className={
                                    matches
                                        ? classes.w100
                                        : `${classes.w90} ${classes.marginBN50}`
                                }
                            >
                                <div className={`my-5 ${classes.margin100}`}>
                                    <Text
                                        className={`${classes.heading1} ${
                                            matches ? "ml-5" : "ml-1"
                                        }`}
                                    >
                                        Frequently Bought Item
                                    </Text>
                                </div>
                                <Grid>
                                    {bestSellingProducts?.map(
                                        (product: ProductNode) => {
                                            return (
                                                <Grid.Col
                                                    sm={12}
                                                    lg={2}
                                                    className={
                                                        matches
                                                            ? "ml-20"
                                                            : "ml-1"
                                                    }
                                                >
                                                    <BasicCard
                                                        product={product}
                                                        cardKey="card3"
                                                    />
                                                </Grid.Col>
                                            );
                                        }
                                    )}
                                </Grid>
                            </Container>
                        )}
                    </div>
                </>
            ) : (
                <Container
                    className={
                        matches
                            ? classes.w100
                            : `${classes.w90} ${classes.marginBN50}`
                    }
                >
                    <div className={`my-3 ${classes.margin100}`}>
                        <Text
                            className={`${classes.heading1} ${
                                matches ? "ml-5" : "ml-1 text-center"
                            }`}
                        >
                            Your cart
                        </Text>
                        <Text className="text-center">
                            Your cart is currently empty.
                        </Text>
                    </div>
                </Container>
            )}
        </Box>
    );
}

export default Cart;
export async function getStaticProps() {
    const bestSellingProducts = await getAllProducts({
        sortBy: "Featured",
        loadMore: 4,
    });
    return {
        props: { bestSellingProducts: bestSellingProducts.edges }, // will be passed to the page component as props
    };
}
