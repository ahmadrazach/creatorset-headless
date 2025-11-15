import useStyles from "@/styles/styles";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Stack,
    Text,
} from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { useAppDisatch, useAppSelector } from "@/redux/store/store";
import { setCount, setCustomCart } from "@/redux/services/cartServices";
import { clearCustomCart } from "@/redux/reducers/customBundle";
import { useEffect, useMemo, useState } from "react";
import { useBundleFormContext } from "@/context/bundleFormContext";
import componentStyles from "./styles";
import { ProductNode, RetrieveCartResponse } from "../../../common/types";
import BundleItem from "./BundleItem";
import { retrieveCart, updateCustomCart } from "../../../common/api";
import itemCurrencyConverter from "../itemcurrencyConverter";
import useCurrencyConverter from "../currencyConverter";

function BundleSection({ open }: { open: () => void }) {
    const form = useBundleFormContext();
    const [bundleDiscount] = useLocalStorage<number>({
        key: "selected-bundle",
    });
    const { products } = form.values;
    const { classes } = useStyles();
    const { classes: componentClass } = componentStyles();
    const currencyData = useAppSelector(state => state.currency.data);
    const cartData = useAppSelector(state => state.cart.data);
    const [productPrices, setProductPrices] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const matches = useMediaQuery("(max-width: 769px)");
    const dispatch = useAppDisatch();

    const addToCartHandler = async () => {
        setIsLoading(true);
        if (!cartData.id) {
            try {
                await setCustomCart(dispatch, products);
                form.reset();
            } catch (error) {
                // Handle error
                console.log("Error while creating cart", error);
            } finally {
                setIsLoading(false);
            }
        }
        try {
            await updateCustomCart(cartData.id, products);
            const response: RetrieveCartResponse = await retrieveCart(
                cartData.id
            );
            const updatedCartData = response?.lines?.edges?.map(
                edge => edge.node
            );
            await setCount(
                dispatch,
                updatedCartData.length,
                updatedCartData.length === 0 ? "" : cartData.id
            );
            dispatch(clearCustomCart());
            form.reset();
        } catch (error) {
            // Handle error
            console.log("Error while updating cart", error);
        } finally {
            setIsLoading(false);
        }
    };

    const discount = useCurrencyConverter({
        price: bundleDiscount?.toString(),
        currencyData,
    });

    const fetchProductsCurrencies = async () => {
        try {
            const data = await itemCurrencyConverter({
                dataNodes:
                    Array.isArray(products) && products.length
                        ? products.map(product =>
                              parseFloat(
                                  product.node.priceRange.minVariantPrice.amount
                              )
                          )
                        : [0],
                currencyData,
            });
            setProductPrices(data);
        } catch (error) {
            console.error("Error fetching YouTube channels:", error);
        }
    };

    const totalAmount = useMemo(() => {
        const total = productPrices.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        return total.toFixed(2);
    }, [productPrices]);

    const bundleItems = useMemo(() => {
        switch (bundleDiscount) {
            case 5:
                return 3;
            case 7:
                return 4;
            case 10:
                return 5;

            default:
                return 3;
        }
    }, [bundleDiscount]);

    useEffect(() => {
        fetchProductsCurrencies();
    }, [products, currencyData]);

    return (
        <Container
            className={
                matches
                    ? `${classes.w100} ${classes.marginBN120}`
                    : `${classes.w90}`
            }
        >
            <form onSubmit={form.onSubmit(addToCartHandler)}>
                <Grid>
                    <Grid.Col sm={12} md={9} lg={9}>
                        <Container
                            className={
                                matches
                                    ? `${componentClass.productsBanner} mt-5 w-full rounded-none`
                                    : `${componentClass.productsBanner} `
                            }
                        >
                            {Array.isArray(products) && products.length ? (
                                products.map(
                                    (product: ProductNode, index: number) => {
                                        return (
                                            <>
                                                <BundleItem
                                                    product={product}
                                                    index={index}
                                                />
                                                {index <
                                                    products.length - 1 && (
                                                    <Divider size="md" />
                                                )}
                                            </>
                                        );
                                    }
                                )
                            ) : (
                                <Text className="text-center">
                                    No Products in the bundle
                                </Text>
                            )}
                        </Container>
                        <Grid>
                            {products.length < bundleItems && (
                                <Grid.Col md={12} lg={12}>
                                    <Container
                                        className={`${classes.w100} ${classes.dFlex} mt-5`}
                                    >
                                        <Button
                                            className={`${componentClass.bundleCheckoutBtn} ${componentClass.Linkh6} ${componentClass.Active} mb-5`}
                                            sx={{
                                                minWidth: !matches
                                                    ? "95%"
                                                    : "96%",
                                            }}
                                            onClick={open}
                                        >
                                            <div
                                                className="pt-4"
                                                style={{ fontSize: "21px" }}
                                            >
                                                Add Product To Bundle
                                            </div>
                                        </Button>
                                    </Container>
                                </Grid.Col>
                            )}
                        </Grid>
                    </Grid.Col>

                    <Grid.Col
                        sm={12}
                        md={3}
                        lg={3}
                        className={matches ? `${classes.marginN40}` : ``}
                    >
                        <Container
                            className={
                                matches
                                    ? `${classes.w90} ${componentClass.CheckoutBanner} mt-5 mb-10`
                                    : `${classes.w90} ${componentClass.CheckoutBanner} ml-2`
                            }
                        >
                            <Stack>
                                <Text
                                    ta="center"
                                    className={componentClass.bundleCartText}
                                >
                                    Build your own bundle
                                </Text>
                                <Text
                                    ta="center"
                                    className={`${componentClass.priceText} mt-2`}
                                >
                                    {discount} {currencyData.currency}
                                </Text>
                                <Text
                                    ta="center"
                                    className={componentClass.bundleCartText}
                                >
                                    Off
                                </Text>
                                <Text
                                    ta="center"
                                    className={componentClass.bundleCartDimText}
                                >
                                    Build your own bundle by selecting 3
                                    animations of your choice.
                                </Text>
                                <hr className={`${classes.hrLine} mb-5`} />
                                <Box className="flex justify-around">
                                    <span
                                        className={
                                            componentClass.cartSubTotalText
                                        }
                                    >
                                        Subtotal
                                    </span>
                                    <span
                                        className={
                                            componentClass.cartSubTotalText
                                        }
                                    >
                                        {totalAmount} {currencyData.currency}
                                    </span>
                                </Box>
                                <Box className="flex justify-around">
                                    <span
                                        className={
                                            componentClass.cartSubTotalText
                                        }
                                    >
                                        Discount
                                    </span>
                                    <span
                                        className={
                                            componentClass.cartSubTotalText
                                        }
                                    >
                                        -{discount} {currencyData.currency}
                                    </span>
                                </Box>
                                <Box className="flex justify-around mb-1">
                                    <span
                                        className={componentClass.cartPriceText}
                                    >
                                        Total
                                    </span>
                                    <span
                                        className={componentClass.cartPriceText}
                                    >
                                        {(
                                            parseFloat(totalAmount) -
                                            parseFloat(discount)
                                        ).toFixed(2)}{" "}
                                        {currencyData.currency}
                                    </span>
                                </Box>
                                <Button
                                    type="submit"
                                    className={`${componentClass.bundleCheckoutBtn} ${componentClass.Linkh6} ${componentClass.Active} mb-5`}
                                    disabled={products?.length < bundleItems}
                                    loading={isLoading}
                                >
                                    <div
                                        className="pt-4"
                                        style={{ fontSize: "21px" }}
                                    >
                                        Add to Cart
                                    </div>
                                </Button>
                            </Stack>
                        </Container>
                    </Grid.Col>
                </Grid>
            </form>
        </Container>
    );
}

export default BundleSection;
