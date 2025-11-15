import useStyles from "@/styles/styles";
import { Button, Container, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import componentStyles from "./styles";

function ReadyToStart() {
    const { classes } = useStyles();
    const { classes: componentClass } = componentStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    return (
        <Container
            className={
                matches
                    ? ``
                    : `${componentClass.w90}  ${classes.margin100}  ${classes.marginBN50}`
            }
            style={{
                height: "300px",
                backgroundColor: "#EF174B",
                borderRadius: "63px",
            }}
        >
            <Grid>
                <Grid.Col lg={12}>
                    <Container className="text-center mt-10">
                        <Text
                            className={`${classes.heading1} ${componentClass.whiteColor} `}
                        >
                            Ready to start
                        </Text>
                        <div className="mt-5">
                            <h6
                                className={`${classes.h6} ${componentClass.whiteColor} `}
                            >
                                Get started by creating your profile in the
                                CreatorSet Studio where you can upload your
                                assets. Our team will then review them and let
                                you know if they are approved.
                            </h6>
                        </div>
                        <div className="mt-5">
                            <Link href="https://studio.creatorset.com">
                                <Button
                                    className={`${componentClass.Linkh6} ${componentClass.CreatorSetStudioBtn} `}
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
            </Grid>
        </Container>
    );
}

export default ReadyToStart;
