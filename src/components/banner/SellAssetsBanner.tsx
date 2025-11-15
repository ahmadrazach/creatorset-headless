import useStyles from "@/styles/styles";
import { Button, Container, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import componentStyles from "./styles";

function SellAssetsBanner() {
    const { classes } = useStyles();
    const { classes: componentClass } = componentStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    return (
        <Container
            className={
                matches
                    ? ``
                    : `${componentClass.w90}  mt-20 ${componentClass.sellAssetsContainer}`
            }
        >
            <Grid>
                <Grid.Col md={3} lg={3} sm={3}>
                    <Container
                        className={`${componentClass.assetsDiscordImagecontainer} mt-10`}
                    >
                        <Image
                            src="/images/discordIcon.svg"
                            alt="Banner"
                            height={193.3}
                            width={193.3}
                        />
                    </Container>
                    <Container
                        className={`${componentClass.twitchImagecontainer} mt-10`}
                    >
                        <Image
                            src="/images/twitch.svg"
                            alt="Banner"
                            height={130}
                            width={130}
                        />
                    </Container>
                </Grid.Col>

                <Grid.Col md={6} lg={6} sm={6}>
                    <Container className="text-center mt-20">
                        <Text className={`${classes.heading1} `}>
                            Sell Your Own Assets On CreatorSet!
                        </Text>
                        <div className="mt-5">
                            <h6 className={`${classes.h6} `}>
                                Sell Your Work To Thousands Of Creators And
                                Editors
                            </h6>
                        </div>
                        <div className="mt-5">
                            <Link href="https://studio.creatorset.com">
                                {" "}
                                <Button
                                    className={`${componentClass.CreatorSetStudioBtn} ${componentClass.Linkh6} ${classes.Active}`}
                                >
                                    <div className="pt-2"> Apply Now</div>
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </Grid.Col>
                <Grid.Col md={3} lg={3} sm={3}>
                    <Container
                        className={`${componentClass.assetsInstaImagecontainer} mt-10`}
                    >
                        <Image
                            src="/images/bannerinstagram.svg"
                            alt="Banner"
                            height={130}
                            width={130}
                        />
                    </Container>
                    <Container
                        className={`${componentClass.assetsYoutubeImagecontainer} mt-10`}
                    >
                        <Image
                            src="/images/youtube.svg"
                            alt="Banner"
                            height={173}
                            width={251}
                        />
                    </Container>
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default SellAssetsBanner;
