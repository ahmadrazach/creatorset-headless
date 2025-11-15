/* eslint-disable react/require-default-props */
import { Box, Text, rem } from "@mantine/core";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { IconEye, IconPoint } from "@tabler/icons-react";
import Image from "next/image";
// eslint-disable-next-line import/named
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store/store";
import useStyles from "./styles";
import { RecommendedProduct } from "../../../common/types";
import useCurrencyConverter from "../currencyConverter";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/cognitive-complexity
function ProductCard({ product }: { product?: RecommendedProduct }) {
    const videoNode = product?.media.edges.find(
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
    const { query } = router;
    const { hovered, ref } = useHover();
    const { title, images, variants, handle } = product || {};
    const matches = useMediaQuery("(max-width: 720px)");

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

    const { classes } = useStyles();

    return (
        <div className={classes.boxContainer}>
            <Link href={`/collections/${query.cid}/products/${handle}`}>
                <Box className={classes.imageBox}>
                    <div className={classes.imageContainer} ref={ref}>
                        {mp4Source?.url && hovered ? (
                            // eslint-disable-next-line jsx-a11y/media-has-caption
                            <video
                                src={mp4Source?.url}
                                poster={images?.edges[0]?.node?.originalSrc}
                                autoPlay
                                muted
                                loop
                                className="rounded-md"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: matches ? "156px" : "220px",
                                    minHeight: matches ? "156px" : "220px",
                                    backgroundColor: "black",
                                }}
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
                <div className={matches ? "mt-10" : "mt-3"}>
                    <Link href={`/collections/${query.cid}/products/${handle}`}>
                        <div className={classes.cardTextContainer}>
                            <Text
                                style={{
                                    fontSize: matches ? "12px" : "18px",
                                    marginLeft: "5px",
                                }}
                                lineClamp={2}
                            >
                                {title}
                            </Text>
                        </div>
                    </Link>
                    <Box className="flex items-center m-0 p-0">
                        <Image
                            src="/images/Ellipse.png"
                            alt="image"
                            width={matches ? 17.5 : 30}
                            height={matches ? 17.5 : 30}
                        />
                        <p
                            style={{
                                fontSize: matches ? rem(10) : rem(15),
                                marginLeft: rem(12),
                                marginTop: !matches ? "5px" : "2px",
                            }}
                        >
                            Zumbs
                        </p>
                    </Box>
                    <Box className="mt-2">
                        <h6 style={{ fontSize: matches ? rem(18) : rem(15) }}>
                            {covertedDiscountPrice
                                ? `${currencyData.currency} ${covertedDiscountPrice}`
                                : ""}
                            <span
                                style={{
                                    textDecorationLine: "line-through",
                                    opacity: "0.4",
                                    fontSize: matches ? rem(12.73) : rem(15),
                                    marginLeft: "10px",
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
                        </h6>
                        <h6>
                            <IconEye
                                style={{ display: "inline", color: "#5B5D6E" }}
                                size={24}
                                strokeWidth={2}
                            />
                            <span
                                style={{
                                    color: "#5B5D6E",
                                    fontSize: matches ? rem(10) : rem(16),
                                }}
                            >
                                {" "}
                                98k views{" "}
                            </span>
                            <span
                                style={{
                                    color: "#5B5D6E",
                                    fontSize: matches ? rem(10) : rem(16),
                                }}
                            >
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
                    </Box>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;
