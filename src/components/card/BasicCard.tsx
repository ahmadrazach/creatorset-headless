import { useHover, useMediaQuery } from "@mantine/hooks";
import { IconEye, IconPoint } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Text } from "@mantine/core";
import { useAppSelector } from "@/redux/store/store";
import useStyles from "./styles";
import { ProductProps } from "../../../common/types";
import useCurrencyConverter from "../currencyConverter";

// eslint-disable-next-line sonarjs/cognitive-complexity
function BasicCard({
    product,
    cardKey,
}: {
    product: ProductProps;
    cardKey: string;
}) {
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
    const { hovered, ref } = useHover();
    const { handle, images, title, vendor, variants } = product?.node ?? {};
    const matches = useMediaQuery("(max-width: 720px)");
    const matches2 = useMediaQuery("(max-width: 1025px)");

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
    const { classes, cx } = useStyles();

    return (
        <div key={cardKey} className={classes.boxContainer}>
            <Link
                href={
                    asPath !== "/" &&
                    asPath !== "/cart" &&
                    asPath !== `/profile?vendor=${vendor}` &&
                    asPath !== "/profile" &&
                    !asPath.includes("search")
                        ? `${asPath}/products/${handle}`
                        : `collections/all-products/products/${handle}`
                }
            >
                <Box className="w-full h-full">
                    <div ref={ref}>
                        {mp4Source?.url && hovered ? (
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
                                // style={{ width: "100%", height: "100%" }}
                            />
                        ) : images?.edges[0]?.node?.originalSrc ? (
                            <Image
                                src={
                                    images?.edges[0]?.node?.originalSrc
                                        ? images.edges[0]?.node?.originalSrc
                                        : "/images/Rectangle.png"
                                }
                                alt="image"
                                objectFit="cover"
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
                            <video
                                src={mp4Source?.url}
                                autoPlay
                                className="rounded-md"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: matches ? "156px" : "220px",
                                    minHeight: matches ? "156px" : "220px",
                                    backgroundColor: "black",
                                }}
                                // style={{ width: "100%", height: "100%" }}
                                muted
                                loop
                            />
                        )}
                    </div>
                </Box>
                <div className="mt-3" style={{ display: "flex" }}>
                    <span>
                        <Image
                            src="/images/Ellipse.png"
                            alt="image"
                            width={44}
                            height={44}
                            style={{
                                height: matches2 ? "30px" : "auto",
                                width: matches2 ? "30px" : "auto",
                            }}
                        />
                    </span>
                    <span
                        className="ms-3"
                        style={{
                            maxWidth: "80%",
                        }}
                    >
                        <div className={classes.cardTextContainer}>
                            <Text
                                className={cx(
                                    classes.hover,
                                    "text-[16px] md:text-[18px]"
                                )}
                                lineClamp={2}
                            >
                                {title || `Premiere Pro Transitions Pack`}
                            </Text>
                        </div>

                        <p style={{ fontSize: "15px", color: "#5B5D6E" }}>
                            {vendor}
                        </p>
                        <div style={{ marginLeft: matches ? "-30px" : "0" }}>
                            <h6
                                style={{
                                    fontSize: "15px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                }}
                            >
                                {covertedDiscountPrice
                                    ? `${currencyData.currency} ${covertedDiscountPrice}`
                                    : ""}
                                {!matches && (
                                    <span
                                        style={{
                                            textDecorationLine: "line-through",
                                            opacity: "0.4",
                                            fontSize: "12px",
                                            fontFamily:
                                                "adineue PRO Cyr Bold Web",
                                        }}
                                        className="pl-2"
                                    >
                                        {variants.edges[0].node
                                            .compareAtPrice === null ||
                                        parseFloat(convertedPrice) <=
                                            parseFloat(covertedDiscountPrice)
                                            ? ``
                                            : `${currencyData.currency} ${convertedPrice}`}
                                    </span>
                                )}
                            </h6>
                            <h6>
                                <IconEye
                                    style={{
                                        display: "inline",
                                        color: "#5B5D6E",
                                        marginTop: "-2px",
                                    }}
                                    size={24}
                                    strokeWidth={2}
                                />
                                <span
                                    style={{
                                        color: "#5B5D6E",
                                        fontSize: !matches ? "14px" : "10px",
                                    }}
                                >
                                    {" "}
                                    98k views{" "}
                                </span>
                                <span
                                    style={{
                                        color: "#5B5D6E",
                                        fontSize: !matches ? "12px" : "10px",
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
                        </div>
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default BasicCard;
