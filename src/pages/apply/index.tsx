import SellAssetsBanner from "@/components/banner/SellAssetsBanner";
import Image from "next/image";
import {
    Box,
    Center,
    Container,
    ScrollArea,
    Text,
    useMantineTheme,
} from "@mantine/core";
import useStyles from "@/styles/styles";
import { useMediaQuery } from "@mantine/hooks";
import ReadyToStart from "@/components/banner/ReadyToStart";
import Link from "next/link";
import { whatCanYouSell } from "../../../common/constants";

function Apply() {
    const matches = useMediaQuery("(max-width: 720px)");
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <Box>
            {matches ? (
                <div className={`${classes.w100} ${classes.marginN80}`}>
                    <Link href="https://studio.creatorset.com">
                        <Image
                            src="/images/SellAssetsBanner.svg"
                            alt="Banner"
                            height={500}
                            width={1600}
                        />
                    </Link>
                </div>
            ) : (
                <div className={`${classes.w100} ${classes.marginN50}`}>
                    <SellAssetsBanner />
                </div>
            )}

            <h6
                className={`text-center my-5 py-5 ${
                    matches
                        ? `${classes.headingMobile1} ${classes.marginN50}`
                        : classes.heading1
                }`}
            >
                What can you sell?
            </h6>
            <ScrollArea
                type="never"
                className={`${classes.marginN20} ${classes.scrollArea}`}
            >
                <Container
                    className={`${
                        matches
                            ? `${classes.containerMobile} ${classes.w100}`
                            : `${classes.container} ${classes.w90}`
                    }  mt-10`}
                >
                    {whatCanYouSell.map((item, index) => {
                        return (
                            <div className={`${classes.CardContainer} mx-5`}>
                                <Center maw={400} h={100} mx="auto">
                                    <div className={classes.cardCircleSection}>
                                        <Center maw={400} h={65} mx="auto">
                                            <Image
                                                src={
                                                    theme.colorScheme ===
                                                    "light"
                                                        ? item.imgLight
                                                        : item.imgDark ||
                                                          item.imgLight
                                                }
                                                alt="meter"
                                                height={40}
                                                width={index === 3 ? 20 : 40}
                                            />
                                        </Center>
                                    </div>
                                </Center>
                                <div style={{ marginTop: "-80px" }}>
                                    <Text
                                        ta="center"
                                        className={classes.cardTitleText}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        ta="center"
                                        className={classes.cardDetailText}
                                    >
                                        {item.description}
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
                </Container>
            </ScrollArea>

            {matches ? (
                <div className={`${classes.w100} ${classes.marginBN120}`}>
                    <Link href="https://studio.creatorset.com">
                        <Image
                            src="/images/ReadyToStartBanner.svg"
                            alt="Banner"
                            height={500}
                            width={1600}
                        />
                    </Link>
                </div>
            ) : (
                <ReadyToStart />
            )}
        </Box>
    );
}

export default Apply;
