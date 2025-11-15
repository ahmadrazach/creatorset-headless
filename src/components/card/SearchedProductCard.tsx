import { Box, Flex, Grid, Text, clsx, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/store/store";
import { Product } from "../../../common/types";
import useCurrencyConverter from "../currencyConverter";

interface Props {
    product: Product;
    setPopoverOpened: (payload: boolean) => void;
}

function SearchedProductCard({ product, setPopoverOpened }: Props) {
    const currencyData = useAppSelector(state => state.currency.data);
    const theme = useMantineTheme();
    const { title, variants, media, images, handle } = product;
    const videoNode = media.edges.find(
        edge => edge.node.mediaContentType === "VIDEO"
    );

    let mp4Source;

    if (videoNode && videoNode.node.sources) {
        // Filter the sources with format "mp4" from the video node
        const videoSources = videoNode.node.sources.filter(
            source => source.format === "mp4"
        );
        mp4Source = videoSources[videoSources.length - 1];
    }
    const convertedComparedAtPrice = useCurrencyConverter({
        price: variants?.edges[0].node?.compareAtPrice?.amount || "0",
        currencyData,
    });

    const convertedPrice = useCurrencyConverter({
        price: variants?.edges[0].node?.priceV2?.amount || "0",
        currencyData,
    });

    return (
        <Grid align="center">
            <Grid.Col span={4}>
                <Box>
                    {mp4Source?.url ? (
                        // eslint-disable-next-line jsx-a11y/media-has-caption
                        <video
                            src={mp4Source?.url}
                            poster={images?.edges[0]?.node?.originalSrc}
                            autoPlay
                            muted
                            loop
                            className="rounded-md"
                            style={{ width: "100%", height: "100%" }}
                        />
                    ) : images?.edges[0]?.node?.originalSrc ? (
                        <div className="w-[100%]">
                            <Image
                                src={
                                    images?.edges[0]?.node?.originalSrc
                                        ? images.edges[0]?.node?.originalSrc
                                        : "/images/Rectangle.png"
                                }
                                alt="image"
                                objectFit="cover"
                                className="rounded-md"
                                width={100}
                                height={100}
                            />
                        </div>
                    ) : null}
                </Box>
            </Grid.Col>
            <Grid.Col span={8}>
                <Flex direction="column" gap={2}>
                    <Link
                        href={`/collections/all-products/products/${handle}`}
                        onClick={() => setPopoverOpened(false)}
                    >
                        <Text className="text-[14px] hover:underline leading-5">
                            {title}
                        </Text>
                    </Link>
                    <Flex gap={10} align="center">
                        <Text
                            style={{
                                textDecorationLine: "line-through",
                                fontSize: "14px",
                                opacity: "0.4",
                            }}
                        >
                            {parseFloat(convertedComparedAtPrice)
                                ? `${convertedComparedAtPrice} ${currencyData.currency}`
                                : ""}
                        </Text>
                        <Text
                            className={clsx("text-[#24242D] text-[16px]", {
                                "text-white": theme.colorScheme === "dark",
                            })}
                        >
                            {convertedPrice} {currencyData.currency}
                        </Text>
                    </Flex>
                </Flex>
            </Grid.Col>
        </Grid>
    );
}

export default SearchedProductCard;
