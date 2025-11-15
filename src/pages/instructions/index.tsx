/* eslint-disable jsx-a11y/media-has-caption */

import Faq from "@/components/Faq/index";
import CreatorSetStudioBanner from "@/components/banner/CreatorSetStudioBanner";
import InstructionBanner from "@/components/banner/InstructionBanner";
import useStyles from "@/styles/styles";
import { Box, Button, Container, Flex, Grid, List, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { faqs } from "../../../common/constants";

function Instruction() {
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    const instructions = [
        "After ordering, you will receive an email with your files",
        "Download & unzip your order",
        "Drag & drop animation into editing software",
        "Enjoy!",
    ];
    const [showVideo, setShowVideo] = useState(false);

    const handleClick = () => {
        setShowVideo(true);
    };
    return (
        <Box>
            <Container className={matches ? classes.w100 : classes.w90}>
                <div className="mt-6">
                    <InstructionBanner />
                </div>
            </Container>
            <Container className={matches ? `mt-5` : `${classes.w90} mt-10`}>
                <Flex gap={40} className={classes.listContainer}>
                    <div style={{ maxWidth: !matches ? "50%" : "" }}>
                        {!showVideo ? (
                            <Image
                                src="/images/HowToImage.svg"
                                alt="image"
                                width={795}
                                height={447}
                                onClick={handleClick}
                            />
                        ) : (
                            <video
                                controls
                                autoPlay
                                width={795}
                                height={447}
                                style={{ borderRadius: "10px" }}
                            >
                                <source
                                    src="/videos/instructions.mp4"
                                    type="video/mp4"
                                />
                                <track
                                    label="English"
                                    kind="subtitles"
                                    srcLang="en"
                                    src="/videos/instructions.vtt"
                                    default
                                />
                            </video>
                        )}
                    </div>
                    <div
                        style={{
                            maxWidth: !matches ? "50%" : "",
                            display: !matches ? "flex" : "",
                            flexDirection: !matches ? "column" : "row",
                            justifyContent: !matches ? "center" : "",
                        }}
                    >
                        <List>
                            {instructions.map((text, index) => (
                                <Grid className="p-2" align="center">
                                    <Grid.Col span={!matches ? 1 : 2}>
                                        {/* className="flex justify-center border-solid border-8 border-[#E6E4E7] rounded-[50%] p-7" */}
                                        <List.Item className={classes.listIcon}>
                                            {index + 1}
                                        </List.Item>
                                    </Grid.Col>
                                    <Grid.Col
                                        span={!matches ? 11 : 10}
                                        className={!matches ? "pl-5" : "pt-3"}
                                    >
                                        <List.Item
                                            className={
                                                !matches
                                                    ? `${classes.listText} whitespace-nowrap`
                                                    : `${classes.listText}`
                                            }
                                        >
                                            {text}
                                        </List.Item>
                                    </Grid.Col>
                                </Grid>
                            ))}
                        </List>
                    </div>
                </Flex>
            </Container>
            {/* FAQ */}
            <Container className={matches ? `` : `${classes.w90} mt-10`}>
                <div className={`my-5 ${classes.margin90}`}>
                    <Text className={classes.heading1}>FAQ</Text>
                </div>
                <Grid
                    gutter={5}
                    gutterXs="md"
                    gutterMd="xl"
                    gutterXl={50}
                    className={matches ? classes.marginN50 : classes.marginN70}
                >
                    <Grid.Col md={12} lg={6} sm={12}>
                        {faqs.group1.map(faq => {
                            return (
                                <Faq
                                    title={faq.title}
                                    details={faq.description}
                                />
                            );
                        })}
                    </Grid.Col>
                    <Grid.Col md={12} lg={6} sm={12}>
                        {faqs.group2.map(faq => {
                            return (
                                <Faq
                                    title={faq.title}
                                    details={faq.description}
                                />
                            );
                        })}
                    </Grid.Col>
                </Grid>
            </Container>

            {/* Tutorials */}
            <Container className={matches ? `mt-10` : `${classes.w90}  mt-20`}>
                <div>
                    <Text className={classes.heading1}>Tutorials</Text>
                </div>
                <Grid>
                    <Grid.Col span={12}>
                        <div className={`${classes.tutorialContent} mt-5`}>
                            For any other inquiries, please message us via
                            Twitter{" "}
                            <p
                                className={`${classes.activeColor} ${classes.TextUnderline}`}
                            >
                                @CreatorSet
                            </p>{" "}
                            or email us at{" "}
                            <p
                                className={`${classes.activeColor} ${classes.TextUnderline}`}
                            >
                                support@creatorset.com
                            </p>
                        </div>
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col md={6} lg={6} sm={12}>
                        <Container
                            className={`${
                                matches
                                    ? classes.tutorialBtnContainerMobile
                                    : classes.container
                            } mt-5`}
                        >
                            <Button
                                className={`${classes.button1} ${classes.Linkh6} ${classes.Active}`}
                                component="a"
                                href="https://creatorset.com/a/help"
                            >
                                <div className="pt-3">View Tutorials</div>
                            </Button>
                            <Link href="/">
                                <Button
                                    className={`${classes.button1} ${
                                        classes.Linkh6
                                    } ${classes.backToHomeBtn} ${
                                        matches ? "mt-5" : "mt-0"
                                    }`}
                                >
                                    <div className="pt-3">
                                        {" "}
                                        Back to Home Page
                                    </div>
                                </Button>
                            </Link>
                        </Container>
                    </Grid.Col>
                </Grid>
            </Container>
            {/* image section */}

            {matches ? (
                <div
                    className={`${classes.w100} ${
                        matches ? classes.marginBN100 : "0"
                    }`}
                >
                    <Link href="https://studio.creatorset.com">
                        <Image
                            src="/images/MobileBanner.svg"
                            alt="Banner"
                            height={500}
                            width={1600}
                        />
                    </Link>
                </div>
            ) : (
                <CreatorSetStudioBanner />
            )}
        </Box>
    );
}

export default Instruction;
