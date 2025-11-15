/* eslint-disable jsx-a11y/media-has-caption */

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
    IconStar,
} from "@tabler/icons-react";
import Image from "next/image";
import { useAppSelector } from "@/redux/store/store";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SingleProduct } from "../../../common/types";
import useCurrencyConverter from "../currencyConverter";
import TweetButton from "../shareCTA/TweetButton";
import CopyButton from "../shareCTA/CopyButton";

const MainWaveform = dynamic(() => import("../waveForm/mainWave"), {
    ssr: false, // This ensures that the component is not server-side rendered
});

function ProductDetailPage({
    product,
    useShareUrl,
}: {
    product: SingleProduct;
    useShareUrl: () => string;
}) {
    const {
        title,
        images,
        tags,
        variants: {
            edges: [{ node }],
        },
        views,
        audio,
        downloads,
    } = product;
    const shareUrl = useShareUrl();
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 720px)");
    const theme = useMantineTheme();
    const currencyData = useAppSelector(state => state.currency.data);
    const convertedPrice = useCurrencyConverter({
        price: node.priceV2.amount,
        currencyData,
    });
    return (
        <Box>
            <Container className={classes.w90}>
                <Box style={{ marginTop: matches ? rem(22) : rem(62) }}>
                    <Grid>
                        <Grid.Col span={matches ? 12 : 4}>
                            <Box>
                                <Image
                                    src={
                                        images.edges[0].node.originalSrc
                                            ? images.edges[0].node.originalSrc
                                            : "/images/ProductImage.png"
                                    }
                                    className="rounded-md"
                                    alt="Product Image"
                                    width={444}
                                    height={444}
                                />
                            </Box>
                            <Box className="mt-5">
                                {tags.map(tag => {
                                    return (
                                        <Button
                                            className="border rounded-full h-8 m-1"
                                            style={{
                                                backgroundColor:
                                                    theme.colorScheme === "dark"
                                                        ? "#24242D"
                                                        : "#E7E5E8",
                                                fontFamily: "GothamMedium",
                                            }}
                                        >
                                            <Box
                                                className="mt-2"
                                                style={{
                                                    color:
                                                        theme.colorScheme ===
                                                        "dark"
                                                            ? theme.white
                                                            : theme.black,
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {tag}
                                            </Box>
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Grid.Col>

                        <Grid.Col
                            span={matches ? 12 : 8}
                            style={{
                                paddingLeft: matches ? rem(0) : rem(48),
                            }}
                        >
                            <Text
                                className={classes.heading1}
                                style={{
                                    color:
                                        theme.colorScheme === "dark"
                                            ? "#FFFFFF"
                                            : "#000000",
                                }}
                            >
                                {title || ""}
                            </Text>
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "start",
                                    paddingTop: rem(10),
                                }}
                            >
                                {[1, 2, 3, 4].map(index => (
                                    <IconStar
                                        key={index}
                                        size="1.5rem"
                                        color="#EF174B"
                                        fill="#EF174B"
                                    />
                                ))}
                                <IconStar size="1.5rem" color="#EF174B" />
                            </Box>
                            <Box className="flex justify-start align-center">
                                <Text
                                    className={classes.heading1}
                                    style={{
                                        fontSize: rem(28),
                                    }}
                                >
                                    {`${convertedPrice} ${currencyData.currency}`}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: rem(17),
                                        opacity: "0.4",
                                        marginLeft: rem(8),
                                        marginTop: rem(15),
                                        textDecorationLine: "line-through",
                                    }}
                                >
                                    {`${convertedPrice} ${currencyData.currency}`}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: rem(17),
                                        color: "#28CD7E",
                                        marginTop: rem(15),
                                        marginLeft: rem(8),
                                    }}
                                >
                                    Save 10%
                                </Text>
                            </Box>
                            {/* <div>
                                <audio
                                    ref={audioRef}
                                    src={audio?.value}
                                    controls
                                />
                                <Button onClick={togglePlay}>Play/Pause</Button>
                            </div> */}
                            <div
                                style={{
                                    width: 400,
                                    // background:
                                    //     theme.colorScheme === "dark"
                                    //         ? "#24242D"
                                    //         : "#E7E5E8",
                                    // padding: "0rem 1rem",
                                    // marginTop: "10px",
                                    // borderRadius: "20px",
                                }}
                            >
                                <MainWaveform
                                    url={audio?.value ? audio.value : ""}
                                />
                            </div>

                            {/* <Box
                                style={{
                                    display: "flex",
                                    marginTop: rem(24),
                                    backgroundColor:
                                        theme.colorScheme === "dark"
                                            ? "#24242D"
                                            : "#E7E5E8",
                                }}
                                className="w-2/3 rounded-full"
                            >
                                <Image
                                    src={
                                        theme.colorScheme === "dark"
                                            ? "/images/Play.svg"
                                            : "/images/DarkVoice.svg"
                                    }
                                    width={81}
                                    height={81}
                                    alt="Play"
                                    className="mr-5"
                                />
                                <Image
                                    src="/images/Voice.svg"
                                    width={400}
                                    height={81}
                                    alt="Play"
                                />
                            </Box> */}
                            <Box style={{ marginTop: rem(24) }}>
                                <Link
                                    href={audio?.value || ""}
                                    download={audio?.value || ""}
                                >
                                    <Button
                                        className=" h-12"
                                        style={
                                            matches
                                                ? {
                                                      width: "100%",
                                                      backgroundColor:
                                                          "#EF174B",
                                                      borderRadius: rem(24),
                                                      padding: "4px 64px",
                                                      fontFamily:
                                                          "GothamMedium",
                                                  }
                                                : {
                                                      backgroundColor:
                                                          "#EF174B",
                                                      borderRadius: rem(24),
                                                      padding: "4px 64px",
                                                      fontFamily:
                                                          "GothamMedium",
                                                  }
                                        }
                                    >
                                        <Box className="mt-2 p-5">Download</Box>
                                    </Button>
                                </Link>
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
                                        size={18}
                                        strokeWidth={1.5}
                                        style={{ display: "inline" }}
                                    />
                                    <span
                                        style={{
                                            color: "#919196",
                                            fontSize: rem(14),
                                        }}
                                    >
                                        {downloads?.value || "0"}
                                    </span>
                                </Box>
                                <Box>
                                    <IconEye
                                        size={20}
                                        strokeWidth={1.5}
                                        style={{ display: "inline" }}
                                    />
                                    <span
                                        style={{
                                            color: "#919196",
                                            fontSize: rem(14),
                                        }}
                                    >
                                        {views?.value || "0"}
                                    </span>
                                </Box>
                            </Box>
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

export default ProductDetailPage;
