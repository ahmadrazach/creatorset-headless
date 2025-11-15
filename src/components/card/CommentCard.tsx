import { Box, Button, Card, Text, useMantineTheme } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import Image from "next/image";
import useStyles from "./styles";
import { Review } from "../../../common/types";

function CommentCard({ review }: { review: Review }) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {/* <Card.Section>
                <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={160}
                    alt="Norway"
                />
            </Card.Section> */}

            <Box>
                <Box className="flex justify-between">
                    <Box className="mt-3">
                        <Text
                            className={classes.heading1}
                            style={{ fontSize: "16px" }}
                            weight={500}
                        >
                            {review.product_title}
                        </Text>
                        <Box className="flex">
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
                            <IconStar size="1.5rem" color="#EF174B" />
                        </Box>
                    </Box>
                    <Box className="mt-1">
                        <Image
                            src="/images/invertedComma.png"
                            width={52}
                            height={60}
                            alt="inverted comma"
                        />
                    </Box>
                </Box>
                <Button
                    className="border rounded h-8 mt-2"
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
                                theme.colorScheme === "dark"
                                    ? theme.white
                                    : theme.black,
                            fontWeight: "500",
                            opacity: "0.7",
                        }}
                    >
                        {review.verified}
                    </Box>
                </Button>
                <Text style={{ fontSize: "14px" }} className="mt-2">
                    {new Date(review.created_at).toLocaleDateString("en-US")}
                </Text>
                <Box
                    className="border rounded p-2"
                    style={{ border: "1px solid rgba(91, 93, 110, 0.15)" }}
                >
                    <Text style={{ fontSize: "14px", color: "24242D" }}>
                        {review.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: "14px",
                            color: "24242D",
                            opacity: "0.5",
                        }}
                    >
                        {review.body}
                    </Text>
                </Box>
                {/* <Badge color="pink" variant="light">
                    On Sale
                </Badge> */}
            </Box>

            {/* <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord
                landscapes with tours and activities on and around the fjords of
                Norway
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button> */}
        </Card>
    );
}

export default CommentCard;
