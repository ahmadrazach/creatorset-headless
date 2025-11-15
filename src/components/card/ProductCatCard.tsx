import { Box, useMantineTheme, Text } from "@mantine/core";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { IconEye, IconPoint } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "@/redux/store/store";
import useStyles from "./styles";
import { ProductProps } from "../../../common/types";
import useCurrencyConverter from "../currencyConverter";

// eslint-disable-next-line sonarjs/cognitive-complexity
function ProductCatCard({ product }: { product: ProductProps }) {
    const videoNode = product.node.media.edges.find(
        edge => edge.node.mediaContentType === "VIDEO"
    );

    let mp4Source;

    if (videoNode && videoNode.node.sources) {
        // Filter the sources with format "mp4" from the video node
        mp4Source = videoNode.node.sources.find(
            source => source.format === "mp4"
        );
    }
    const router = useRouter();
    const { asPath } = router;
    const { id, handle, images, variants, title, vendor } = product?.node ?? {};
    const theme = useMantineTheme();
    const { hovered, ref } = useHover();
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    function calculateDiscountedPrice(compareAtPrice: string, priceV2: string) {
        const originalPrice = parseFloat(compareAtPrice || "0");
        const discountedPrice = parseFloat(priceV2 || "0");

        const discountedAmount = originalPrice - discountedPrice;
        const discountedPriceAmount = originalPrice - discountedAmount;

        return discountedPriceAmount.toFixed(2); // Round to 2 decimal places
    }

    const currencyData = useAppSelector(state => state.currency.data);
    const convertedPrice = useCurrencyConverter({
        price: variants?.edges[0].node?.compareAtPrice?.amount
            ? variants?.edges[0].node?.compareAtPrice?.amount
            : "0",
        currencyData,
    });

    const discountPrice = calculateDiscountedPrice(
        variants?.edges[0].node?.compareAtPrice?.amount || "0",
        variants?.edges[0].node?.priceV2?.amount || "0"
    );
    const covertedDiscountPrice = useCurrencyConverter({
        price: discountPrice,
        currencyData,
    });
    return (
        <Link
            key={id}
            href={
                asPath !== "/" &&
                asPath !== "/cart" &&
                asPath !== `/profile?vendor=${vendor}` &&
                asPath !== "/profile"
                    ? `collections/${product.node.productType}/products/${handle}`
                    : `collections/all-products/products/${handle}`
            }
        >
            <div>
                <Box className={classes.imageBox}>
                    <div className={classes.imageContainer} ref={ref}>
                        {mp4Source?.url && hovered ? (
                            // eslint-disable-next-line jsx-a11y/media-has-caption
                            <video
                                src={mp4Source?.url}
                                poster={images?.edges[0]?.node?.originalSrc}
                                autoPlay
                                className="rounded-md"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: matches ? "156px" : "220px",
                                    minHeight: matches ? "156px" : "220px",
                                    backgroundColor: "black",
                                }}
                                muted
                                loop
                            />
                        ) : images?.edges[0]?.node?.originalSrc ? (
                            <Image
                                src={
                                    images?.edges[0]?.node?.originalSrc
                                        ? images.edges[0]?.node?.originalSrc
                                        : "/images/Rectangle.png"
                                }
                                alt="image"
                                className="rounded-md"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: matches ? "156px" : "220px",
                                    minHeight: matches ? "156px" : "220px",
                                    backgroundColor: "black",
                                }}
                                width={100}
                                height={100}
                            />
                        ) : (
                            // eslint-disable-next-line jsx-a11y/media-has-caption
                            <video
                                src={mp4Source?.url}
                                autoPlay
                                className="rounded-md"
                                muted
                                loop
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: matches ? "156px" : "220px",
                                    minHeight: matches ? "156px" : "220px",
                                    backgroundColor: "black",
                                }}
                            />
                        )}
                    </div>
                </Box>
                <div className="mt-3" style={{ display: "flex" }}>
                    <span className="ms-3">
                        <div className={classes.cardTextContainer}>
                            <Text
                                className={classes.hover}
                                style={{
                                    fontSize: "18px",
                                    color:
                                        theme.colorScheme === "dark"
                                            ? theme.white
                                            : "#24242D",
                                    marginTop: matches ? "5px" : "",
                                }}
                                lineClamp={2}
                            >
                                {title ||
                                    `Full Video On Channel Tag | YouTube Shorts`}
                            </Text>
                        </div>
                        <div
                            style={{
                                fontSize: matches ? "12px" : "18px",
                                color:
                                    theme.colorScheme === "dark"
                                        ? theme.white
                                        : "#24242D",
                                width: "100%",
                            }}
                            className={classes.heading1}
                        >
                            <span
                                style={{
                                    textDecorationLine: "line-through",
                                    opacity: "0.4",
                                    fontSize: matches ? "13px" : "18px",
                                    marginRight: "5px",
                                    fontFamily: "adineue PRO Cyr Bold Web",
                                }}
                            >
                                {variants?.edges[0].node.compareAtPrice ===
                                    null ||
                                parseFloat(convertedPrice) <=
                                    parseFloat(covertedDiscountPrice)
                                    ? ``
                                    : `${currencyData.currency} ${convertedPrice}`}
                            </span>
                            <span>
                                {covertedDiscountPrice &&
                                covertedDiscountPrice !== "0.00"
                                    ? `${currencyData.currency} ${covertedDiscountPrice}`
                                    : ""}
                            </span>
                        </div>
                        <h6>
                            <IconEye
                                style={{ display: "inline", color: "#5B5D6E" }}
                                size={24}
                                strokeWidth={2}
                            />
                            <span style={{ color: "#5B5D6E" }}>
                                {" "}
                                98k views{" "}
                            </span>
                            <span style={{ color: "#5B5D6E" }}>
                                <IconPoint
                                    fill="#5B5D6E"
                                    size={8}
                                    style={{
                                        display: "inline",
                                        margin: "0px",
                                        padding: "0px",
                                    }}
                                />{" "}
                                1 years ago{" "}
                            </span>
                        </h6>
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ProductCatCard;
