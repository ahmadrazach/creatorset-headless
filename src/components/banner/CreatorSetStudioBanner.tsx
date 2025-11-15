import useStyles from "@/styles/styles";
import { Button, Container, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import componentStyles from "./styles";

function CreatorSetStudioBanner() {
    const { classes } = useStyles();
    const { classes: componentClass } = componentStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    return (
        <Container
            className={matches ? `` : `${componentClass.w90}  mt-20`}
            style={{
                height: "300px",
                backgroundColor: "#EF174B",
                borderRadius: "63px",
            }}
        >
            <Grid>
                <Grid.Col md={3} lg={3} sm={3}>
                    <Container
                        className={`${componentClass.instaImagecontainer} mt-10`}
                    >
                        <Image
                            src="/images/bannerinstagram.svg"
                            alt="Banner"
                            height={130}
                            width={130}
                        />
                    </Container>
                    <Container
                        className={`${componentClass.discordImagecontainer} mt-10`}
                    >
                        <Image
                            src="/images/discordIcon.svg"
                            alt="Banner"
                            height={193.3}
                            width={193.3}
                        />
                    </Container>
                </Grid.Col>

                <Grid.Col md={6} lg={6} sm={6}>
                    <Container className="text-center mt-10">
                        <Text
                            className={`${classes.heading1} ${componentClass.whiteColor} `}
                        >
                            Go to CreatorSet Studio
                        </Text>
                        <div className="mt-5">
                            <h6
                                className={`${classes.h6} ${componentClass.whiteColor} `}
                            >
                                Visit the CreatorSet Studio to access your past
                                orders and creator tools.
                            </h6>
                        </div>
                        <div className="mt-5">
                            <Link href="https://studio.creatorset.com/">
                                <Button
                                    className={`${componentClass.Linkh6} ${componentClass.CreatorSetStudioBtn}`}
                                >
                                    <div className="pt-3">
                                        {" "}
                                        Go To CreatorSet Studio
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </Grid.Col>
                <Grid.Col md={3} lg={3} sm={3}>
                    <Container
                        className={`${componentClass.tiktokImagecontainer} mt-10`}
                    >
                        <Image
                            src="/images/tiktokIcon.svg"
                            alt="Banner"
                            height={193.3}
                            width={193.3}
                        />
                    </Container>
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default CreatorSetStudioBanner;
