import { Box, Grid, ScrollArea, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSend } from "@tabler/icons-react";
import Image from "next/image";
import useStyles from "./styles";

function CommentTab() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const matches = useMediaQuery("(max-width: 720px)");

    return (
        <Box>
            <Box>
                <h6 className={classes.heading1}>Comments</h6>
            </Box>
            <Grid>
                <Grid.Col span={10}>
                    <ScrollArea
                        w={matches ? 350 : 850}
                        h={500}
                        type="always"
                        styles={styles => ({
                            scrollbar: {
                                "&, &:hover": {
                                    background:
                                        styles.colorScheme === "dark"
                                            ? styles.colors.dark[6]
                                            : styles.colors.gray[0],
                                },

                                '&[data-orientation="vertical"] .mantine-ScrollArea-thumb':
                                    {
                                        backgroundColor: "#EF174B",
                                    },

                                '&[data-orientation="horizontal"]': {
                                    display: "none",
                                },

                                '&[data-orientation="vertical"]': {
                                    width: "0.5rem",
                                },
                            },

                            corner: {
                                opacity: 1,
                                background:
                                    styles.colorScheme === "dark"
                                        ? styles.colors.dark[6]
                                        : styles.colors.gray[0],
                            },
                        })}
                    >
                        <Box
                            style={{
                                paddingRight: matches ? "1rem" : "5rem",
                            }}
                        >
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar01.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        Lisa😈
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Hey friends, I&apos;m very sad to tell
                                        you I&apos;m leaving this community. I
                                        will miss you very much, but you will be
                                        in good hands! @Aws will stay at my
                                        place. Please give her a warm welcome!
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar02.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        WildPapa442😈
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Hey friends, I&apos;m very sad to tell
                                        you I&apos;m leaving this community. I
                                        will miss you very much, but you will be
                                        in good hands! @Aws will stay at my
                                        place. Please give her a warm welcome!
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar01.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        WildPapa442
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        please no beg, read the rules!
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar03.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        WildPapa442
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Hey friends, 🙀 I&apos;m very sad to
                                        tell you I&apos;m leaving this
                                        community. I will miss you very much,
                                        but you will be in good hands! @Aws will
                                        stay at my place. Please give her a warm
                                        welcome!
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar01.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        Lisa😈
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Hey friends, I&apos;m very sad to tell
                                        you I&apos;m leaving this community. I
                                        will miss you very much, but you will be
                                        in good hands! @Aws will stay at my
                                        place. Please give her a warm welcome!
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar02.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        WildPapa442😈
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Hey friends, I&apos;m very sad to tell
                                        you I&apos;m leaving this community. I
                                        will miss you very much, but you will be
                                        in good hands! @Aws will stay at my
                                        place. Please give her a warm welcome!
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar01.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        WildPapa442
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        please no beg, read the rules!
                                    </Text>
                                </Box>
                            </Box>
                            <Box className="flex ps-2">
                                <Image
                                    src="/images/Avatar03.svg"
                                    width={44}
                                    height={44}
                                    alt="Avatar"
                                />
                                <Box className="mt-5 ml-3">
                                    <Text style={{ fontSize: "15px" }}>
                                        WildPapa442
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#95959C",
                                            fontSize: "12px",
                                        }}
                                    >
                                        Hey friends, 🙀 I&apos;m very sad to
                                        tell you I&apos;m leaving this
                                        community. I will miss you very much,
                                        but you will be in good hands! @Aws will
                                        stay at my place. Please give her a warm
                                        welcome!
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </ScrollArea>
                    <Box
                        w={matches ? 350 : 850}
                        style={{
                            height: matches ? "" : "184px",
                            bottom: "0px",
                            padding: "5px",
                            position: "relative",
                        }}
                    >
                        <textarea
                            placeholder="to write a message ...."
                            className="shadow rounded"
                            style={{
                                height: matches ? "184px" : "100%",
                                width: matches ? "350px" : "100%",
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? "#23222A"
                                        : "#FFFFFF",
                                padding: "20px",
                                boxShadow: "0px 0px 69px rgba(0, 0, 0, 0.1)",
                            }}
                        />
                        <Box
                            className="flex justify-center items-center rounded"
                            style={{
                                bottom: matches ? "30px" : "10px",
                                right: matches ? "8px" : "10px",
                                position: "absolute",
                            }}
                        >
                            <Box className="p-3 d-flex justify-content-center">
                                <Box className="pe-3 mb-5 ml-3">
                                    <Image
                                        src="/images/smillingFace.svg"
                                        height={24}
                                        width={24}
                                        alt="smillingface"
                                    />
                                </Box>
                                <Box
                                    className="rounded"
                                    style={{
                                        backgroundColor: "#EF174B",
                                        padding: "14px",
                                        // width: "47px",
                                        // height: "50px",
                                    }}
                                >
                                    <IconSend
                                        size={24}
                                        color="#FFF"
                                        strokeWidth={3}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
    );
}

export default CommentTab;
