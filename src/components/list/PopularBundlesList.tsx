import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import useStyles from "./styles";

function PopularBundlesList() {
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 800px)");
    return (
        <Box className={classes.popularBundles}>
            <Flex justify={matches ? "left" : "space-between"}>
                <Flex align="center" className="mt-5 mb-5">
                    {!matches ? (
                        <Image
                            src="/images/YoutubeBanner.svg"
                            alt="image"
                            width={160}
                            height={160}
                            className={!matches ? "mr-5" : "mr-0"}
                        />
                    ) : (
                        <Image
                            src="/images/youtubeBannerMobile.svg"
                            alt="image"
                            width={66}
                            height={66}
                        />
                    )}
                    {!matches && <Text>YouTube Subscribe Banner</Text>}
                </Flex>
                <Flex
                    direction="column"
                    justify="space-evenly"
                    className={matches ? "ml-3" : "ml-0"}
                >
                    {matches && (
                        <>
                            <Text>YouTube Subscribe </Text>
                            <Text>Banner</Text>
                        </>
                    )}
                    <Flex align="center">
                        <Text className="mr-6">329,40₴UAH</Text>
                        <Text className={classes.fadeText} strikethrough>
                            500,40₴UAH
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}

export default PopularBundlesList;
