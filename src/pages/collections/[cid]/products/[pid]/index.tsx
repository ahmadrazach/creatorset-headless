import ProductCard from "@/components/card/ProductCard";
import IncludedFilesModal from "@/components/modals/IncludedFilesModal";
import { HeaderTabs } from "@/components/nav/HeaderTabs";
import CommentTab from "@/components/tabs/CommentTab";
import CustomerReviewTab from "@/components/tabs/CustomerReviewTab";
import DescriptionTab from "@/components/tabs/DescriptionTab";
import FAQTab from "@/components/tabs/FAQTab";
import useStyles from "@/styles/styles";
import { NextSeo } from "next-seo";
import {
    Avatar,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Divider,
    Flex,
    Grid,
    Group,
    Input,
    Menu,
    Radio,
    ScrollArea,
    Select,
    SelectItemProps,
    SimpleGrid,
    Text,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import {
    IconArrowLeft,
    IconBrandInstagram,
    IconBrandTwitter,
    IconCheck,
    IconChevronRight,
    IconCopy,
    IconShare,
    IconStar,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { getCart, setCount } from "@/redux/services/cartServices";
import { notifications } from "@mantine/notifications";
import useCurrencyConverter from "@/components/currencyConverter";
import CopyButton from "@/components/shareCTA/CopyButton";
import { useForm } from "@mantine/form";
import {
    useAppSelector,
    useAppDisatch,
} from "../../../../../redux/store/store";
import TweetButton from "../../../../../components/shareCTA/TweetButton";
import ProductDetails from "../../../../../components/productDetails/index";
import GreenScreen from "../../../../../components/greenScreen/index";
import {
    getAllRemommendedProducts,
    getSingleProduct,
    retrieveCart,
    updateCart,
} from "../../../../../../common/api";
import {
    CartRequest,
    ExtendedMediaEdge,
    ItemProps,
    MP4Media,
    MediaEdge,
    ProdNode,
    RecommendedProduct,
    RetrieveCartResponse,
    SingleProduct,
    YouTubeChannel,
} from "../../../../../../common/types";
import { useShareUrl } from "../../../../../../hooks/useShareUrl";
import { rootUrl } from "../../../../../../common/constants";
import { getChannels } from "../../../../../../lib/youtubeAPI";

export async function getServerSideProps(context: {
    params: { cid: string; pid: string };
}) {
    const { params } = context;
    const product = await getSingleProduct(params.pid);

    // If the collection data couldn't be fetched, return a 404
    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product,
        },
    };
}
const Item = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ label, value, ...others }, ref) => {
        const { classes } = useStyles();
        return (
            <div ref={ref} {...others}>
                <Flex align="center">
                    <div className="mt-3">
                        <ReactCountryFlag
                            style={{ fontSize: "15px" }}
                            countryCode={value ? value.toLocaleString() : "USD"}
                        />
                    </div>

                    <div className={classes.currencyValue}>{label}</div>
                </Flex>
            </div>
        );
    }
);

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <ScrollArea>
                <Group noWrap>
                    <Avatar src={image} />

                    <div>
                        <Text className="mt-3">{label}</Text>
                    </div>
                </Group>
            </ScrollArea>
        </div>
    )
);

function ProductDetailDescriptionPage({ product }: { product: SingleProduct }) {
    const form = useForm();
    const {
        id,
        title,
        images,
        description,
        vendor,
        tags,
        fields,
        variants: {
            edges: [{ node }],
        },
    } = product;
    const [recommendedProducts, setRecommendedProducts] = useState<
        RecommendedProduct[]
    >([]);
    useEffect(() => {
        const getAllRecommendedProducts = async (productId: string) => {
            try {
                const recommendedProductsData = await getAllRemommendedProducts(
                    productId
                );
                setRecommendedProducts(recommendedProductsData);
            } catch (error) {
                console.log("Error fetching recommended products:", error);
            }
        };
        getAllRecommendedProducts(id);
    }, [id]);

    const videoNode = product.media.edges.find(
        edge => edge.node.mediaContentType === "VIDEO"
    );

    const mediaNode: (MediaEdge | ExtendedMediaEdge)[] =
        product.media.edges.filter(
            edge => edge.node.mediaContentType === "IMAGE"
        );

    let mp4Source: MP4Media | undefined;

    if (videoNode && videoNode.node.sources) {
        // Filter the sources with format "mp4" from the video node
        mp4Source = videoNode.node.sources.find(
            source => source.format === "mp4"
        );
    }

    if (mp4Source) {
        // Create an ExtendedMediaEdge object to push into mediaNode array
        const extendedMediaEdge: ExtendedMediaEdge = {
            node: {
                mediaContentType: "VIDEO",
                alt: videoNode?.node.alt ? videoNode?.node.alt : "",
                sources: [mp4Source], // Wrap the mp4Source in an array as sources expect an array of MediaSource
            },
        };

        mediaNode.unshift(extendedMediaEdge);
    }
    const allFields = fields && JSON.parse(fields.value);
    const nameArray = allFields?.map((obj: { name: string }) => obj.name);
    const router = useRouter();
    const { cid, pid } = router.query as { cid: string; pid: string };
    const { classes } = useStyles();
    const [activeTab, setActiveTab] = useState<string | null>("Description");
    const [opened, { open, close }] = useDisclosure(false);
    const [mainImage, setMainImage] = useState({
        contentType: mp4Source?.url ? "VIDEO" : "IMAGE",
        url: mp4Source?.url ? mp4Source.url : images.edges[0].node.originalSrc,
    });
    const matches = useMediaQuery("(max-width: 720px)");
    const theme = useMantineTheme();
    const shareUrl = useShareUrl();
    const dispatch = useAppDisatch();
    const [channelData, setChannelData] = useState<YouTubeChannel[]>([]);

    const [varientId, setVarient] = useState(node.id);

    function calculateDiscountedPrice(compareAtPrice: string, priceV2: string) {
        const originalPrice = parseFloat(compareAtPrice || "0");
        const discountedPrice = parseFloat(priceV2 || "0");

        const discountedAmount = originalPrice - discountedPrice;
        const discountedPriceAmount = originalPrice - discountedAmount;

        return discountedPriceAmount.toFixed(2); // Round to 2 decimal places
    }
    const goBack = () => {
        router.back();
    };
    function calculateDiscountPercentage(
        compareAtPrice: string,
        priceV2: string
    ) {
        const originalPrice = parseFloat(compareAtPrice || "0");
        const discountedPrice = parseFloat(priceV2 || "0");

        if (originalPrice === 0) {
            return 0;
        }

        const discountPercentage =
            ((originalPrice - discountedPrice) / originalPrice) * 100;
        return discountPercentage.toFixed(2); // Round to 2 decimal places
    }
    const [discountPrice, setDiscountPrice] = useState(
        calculateDiscountedPrice(
            node.compareAtPrice?.amount,
            node.priceV2?.amount
        )
    );
    const [discountPercentage, setDiscountPercentage] = useState(
        calculateDiscountPercentage(
            node.compareAtPrice?.amount,
            node.priceV2?.amount
        )
    );

    let productType = cid;
    productType = productType.replace(/-/g, " ").replace(/\b\w/g, value => {
        return value.toUpperCase();
    });
    let productDetail = pid;
    productDetail = productDetail.replace(/-/g, " ").replace(/\b\w/g, value => {
        return value.toUpperCase();
    });
    const cartData = useAppSelector(state => state.cart.data);
    const currencyData = useAppSelector(state => state.currency.data);

    const convertedPrice = useCurrencyConverter({
        price: node.compareAtPrice?.amount ? node.compareAtPrice?.amount : "0",
        currencyData,
    });
    const covertedDiscountPrice = useCurrencyConverter({
        price: discountPrice,
        currencyData,
    });
    const [show, { toggle: toggleDescription }] = useDisclosure(false);

    const truncatedDescription =
        description.length > 100 && !show
            ? `${description.substring(0, 100)}...`
            : description;

    useEffect(() => {
        setDiscountPrice(
            calculateDiscountedPrice(
                node.compareAtPrice?.amount,
                node.priceV2?.amount
            )
        );
        setDiscountPercentage(
            calculateDiscountPercentage(
                node.compareAtPrice?.amount,
                node.priceV2?.amount
            )
        );
        setMainImage({
            contentType: mp4Source?.url ? "VIDEO" : "IMAGE",
            url: mp4Source?.url
                ? mp4Source.url
                : images.edges[0].node.originalSrc,
        });
    }, [node.compareAtPrice?.amount, node.priceV2?.amount, mp4Source, images]);

    const languageData = [
        { value: "US", label: "English" },
        { value: "ES", label: "Spanish" },
        { value: "FR", label: "French" },
        { value: "IT", label: "Italian" },
        { value: "NO", label: "Norwegian" },
        { value: "PL", label: "Polish" },
        { value: "PT", label: "Portuguese" },
        { value: "BR", label: "Portuguese (Brazil)" },
    ];

    const varientChangeHandler = (pNode: ProdNode) => {
        setDiscountPrice(
            calculateDiscountedPrice(
                pNode.node.compareAtPrice?.amount,
                pNode.node.priceV2?.amount
            )
        );
        setDiscountPercentage(
            calculateDiscountPercentage(
                pNode.node.compareAtPrice?.amount,
                pNode.node.priceV2?.amount
            )
        );
        setVarient(pNode.node.id);
    };

    const items = [
        { title: "Home", href: "/", color: "#EF174B" },
        {
            title: `${productType}`,
            href: `/collections/${cid}`,
            color: "#EF174B",
        },
        {
            title: `${productDetail}`,
            href: `/collections/${cid}/products/${pid}`,
            color: "#FFFFFF",
        },
    ].map((item, index) => (
        <Link href={item.href} key={index}>
            <span
                style={{
                    color:
                        item.color === "#FFFFFF"
                            ? theme.colorScheme === "dark"
                                ? theme.white
                                : theme.black
                            : item.color,
                    fontSize: "15px",
                    fontFamily: "GothamMedium",
                }}
            >
                {item.title}
            </span>
        </Link>
    ));

    const tabs = ["Description", "Customer Reviews", "Comments", "FAQ"];

    const fetchChannels = async (value?: string) => {
        const channels = await getChannels(value || "");
        setChannelData(channels);
    };

    const productId = useMemo(() => {
        const productIdArray = product.id.split("/");
        return productIdArray[productIdArray.length - 1];
    }, [product]);

    useEffect(() => {
        fetchChannels();
    }, []);

    const addToCartHandler = async () => {
        const cartRequest: CartRequest = {
            id: varientId,
            quantity: 1,
            image: node?.image?.url,
            title: product.title,
            attributes: form.values,
            productType,
        };

        notifications.show({
            title: `Just added to your cart`,
            message: `${product.title}`,
            autoClose: 2000,
            icon: <IconCheck size="1rem" />,
            styles: notificationTheme => ({
                root: {
                    backgroundColor:
                        notificationTheme.colorScheme === "dark"
                            ? "#5B5D6E"
                            : "#E7E5E8",
                    "&::before": {
                        backgroundColor:
                            notificationTheme.colorScheme === "dark"
                                ? "#5B5D6E"
                                : "#E7E5E8",
                    },
                },

                title: {
                    color:
                        notificationTheme.colorScheme === "dark"
                            ? notificationTheme.white
                            : notificationTheme.black,
                    marginTop: "10px",
                    fontSize: "15px",
                },
                description: {
                    color:
                        notificationTheme.colorScheme === "dark"
                            ? notificationTheme.white
                            : notificationTheme.black,
                    fontSize: "15px",
                    opacity: 0.7,
                },
                closeButton: {
                    color:
                        notificationTheme.colorScheme === "dark"
                            ? notificationTheme.white
                            : notificationTheme.black,
                    "&:hover": {
                        backgroundColor: "#EF174B",
                        color: notificationTheme.white,
                    },
                },
                icon: {
                    backgroundColor: "green",
                },
            }),
        });

        if (!cartData.id) {
            try {
                await getCart(dispatch, cartRequest);
                // Handle success
            } catch (error) {
                // Handle error
            }
            return;
        }
        try {
            await updateCart(cartData.id, cartRequest);
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
        } catch (error) {
            // Handle error
        }
    };
    const mainImageChangeHandler = (
        mediaContentType: "VIDEO" | "IMAGE",
        mediaUrl?: string | undefined
    ) => {
        if (mediaUrl !== undefined) {
            setMainImage({ contentType: mediaContentType, url: mediaUrl });
        }
    };

    return (
        <div key={router.asPath}>
            <NextSeo
                title={title}
                description={description}
                openGraph={{
                    url: rootUrl,
                    type: "website",
                    title,
                    description,
                    images: [
                        {
                            url: `${rootUrl}/images/CreatorSet-Text-Logo.png`,
                            alt: "CreatorSet Logo",
                        },
                    ],
                }}
                twitter={{
                    cardType: "summary",
                }}
            />

            <Box>
                <form onSubmit={form.onSubmit(addToCartHandler)}>
                    <Container
                        className={matches ? classes.width100 : classes.w90}
                    >
                        {matches ? (
                            <Box className="" onClick={goBack}>
                                <IconArrowLeft
                                    size={18}
                                    strokeWidth={5}
                                    style={{ display: "inline" }}
                                />{" "}
                                <span>Back</span>
                            </Box>
                        ) : (
                            <Box>
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
                                    mt="xl"
                                    color="#EF174B"
                                >
                                    {items}
                                </Breadcrumbs>
                            </Box>
                        )}

                        {product.productType === "Custom Animation" && (
                            <Box
                                style={{
                                    marginTop: matches ? rem(22) : rem(62),
                                }}
                            >
                                <Grid>
                                    <Grid.Col
                                        span={matches ? 3 : 1}
                                        order={matches ? 2 : 1}
                                    >
                                        <Box className={matches ? "flex" : ""}>
                                            {mediaNode.map(mNode => {
                                                if (
                                                    mNode.node
                                                        .mediaContentType ===
                                                    "VIDEO"
                                                ) {
                                                    return (
                                                        // eslint-disable-next-line jsx-a11y/media-has-caption
                                                        <video
                                                            src={
                                                                mNode?.node
                                                                    ?.sources &&
                                                                mNode?.node
                                                                    ?.sources[0]
                                                                    .url
                                                            }
                                                            width={98}
                                                            height={98}
                                                            className={
                                                                matches
                                                                    ? `mx-2 rounded-md`
                                                                    : "mb-2 rounded-md max-h-24"
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    mNode.node
                                                                        .mediaContentType ===
                                                                    "VIDEO"
                                                                ) {
                                                                    // Handle 'VideoNode' without 'image' property
                                                                    mainImageChangeHandler(
                                                                        mNode
                                                                            .node
                                                                            .mediaContentType,
                                                                        mNode
                                                                            .node
                                                                            .sources?.[0]
                                                                            ?.url
                                                                    );
                                                                }
                                                            }}
                                                            autoPlay
                                                        />
                                                    );
                                                }
                                                return (
                                                    <Image
                                                        src={
                                                            mNode.node.image
                                                                ?.url
                                                                ? mNode.node
                                                                      .image
                                                                      ?.url
                                                                : "/images/Zoom.svg"
                                                        }
                                                        alt="Product Image"
                                                        width={98}
                                                        height={98}
                                                        className={
                                                            matches
                                                                ? `mx-2 rounded-md`
                                                                : "mb-2 rounded-md max-h-24"
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                mNode.node
                                                                    .mediaContentType ===
                                                                "IMAGE"
                                                            ) {
                                                                mainImageChangeHandler(
                                                                    mNode.node
                                                                        .mediaContentType,
                                                                    mNode.node
                                                                        .image
                                                                        ?.url
                                                                );
                                                            }
                                                        }}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col
                                        span={matches ? 12 : 5}
                                        order={matches ? 1 : 2}
                                    >
                                        <Box className="w-full h-full">
                                            {mainImage.contentType ===
                                            "VIDEO" ? (
                                                // eslint-disable-next-line jsx-a11y/media-has-caption
                                                <video
                                                    src={mainImage.url}
                                                    autoPlay
                                                    controls
                                                    loop
                                                    className={`${classes.cutomMax} rounded-md`}
                                                />
                                            ) : (
                                                <Image
                                                    src={
                                                        mainImage.url
                                                            ? mainImage.url
                                                            : "/images/Zoom1.svg"
                                                    }
                                                    alt="Product Image"
                                                    className={`${classes.cutomMax} rounded-md`}
                                                    width={444}
                                                    height={444}
                                                />
                                            )}
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col order={3} span={matches ? 12 : 6}>
                                        <Text
                                            className={classes.heading1}
                                            style={{
                                                fontSize: matches
                                                    ? rem(24)
                                                    : rem(44),
                                                color:
                                                    theme.colorScheme === "dark"
                                                        ? "#FFFFFF"
                                                        : "#000000",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {title}
                                        </Text>
                                        <Box
                                            style={{
                                                display: "flex",
                                                justifyContent: "start",
                                                paddingTop: rem(10),
                                            }}
                                        >
                                            <Image
                                                src="/images/Avatar.png"
                                                alt="avatar"
                                                width={31}
                                                height={31}
                                                className="rounded-3xl"
                                            />
                                            <Link
                                                href={`/profile?vendor=${vendor}`}
                                            >
                                                <h6 className="mx-3 mt-1">
                                                    {vendor}
                                                </h6>
                                            </Link>
                                            <Box className="flex ml-3">
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Text
                                                className={classes.heading1}
                                                style={{
                                                    fontSize: matches
                                                        ? rem(24)
                                                        : rem(28),
                                                }}
                                            >
                                                {covertedDiscountPrice
                                                    ? `${covertedDiscountPrice} ${currencyData.currency}`
                                                    : ``}

                                                <span
                                                    style={{
                                                        fontSize: matches
                                                            ? rem(15)
                                                            : rem(17),
                                                        opacity: "0.4",
                                                        marginLeft: rem(8),
                                                        textDecorationLine:
                                                            "line-through",
                                                    }}
                                                >
                                                    {parseFloat(
                                                        convertedPrice
                                                    ) <=
                                                        parseFloat(
                                                            covertedDiscountPrice
                                                        ) ||
                                                    node.compareAtPrice === null
                                                        ? ""
                                                        : `${convertedPrice} ${currencyData.currency}`}
                                                </span>
                                                {parseFloat(convertedPrice) <=
                                                    parseFloat(
                                                        covertedDiscountPrice
                                                    ) ||
                                                node.compareAtPrice === null ? (
                                                    ""
                                                ) : (
                                                    <span
                                                        style={{
                                                            fontSize: rem(17),
                                                            color: "#28CD7E",
                                                            marginLeft: rem(8),
                                                        }}
                                                    >
                                                        Save{" "}
                                                        {discountPercentage.toString()}
                                                        %
                                                    </span>
                                                )}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                style={{
                                                    fontSize: rem(19),
                                                    color:
                                                        theme.colorScheme ===
                                                        "light"
                                                            ? "#24242D"
                                                            : "#79787C",
                                                    opacity:
                                                        theme.colorScheme ===
                                                        "light"
                                                            ? "0.6"
                                                            : "1",
                                                }}
                                            >
                                                {description}
                                            </Text>
                                        </Box>
                                        {!nameArray.includes("Channel Url") &&
                                            allFields.map(
                                                (field: {
                                                    name: string;
                                                    type: string;
                                                    values: RadioNodeList[];
                                                }) => {
                                                    return (
                                                        <>
                                                            <Box className="mt-5">
                                                                <Text
                                                                    style={{
                                                                        fontSize:
                                                                            rem(
                                                                                15
                                                                            ),
                                                                        color:
                                                                            theme.colorScheme ===
                                                                            "light"
                                                                                ? "24242D"
                                                                                : "#FFFFFF",
                                                                        opacity:
                                                                            theme.colorScheme ===
                                                                            "light"
                                                                                ? "0.8"
                                                                                : "0.5",
                                                                    }}
                                                                >
                                                                    {field.name}
                                                                </Text>
                                                            </Box>
                                                            <Box>
                                                                {field.type ===
                                                                "radio" ? (
                                                                    <Radio.Group
                                                                        {...field}
                                                                        {...form.getInputProps(
                                                                            field.name
                                                                        )}
                                                                        required
                                                                    >
                                                                        {field.values.map(
                                                                            (
                                                                                item: RadioNodeList
                                                                            ) => {
                                                                                return (
                                                                                    <Radio
                                                                                        className="mb-2"
                                                                                        {...item}
                                                                                    />
                                                                                );
                                                                            }
                                                                        )}
                                                                    </Radio.Group>
                                                                ) : (
                                                                    <Input
                                                                        sx={{
                                                                            ".mantine-Input-input":
                                                                                {
                                                                                    backgroundColor:
                                                                                        theme.colorScheme ===
                                                                                        "dark"
                                                                                            ? "#5B5D6E"
                                                                                            : "#E7E5E8",
                                                                                    color:
                                                                                        theme.colorScheme ===
                                                                                        "dark"
                                                                                            ? theme.white
                                                                                            : theme.black,
                                                                                    borderRadius:
                                                                                        "10px",
                                                                                    border: "none",
                                                                                    width: "100%",
                                                                                    height: "35px",
                                                                                },

                                                                            ".mantine-Input-input::placeholder":
                                                                                {
                                                                                    color:
                                                                                        theme.colorScheme ===
                                                                                        "dark"
                                                                                            ? theme.white
                                                                                            : theme.black,
                                                                                },
                                                                        }}
                                                                        {...field}
                                                                        {...form.getInputProps(
                                                                            field.name
                                                                        )}
                                                                        required
                                                                    />
                                                                )}
                                                            </Box>
                                                        </>
                                                    );
                                                }
                                            )}
                                        {nameArray.includes("Channel Url") && (
                                            <>
                                                <Box className="mt-2">
                                                    <Text
                                                        style={{
                                                            fontSize: rem(15),
                                                            color:
                                                                theme.colorScheme ===
                                                                "light"
                                                                    ? "24242D"
                                                                    : "#FFFFFF",
                                                            opacity:
                                                                theme.colorScheme ===
                                                                "light"
                                                                    ? "0.8"
                                                                    : "0.5",
                                                        }}
                                                    >
                                                        Search Channel
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Select
                                                        sx={{
                                                            "& .mantine-Select-input":
                                                                {
                                                                    backgroundColor:
                                                                        theme.colorScheme ===
                                                                        "dark"
                                                                            ? "#5B5D6E"
                                                                            : "#E7E5E8",
                                                                    color:
                                                                        theme.colorScheme ===
                                                                        "dark"
                                                                            ? theme.white
                                                                            : theme.black,
                                                                    borderRadius:
                                                                        "10px",
                                                                    border: "none",
                                                                },
                                                            ".mantine-Select-input::placeholder":
                                                                {
                                                                    color:
                                                                        theme.colorScheme ===
                                                                        "dark"
                                                                            ? theme.white
                                                                            : theme.black,
                                                                },
                                                        }}
                                                        placeholder="Select a channel"
                                                        required
                                                        data={channelData.map(
                                                            channel => ({
                                                                value: channel.username,
                                                                image: channel.thumbnailUrl,
                                                                label: channel.username,
                                                            })
                                                        )}
                                                        itemComponent={
                                                            SelectItem
                                                        }
                                                        searchable
                                                        maxDropdownHeight={400}
                                                        nothingFound="Channel not found"
                                                        filter={(value, item) =>
                                                            item.value
                                                                .toLowerCase()
                                                                .includes(
                                                                    value
                                                                        .toLowerCase()
                                                                        .trim()
                                                                )
                                                        }
                                                        searchValue={
                                                            (form.values
                                                                .channelUrl as string) ||
                                                            ""
                                                        }
                                                        onSearchChange={value => {
                                                            form.setFieldValue(
                                                                `channelUrl`,
                                                                value
                                                            );
                                                            fetchChannels(
                                                                value
                                                            );
                                                        }}
                                                    />
                                                </Box>
                                                <Box className="mt-3">
                                                    <Radio.Group
                                                        name="CustomizeSubscribersCount"
                                                        label="Customize Subscribers Count?"
                                                        {...form.getInputProps(
                                                            "subscriberValue"
                                                        )}
                                                        value={
                                                            (form.values
                                                                .subscriberValue as string) ||
                                                            "Hide"
                                                        }
                                                        required
                                                    >
                                                        <Group
                                                            mt="xs"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            <Radio
                                                                value="Hide"
                                                                label="Hide subscribes count"
                                                                className="mt-2"
                                                            />
                                                            <Radio
                                                                value="Use"
                                                                label="Use current count"
                                                                className="mt-2"
                                                            />
                                                            <Radio
                                                                value="Yes"
                                                                label="Yes"
                                                                className="mt-2"
                                                            />
                                                        </Group>
                                                    </Radio.Group>
                                                </Box>
                                                {form.values.subscriberValue ===
                                                    "Yes" && (
                                                    <>
                                                        <Box className="mt-5">
                                                            <Text
                                                                style={{
                                                                    fontSize:
                                                                        rem(15),
                                                                    color:
                                                                        theme.colorScheme ===
                                                                        "light"
                                                                            ? "24242D"
                                                                            : "#FFFFFF",
                                                                    opacity:
                                                                        theme.colorScheme ===
                                                                        "light"
                                                                            ? "0.8"
                                                                            : "0.5",
                                                                }}
                                                            >
                                                                Subscribers
                                                                Count
                                                            </Text>
                                                        </Box>
                                                        <Box>
                                                            <Input
                                                                sx={{
                                                                    ".mantine-Input-input":
                                                                        {
                                                                            backgroundColor:
                                                                                theme.colorScheme ===
                                                                                "dark"
                                                                                    ? "#5B5D6E"
                                                                                    : "#E7E5E8",
                                                                            color:
                                                                                theme.colorScheme ===
                                                                                "dark"
                                                                                    ? theme.white
                                                                                    : theme.black,
                                                                            borderRadius:
                                                                                "10px",
                                                                            border: "none",
                                                                            width: "100%",
                                                                            height: "35px",
                                                                        },

                                                                    ".mantine-Input-input::placeholder":
                                                                        {
                                                                            color:
                                                                                theme.colorScheme ===
                                                                                "dark"
                                                                                    ? theme.white
                                                                                    : theme.black,
                                                                        },
                                                                }}
                                                                required
                                                                placeholder="Value between 0 and 999,999,999"
                                                                {...form.getInputProps(
                                                                    "subscriberCount"
                                                                )}
                                                            />
                                                        </Box>
                                                    </>
                                                )}

                                                <Text
                                                    className={`${classes.marginBN20} mt-5`}
                                                    style={{
                                                        fontSize: rem(15),
                                                        color:
                                                            theme.colorScheme ===
                                                            "light"
                                                                ? "24242D"
                                                                : "#FFFFFF",
                                                        opacity:
                                                            theme.colorScheme ===
                                                            "light"
                                                                ? "0.8"
                                                                : "0.5",
                                                    }}
                                                >
                                                    Language
                                                </Text>
                                                <Box>
                                                    <span>
                                                        <ReactCountryFlag
                                                            style={{
                                                                fontSize:
                                                                    "15px",
                                                                position:
                                                                    "relative",
                                                                left: "20px",
                                                                top: "42px",
                                                                zIndex: 5,
                                                            }}
                                                            countryCode={
                                                                (form.values
                                                                    .language as string) ||
                                                                "US"
                                                            }
                                                        />
                                                    </span>
                                                    <Select
                                                        sx={{
                                                            "& .mantine-Select-input":
                                                                {
                                                                    paddingLeft:
                                                                        "40px",
                                                                    backgroundColor:
                                                                        theme.colorScheme ===
                                                                        "dark"
                                                                            ? "#5B5D6E"
                                                                            : "#E7E5E8",
                                                                    color:
                                                                        theme.colorScheme ===
                                                                        "dark"
                                                                            ? theme.white
                                                                            : theme.black,
                                                                    borderRadius:
                                                                        "10px",
                                                                    border: "none",
                                                                },
                                                            ".mantine-Select-input::placeholder":
                                                                {
                                                                    color:
                                                                        theme.colorScheme ===
                                                                        "dark"
                                                                            ? theme.white
                                                                            : theme.black,
                                                                },
                                                        }}
                                                        required
                                                        itemComponent={Item}
                                                        placeholder="English"
                                                        data={languageData}
                                                        {...form.getInputProps(
                                                            "language"
                                                        )}
                                                    />
                                                </Box>
                                                <Box className="mt-5">
                                                    <Box>
                                                        <Radio.Group
                                                            name="favoriteTheme"
                                                            label={node.title}
                                                            {...form.getInputProps(
                                                                "theme"
                                                            )}
                                                            value={
                                                                (form.values
                                                                    .theme as string) ||
                                                                product.variants
                                                                    .edges[0]
                                                                    .node
                                                                    .selectedOptions[0]
                                                                    .value
                                                            }
                                                            required
                                                        >
                                                            <Group mt="xs">
                                                                {product.variants.edges.map(
                                                                    (
                                                                        prodNode: ProdNode
                                                                    ) => {
                                                                        return (
                                                                            <Radio
                                                                                value={
                                                                                    prodNode
                                                                                        .node
                                                                                        .selectedOptions[0]
                                                                                        .value
                                                                                }
                                                                                label={
                                                                                    prodNode
                                                                                        .node
                                                                                        .selectedOptions[0]
                                                                                        .value
                                                                                }
                                                                                onClick={() => {
                                                                                    varientChangeHandler(
                                                                                        prodNode
                                                                                    );
                                                                                }}
                                                                            />
                                                                        );
                                                                    }
                                                                )}
                                                            </Group>
                                                        </Radio.Group>
                                                    </Box>
                                                </Box>
                                            </>
                                        )}
                                        <Box style={{ marginTop: rem(24) }}>
                                            <Button
                                                className="h-12 mr-2 mb-2"
                                                type="submit"
                                                style={
                                                    matches
                                                        ? {
                                                              width: "100%",
                                                              backgroundColor:
                                                                  "#EF174B",
                                                              borderRadius:
                                                                  rem(24),
                                                              padding:
                                                                  "4px 64px",
                                                              fontFamily:
                                                                  "GothamMedium",
                                                          }
                                                        : {
                                                              backgroundColor:
                                                                  "#EF174B",
                                                              borderRadius:
                                                                  rem(24),
                                                              padding:
                                                                  "4px 64px",
                                                              fontFamily:
                                                                  "GothamMedium",
                                                          }
                                                }
                                            >
                                                <Box className="mt-2 p-3">
                                                    + Add To Cart
                                                </Box>
                                            </Button>
                                            <Link href="/products/custom-bundle">
                                                <Button
                                                    className="h-12"
                                                    style={
                                                        matches
                                                            ? {
                                                                  width: "100%",
                                                                  backgroundColor:
                                                                      "#E7E5E8",
                                                                  color: "#24242D",
                                                                  borderRadius:
                                                                      rem(24),
                                                                  padding:
                                                                      "4px 30px",
                                                                  fontFamily:
                                                                      "GothamMedium",
                                                              }
                                                            : {
                                                                  backgroundColor:
                                                                      "#E7E5E8",
                                                                  borderRadius:
                                                                      rem(24),
                                                                  color: "#24242D",
                                                                  padding:
                                                                      "4px 30px",
                                                                  fontFamily:
                                                                      "GothamMedium",
                                                              }
                                                    }
                                                >
                                                    <Box className="mt-2 p-3">
                                                        Bundle & Save
                                                    </Box>
                                                </Button>
                                            </Link>
                                        </Box>
                                        <Box className="mt-5">
                                            <Menu shadow="md" width={200}>
                                                <Menu.Target>
                                                    <Button
                                                        className={` ${
                                                            theme.colorScheme ===
                                                            "dark"
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
                                                                theme.colorScheme ===
                                                                "dark"
                                                                    ? `#FFF`
                                                                    : `#000`
                                                            }
                                                        />{" "}
                                                        <span
                                                            className={`${
                                                                theme.colorScheme ===
                                                                "dark"
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
                                                        borderTop:
                                                            "3px solid #EF174B",
                                                        borderRadius: "none",
                                                    }}
                                                >
                                                    <Menu.Item
                                                        icon={
                                                            <IconBrandInstagram
                                                                size={21}
                                                            />
                                                        }
                                                    >
                                                        <Text
                                                            className="mt-2"
                                                            style={{
                                                                fontSize:
                                                                    rem(15),
                                                            }}
                                                        >
                                                            Instagram
                                                        </Text>
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        icon={
                                                            <IconBrandTwitter
                                                                size={21}
                                                            />
                                                        }
                                                    >
                                                        <Text
                                                            className="mt-2"
                                                            style={{
                                                                fontSize:
                                                                    rem(15),
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
                                                        icon={
                                                            <IconCopy
                                                                size={21}
                                                            />
                                                        }
                                                    >
                                                        <CopyButton
                                                            url={shareUrl}
                                                        />
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Box>
                                    </Grid.Col>
                                </Grid>
                            </Box>
                        )}
                        {![
                            "Green Screen",
                            "Custom Animation",
                            "Sound Effect",
                        ].includes(product?.productType) && (
                            <Box
                                style={{
                                    marginTop: matches ? rem(22) : rem(62),
                                }}
                            >
                                <Grid>
                                    <Grid.Col
                                        span={matches ? 3 : 1}
                                        order={matches ? 2 : 1}
                                    >
                                        <Box className={matches ? "flex" : ""}>
                                            {mediaNode.map(mNode => {
                                                if (
                                                    mNode.node
                                                        .mediaContentType ===
                                                    "VIDEO"
                                                ) {
                                                    return (
                                                        // eslint-disable-next-line jsx-a11y/media-has-caption
                                                        <video
                                                            src={
                                                                mNode?.node
                                                                    ?.sources &&
                                                                mNode?.node
                                                                    ?.sources[0]
                                                                    .url
                                                            }
                                                            width={98}
                                                            height={98}
                                                            className={
                                                                matches
                                                                    ? `mx-2 rounded-md`
                                                                    : "mb-2 rounded-md max-h-24"
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    mNode.node
                                                                        .mediaContentType ===
                                                                    "VIDEO"
                                                                ) {
                                                                    // Handle 'VideoNode' without 'image' property
                                                                    mainImageChangeHandler(
                                                                        mNode
                                                                            .node
                                                                            .mediaContentType,
                                                                        mNode
                                                                            .node
                                                                            .sources?.[0]
                                                                            ?.url
                                                                    );
                                                                }
                                                            }}
                                                            autoPlay
                                                        />
                                                    );
                                                }
                                                return (
                                                    <Image
                                                        src={
                                                            mNode.node.image
                                                                ?.url
                                                                ? mNode.node
                                                                      .image
                                                                      ?.url
                                                                : "/images/Zoom.svg"
                                                        }
                                                        alt="Product Image"
                                                        width={98}
                                                        height={98}
                                                        className={
                                                            matches
                                                                ? `mx-2 rounded-md`
                                                                : "mb-2 rounded-md max-h-24"
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                mNode.node
                                                                    .mediaContentType ===
                                                                "IMAGE"
                                                            ) {
                                                                mainImageChangeHandler(
                                                                    mNode.node
                                                                        .mediaContentType,
                                                                    mNode.node
                                                                        .image
                                                                        ?.url
                                                                );
                                                            }
                                                        }}
                                                    />
                                                );
                                            })}
                                        </Box>
                                    </Grid.Col>
                                    <Grid.Col
                                        span={matches ? 12 : 5}
                                        order={matches ? 1 : 2}
                                    >
                                        <Box>
                                            {mainImage.contentType ===
                                            "VIDEO" ? (
                                                // eslint-disable-next-line jsx-a11y/media-has-caption
                                                <video
                                                    src={mainImage.url}
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
                                                        mainImage.url
                                                            ? mainImage.url
                                                            : "/images/Zoom1.svg"
                                                    }
                                                    alt="Product Image"
                                                    className={`${classes.cutomMax} rounded-md`}
                                                    width={444}
                                                    height={444}
                                                />
                                            )}
                                        </Box>

                                        {!matches && (
                                            <Box className="mt-5">
                                                {tags.map(tag => {
                                                    return (
                                                        <Button
                                                            className="border rounded-full h-8 m-1"
                                                            style={{
                                                                backgroundColor:
                                                                    theme.colorScheme ===
                                                                    "dark"
                                                                        ? "#24242D"
                                                                        : "#E7E5E8",
                                                                fontFamily:
                                                                    "GothamMedium",
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
                                                                    fontWeight:
                                                                        "500",
                                                                }}
                                                            >
                                                                {tag}
                                                            </Box>
                                                        </Button>
                                                    );
                                                })}
                                            </Box>
                                        )}
                                    </Grid.Col>
                                    <Grid.Col
                                        order={3}
                                        span={matches ? 12 : 6}
                                        style={{
                                            paddingLeft: matches
                                                ? rem(0)
                                                : rem(12),
                                        }}
                                    >
                                        <Text
                                            className={classes.heading1}
                                            style={{
                                                fontSize: matches
                                                    ? rem(24)
                                                    : rem(44),
                                                color:
                                                    theme.colorScheme === "dark"
                                                        ? "#FFFFFF"
                                                        : "#000000",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {title}
                                        </Text>
                                        <Box
                                            style={{
                                                display: "flex",
                                                justifyContent: "start",
                                                paddingTop: rem(10),
                                            }}
                                        >
                                            <Image
                                                src="/images/Avatar.png"
                                                alt="avatar"
                                                width={31}
                                                height={31}
                                                className="rounded-3xl"
                                            />
                                            <Link
                                                href={`/profile?vendor=${vendor}`}
                                            >
                                                <h6 className="mx-3 mt-1">
                                                    {vendor}
                                                </h6>
                                            </Link>
                                            <Box className="flex ml-3">
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                    fill="#EF174B"
                                                />
                                                <IconStar
                                                    size="1.5rem"
                                                    color="#EF174B"
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Text
                                                className={classes.heading1}
                                                style={{
                                                    fontSize: matches
                                                        ? rem(24)
                                                        : rem(28),
                                                }}
                                            >
                                                {covertedDiscountPrice
                                                    ? `${covertedDiscountPrice} ${currencyData.currency}`
                                                    : ``}

                                                <span
                                                    style={{
                                                        fontSize: matches
                                                            ? rem(15)
                                                            : rem(17),
                                                        opacity: "0.4",
                                                        marginLeft: rem(8),
                                                        textDecorationLine:
                                                            "line-through",
                                                    }}
                                                >
                                                    {parseFloat(
                                                        convertedPrice
                                                    ) <=
                                                        parseFloat(
                                                            covertedDiscountPrice
                                                        ) ||
                                                    node.compareAtPrice === null
                                                        ? ""
                                                        : `${convertedPrice} ${currencyData.currency}`}
                                                </span>
                                                {parseFloat(convertedPrice) <=
                                                    parseFloat(
                                                        covertedDiscountPrice
                                                    ) ||
                                                node.compareAtPrice === null ? (
                                                    ""
                                                ) : (
                                                    <span
                                                        style={{
                                                            fontSize: rem(17),
                                                            color: "#28CD7E",
                                                            marginLeft: rem(8),
                                                        }}
                                                    >
                                                        Save{" "}
                                                        {discountPercentage.toString()}
                                                        %
                                                    </span>
                                                )}
                                            </Text>
                                        </Box>
                                        <Box className="mt-5">
                                            <Text
                                                style={{
                                                    fontSize: rem(19),
                                                    color:
                                                        theme.colorScheme ===
                                                        "light"
                                                            ? "#24242D"
                                                            : "#79787C",
                                                    opacity:
                                                        theme.colorScheme ===
                                                        "light"
                                                            ? "0.6"
                                                            : "1",
                                                }}
                                            >
                                                {truncatedDescription}
                                                {truncatedDescription.length >
                                                    100 && (
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            toggleDescription
                                                        }
                                                        className="ml-2 text-[#EF174B]"
                                                    >
                                                        {show
                                                            ? "Read Less"
                                                            : "Show More"}
                                                    </button>
                                                )}
                                            </Text>
                                        </Box>
                                        <Box style={{ marginTop: rem(50) }}>
                                            <Button
                                                type="submit"
                                                className="h-12 mr-2 mb-2"
                                                style={
                                                    matches
                                                        ? {
                                                              width: "100%",
                                                              backgroundColor:
                                                                  "#EF174B",
                                                              borderRadius:
                                                                  rem(24),
                                                              padding:
                                                                  "4px 64px",
                                                              fontFamily:
                                                                  "GothamMedium",
                                                          }
                                                        : {
                                                              backgroundColor:
                                                                  "#EF174B",
                                                              borderRadius:
                                                                  rem(24),
                                                              padding:
                                                                  "4px 64px",
                                                              fontFamily:
                                                                  "GothamMedium",
                                                          }
                                                }
                                            >
                                                <Box className="mt-2 p-3">
                                                    + Add To Cart
                                                </Box>
                                            </Button>
                                            <Link href="/products/custom-bundle">
                                                <Button
                                                    className="h-12"
                                                    style={
                                                        matches
                                                            ? {
                                                                  width: "100%",
                                                                  backgroundColor:
                                                                      "#E7E5E8",
                                                                  color: "#24242D",
                                                                  borderRadius:
                                                                      rem(24),
                                                                  padding:
                                                                      "4px 30px",
                                                                  fontFamily:
                                                                      "GothamMedium",
                                                              }
                                                            : {
                                                                  backgroundColor:
                                                                      "#E7E5E8",
                                                                  borderRadius:
                                                                      rem(24),
                                                                  color: "#24242D",
                                                                  padding:
                                                                      "4px 30px",
                                                                  fontFamily:
                                                                      "GothamMedium",
                                                              }
                                                    }
                                                >
                                                    <Box className="mt-2 p-3">
                                                        Bundle & Save
                                                    </Box>
                                                </Button>
                                            </Link>
                                        </Box>
                                        <Box className="mt-5">
                                            <Menu shadow="md" width={200}>
                                                <Menu.Target>
                                                    <Button
                                                        className={` ${
                                                            theme.colorScheme ===
                                                            "dark"
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
                                                                theme.colorScheme ===
                                                                "dark"
                                                                    ? `#FFF`
                                                                    : `#000`
                                                            }
                                                        />{" "}
                                                        <span
                                                            className={`${
                                                                theme.colorScheme ===
                                                                "dark"
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
                                                        borderTop:
                                                            "3px solid #EF174B",
                                                        borderRadius: "none",
                                                    }}
                                                >
                                                    <Menu.Item
                                                        icon={
                                                            <IconBrandInstagram
                                                                size={21}
                                                            />
                                                        }
                                                    >
                                                        <Text
                                                            className="mt-2"
                                                            style={{
                                                                fontSize:
                                                                    rem(15),
                                                            }}
                                                        >
                                                            Instagram
                                                        </Text>
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        icon={
                                                            <IconBrandTwitter
                                                                size={21}
                                                            />
                                                        }
                                                    >
                                                        <Text
                                                            className="mt-2"
                                                            style={{
                                                                fontSize:
                                                                    rem(15),
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
                                                        icon={
                                                            <IconCopy
                                                                size={21}
                                                            />
                                                        }
                                                    >
                                                        <CopyButton
                                                            url={shareUrl}
                                                        />
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Box>
                                    </Grid.Col>
                                </Grid>
                            </Box>
                        )}
                        {product.productType === "Green Screen" && (
                            <GreenScreen
                                product={product}
                                useShareUrl={useShareUrl}
                            />
                        )}
                        {product.productType === "Sound Effect" && (
                            <ProductDetails
                                product={product}
                                useShareUrl={useShareUrl}
                            />
                        )}
                        <Box className="mt-5">
                            <Divider />
                            <HeaderTabs
                                tabs={tabs}
                                defaultTab="Description"
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {activeTab === "Description" && (
                                <DescriptionTab
                                    description={description}
                                    open={open}
                                    deliveredFiles={product.delivered_files}
                                />
                            )}
                            {activeTab === "FAQ" && <FAQTab />}
                            {activeTab === "Customer Reviews" && (
                                <CustomerReviewTab productId={productId} />
                            )}
                            {activeTab === "Comments" && <CommentTab />}
                        </Box>
                        <Box className="mt-5">
                            <Text
                                className={classes.heading1}
                                style={{
                                    fontSize: matches ? rem(28) : rem(44),
                                }}
                            >
                                You May Also Like
                            </Text>
                            <Box className="mt-5">
                                <SimpleGrid
                                    cols={5}
                                    spacing="lg"
                                    breakpoints={[
                                        {
                                            maxWidth: "62rem",
                                            cols: 4,
                                            spacing: "md",
                                        },
                                        {
                                            maxWidth: "48rem",
                                            cols: 3,
                                            spacing: "sm",
                                        },
                                        {
                                            maxWidth: "36rem",
                                            cols: 2,
                                            spacing: "sm",
                                        },
                                    ]}
                                >
                                    {recommendedProducts.map(
                                        (
                                            recommendeProduct: RecommendedProduct
                                        ) => {
                                            return (
                                                <Box>
                                                    <ProductCard
                                                        key={
                                                            recommendeProduct.id
                                                        }
                                                        product={
                                                            recommendeProduct
                                                        }
                                                    />
                                                </Box>
                                            );
                                        }
                                    )}
                                </SimpleGrid>
                            </Box>
                        </Box>
                        <Button
                            className="h-12 my-5"
                            style={{
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? "#201F26"
                                        : "#E7E5E8",
                                borderRadius: rem(24),
                                padding: "4px 32px",
                                border: "1px solid #FFFFFF",
                                fontFamily: "GothamMedium",
                            }}
                        >
                            <Link href="/collections/all-products">
                                <Box
                                    className="mt-2 p-5"
                                    style={{
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.white
                                                : theme.black,
                                    }}
                                >
                                    Back To All Product
                                </Box>
                            </Link>
                        </Button>
                    </Container>
                </form>
            </Box>
            {product.delivered_files && (
                <IncludedFilesModal
                    opened={opened}
                    close={close}
                    deliveredFiles={product.delivered_files}
                />
            )}
        </div>
    );
}

export default ProductDetailDescriptionPage;
