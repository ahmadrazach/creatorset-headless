import useStyles from "@/styles/styles";
import {
    Box,
    Button,
    Container,
    Grid,
    Menu,
    Text,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
    IconBrandInstagram,
    IconBrandTwitter,
    IconCopy,
    IconDownload,
    IconEye,
    IconShare,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { MediaSource, SingleProduct } from "../../../common/types";
import TweetButton from "../shareCTA/TweetButton";
import CopyButton from "../shareCTA/CopyButton";
import { downloadGreenScreen } from "./gs_helper";

function GreenScreen({
    product,
    useShareUrl,
}: {
    product: SingleProduct;
    useShareUrl: () => string;
}) {
    // states
    const [isDownloading, setIsDownloading] = useState(false);

    const { title, images, tags, description, vendor, downloads, views } =
        product;
    const shareUrl = useShareUrl();
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 720px)");
    const theme = useMantineTheme();

    const videoNode = product.media.edges.find(
        edge => edge.node.mediaContentType === "VIDEO"
    );

    let mp4Source: MediaSource | undefined;

    if (videoNode && videoNode.node.sources) {
        // Filter the sources with format "mp4" from the video node
        mp4Source = videoNode.node.sources.find(
            source => source.format === "mp4"
        );
    }

    const downloadGS = () => {
        const { sku } = product.variants.edges[0].node;
        setIsDownloading(true);
        downloadGreenScreen(sku, title, mp4Source!.url || "", () => {
            setIsDownloading(false);
        });
    };

    return (
        <Box>
            <Container className={classes.w90}>
                <Box style={{ marginTop: matches ? rem(22) : rem(62) }}>
                    <Grid>
                        <Grid.Col span={matches ? 12 : 5}>
                            <Box>
                                {mp4Source!.url ? (
                                    // eslint-disable-next-line jsx-a11y/media-has-caption
                                    <video
                                        src={mp4Source!.url}
                                        autoPlay
                                        controls
                                        loop
                                        className={`${classes.cutomMax} rounded-md`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={
                                            images.edges[0]?.node?.originalSrc
                                                ? images.edges[0].node
                                                      .originalSrc
                                                : "/images/GreenScreen.svg"
                                        }
                                        className="rounded-md"
                                        alt="Product Image"
                                        width={744}
                                        height={550}
                                    />
                                )}
                            </Box>
                        </Grid.Col>
                        <Grid.Col
                            span={matches ? 12 : 7}
                            style={{
                                paddingLeft: matches ? rem(0) : rem(26),
                            }}
                        >
                            <Text
                                className={classes.heading1}
                                style={{
                                    fontSize: matches ? rem(24) : rem(44),
                                    color:
                                        theme.colorScheme === "dark"
                                            ? "#FFFFFF"
                                            : "#000000",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {title || ""}
                            </Text>
                            <Text
                                style={{
                                    color:
                                        theme.colorScheme === "dark"
                                            ? "#FFFFFF"
                                            : "#24242D",
                                    marginTop: rem(12),
                                }}
                            >
                                Green Screen by {vendor}-{" "}
                                <span
                                    style={{
                                        color: "#5B5D6E",
                                    }}
                                >
                                    Apr 24, 2023
                                </span>
                            </Text>
                            <Text
                                style={{
                                    color:
                                        theme.colorScheme === "dark"
                                            ? "#FFFFFF"
                                            : "#24242D",
                                    marginTop: rem(12),
                                    opacity: "0.6",
                                }}
                            >
                                {description || ""}
                            </Text>
                            <Box style={{ marginTop: rem(12) }}>
                                <Button
                                    loading={isDownloading}
                                    className=" h-12"
                                    onClick={() => {
                                        downloadGS();
                                    }}
                                    style={
                                        matches
                                            ? {
                                                  width: "100%",
                                                  backgroundColor: "#EF174B",
                                                  borderRadius: rem(24),
                                                  padding: "4px 64px",
                                                  fontFamily: "GothamMedium",
                                              }
                                            : {
                                                  backgroundColor: "#EF174B",
                                                  borderRadius: rem(24),
                                                  padding: "4px 64px",
                                                  fontFamily: "GothamMedium",
                                              }
                                    }
                                >
                                    <Box className="mt-2 p-5">
                                        {isDownloading
                                            ? "Downloading..."
                                            : "Download"}
                                    </Box>
                                </Button>
                            </Box>
                            <Box
                                className={
                                    matches
                                        ? "flex justify-center mt-3 ms-2"
                                        : "flex mt-3 ms-2"
                                }
                            >
                                <Box className="mx-2">
                                    <IconDownload
                                        size={15}
                                        strokeWidth={1.5}
                                        style={{ display: "inline" }}
                                    />
                                    <span
                                        style={{
                                            color: "#919196",
                                            fontSize: rem(14),
                                        }}
                                        className="ml-1"
                                    >
                                        {downloads?.value || "0"}
                                    </span>
                                </Box>
                                <Box>
                                    <IconEye
                                        size={15}
                                        strokeWidth={1.5}
                                        style={{ display: "inline" }}
                                    />
                                    <span
                                        style={{
                                            color: "#919196",
                                            fontSize: rem(14),
                                        }}
                                        className="ml-1"
                                    >
                                        {views?.value || "0"}
                                    </span>
                                </Box>
                            </Box>
                            <Text
                                style={{
                                    color:
                                        theme.colorScheme === "dark"
                                            ? "#FFFFFF"
                                            : "#24242D",
                                    marginTop: rem(12),
                                    opacity: "0.6",
                                }}
                            >
                                All green screens were commissioned to talent by
                                CreatorSet. We do not own commercial rights to
                                the material inside those green screens. Please
                                use at your own discretion. For personal use
                                only. Redistribution is prohibited.
                            </Text>
                            <Box className="mt-5">
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <Button
                                            className={` ${
                                                theme.colorScheme === "dark"
                                                    ? `border-white`
                                                    : `border-black`
                                            } rounded-full h-12 w-36 flex items-center justify-center`}
                                            style={
                                                matches
                                                    ? {
                                                          width: "100%",
                                                          fontFamily:
                                                              "GothamMedium",
                                                      }
                                                    : {
                                                          fontFamily:
                                                              "GothamMedium",
                                                      }
                                            }
                                        >
                                            <IconShare
                                                strokeWidth={1.5}
                                                size={24}
                                                color={
                                                    theme.colorScheme === "dark"
                                                        ? `#FFF`
                                                        : `#000`
                                                }
                                            />{" "}
                                            <span
                                                className={`${
                                                    theme.colorScheme === "dark"
                                                        ? `text-white`
                                                        : `text-black`
                                                } mt-2 ml-2 font-light`}
                                            >
                                                Share
                                            </span>
                                        </Button>
                                    </Menu.Target>

                                    <Menu.Dropdown
                                        sx={{
                                            borderTop: "3px solid #EF174B",
                                            borderRadius: "none",
                                        }}
                                    >
                                        <Menu.Item
                                            icon={
                                                <IconBrandInstagram size={21} />
                                            }
                                        >
                                            <Text
                                                className="mt-2"
                                                style={{
                                                    fontSize: rem(15),
                                                }}
                                            >
                                                Instagram
                                            </Text>
                                        </Menu.Item>
                                        <Menu.Item
                                            icon={
                                                <IconBrandTwitter size={21} />
                                            }
                                        >
                                            <Text
                                                className="mt-2"
                                                style={{
                                                    fontSize: rem(15),
                                                }}
                                            >
                                                <TweetButton
                                                    title={title}
                                                    tags={tags}
                                                    url={shareUrl}
                                                />
                                            </Text>
                                        </Menu.Item>
                                        <Menu.Item
                                            icon={<IconCopy size={21} />}
                                        >
                                            <Text
                                                className="mt-2"
                                                style={{
                                                    fontSize: rem(15),
                                                }}
                                            >
                                                <CopyButton url={shareUrl} />
                                            </Text>
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default GreenScreen;
