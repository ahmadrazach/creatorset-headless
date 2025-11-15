import { Box, Flex, Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useAppSelector, useAppDisatch } from "@/redux/store/store";
import { addItemToCustomCart } from "@/redux/services/customCartServices";
import { useBundleFormContext } from "@/context/bundleFormContext";
import useStyles from "./styles";
import { ProductNode } from "../../../common/types";
import useCurrencyConverter from "../currencyConverter";

// eslint-disable-next-line sonarjs/cognitive-complexity
function ModalPopularBundlesList({
    product,
    close,
}: {
    product: ProductNode;
    close: () => void;
}) {
    const { title, images, variants } = product.node || {};
    const dispatch = useAppDisatch();
    const form = useBundleFormContext();

    function calculateDiscountedPrice(compareAtPrice: string, priceV2: string) {
        const originalPrice = parseFloat(compareAtPrice || "0");
        const discountedPrice = parseFloat(priceV2 || "0");

        const discountedAmount = originalPrice - discountedPrice;
        const discountedPriceAmount = originalPrice - discountedAmount;

        return discountedPriceAmount.toFixed(2); // Round to 2 decimal places
    }

    const currencyData = useAppSelector(state => state.currency.data);
    const convertedPrice = useCurrencyConverter({
        price: variants.edges[0].node?.compareAtPrice?.amount
            ? variants.edges[0].node?.compareAtPrice?.amount
            : "0",
        currencyData,
    });

    const discountPrice = calculateDiscountedPrice(
        variants.edges[0].node?.compareAtPrice?.amount,
        variants.edges[0].node?.priceV2?.amount
    );
    const covertedDiscountPrice = useCurrencyConverter({
        price: discountPrice,
        currencyData,
    });
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 800px)");

    const addToCustomCart = async () => {
        await addItemToCustomCart(dispatch, product);
        form.insertListItem("products", {
            node: { ...product.node, attributes: {} },
        });
        close();
    };

    return (
        <Box className={classes.popularBundles} onClick={addToCustomCart}>
            <Flex justify="space-between" align={matches ? "center" : ""}>
                <Flex align="center" className="mt-5 mb-5">
                    {!matches ? (
                        <Image
                            src={
                                images?.edges[0]?.node?.originalSrc
                                    ? images.edges[0].node.originalSrc
                                    : "/images/YoutubeBanner.svg"
                            }
                            alt="image"
                            width={85}
                            height={85}
                            className="mr-5 rounded-md"
                        />
                    ) : (
                        <Image
                            src={
                                images?.edges[0]?.node?.originalSrc
                                    ? images.edges[0].node.originalSrc
                                    : "/images/youtubeBannerMobile.svg"
                            }
                            alt="image"
                            width={66}
                            height={66}
                            className="mr-5 rounded-md"
                        />
                    )}
                    {!matches && (
                        <h6 style={{ fontSize: rem(19) }}>{title || ""}</h6>
                    )}
                </Flex>
                <Flex
                    direction={matches ? "row" : "column"}
                    justify={matches ? "center" : "space-evenly"}
                    className={matches ? "ml-3" : "ml-0"}
                >
                    {matches && (
                        <Text style={{ fontSize: rem(16) }}>{title || ""}</Text>
                    )}
                    <Flex
                        direction={matches ? "column" : "row"}
                        className={matches ? "ml-2" : "ml-0"}
                        align="center"

                        // justify={matches ? "center" : ""}
                    >
                        <h6
                            style={{ fontSize: matches ? rem(18) : rem(20) }}
                            className={!matches ? "mt-3 mr-6" : "mr-0"}
                        >
                            {covertedDiscountPrice
                                ? `${currencyData.currency} ${covertedDiscountPrice}`
                                : ""}
                        </h6>
                        <Text
                            style={{
                                fontSize: matches ? rem(16) : rem(19),
                                color: "#5B5D6E",
                                paddingTop: rem(15),
                            }}
                            strikethrough
                        >
                            {variants.edges[0].node.compareAtPrice === null ||
                            parseFloat(convertedPrice) <=
                                parseFloat(covertedDiscountPrice)
                                ? ``
                                : `${currencyData.currency} ${convertedPrice}`}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}

export default ModalPopularBundlesList;
