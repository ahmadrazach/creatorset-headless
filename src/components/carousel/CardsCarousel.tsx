import { Carousel } from "@mantine/carousel";
import { Box, Paper, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
    IconChevronLeft,
    IconChevronRight,
    IconStar,
} from "@tabler/icons-react";
import Image from "next/image";
import useStyles from "./styles";
import { Review } from "../../../common/types";
import { formatDate } from "../../../helper/helper";

interface CardsCarouselProps {
    reviews?: Review[];
}

function Card({ review }: { review: Review }) {
    const { classes } = useStyles();
    const [show, { toggle }] = useDisclosure(false);

    const truncatedBody =
        review.body.length > 60 && !show
            ? `${review.body.substring(0, 60)}...`
            : review.body;

    const starIcons = Array.from({ length: 5 }).map((_, index) => (
        <IconStar
            key={index}
            size="1.5rem"
            color="#EF174B"
            fill={index < review.rating ? "#EF174B" : "none"}
        />
    ));

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            className={`${classes.card} shadow`}
        >
            <div className={classes.textCenter}>
                <Box
                    style={{ right: "40px", position: "absolute" }}
                    className="pb-3"
                >
                    <Image
                        src="/images/invertedComma.png"
                        width={52}
                        height={60}
                        alt="inverted comma"
                    />
                </Box>
                <div className={`${classes.container} pt-5`}>{starIcons}</div>

                <Text className={classes.title}>{review.product_title}</Text>
                <Text className={classes.category}>
                    {truncatedBody}{" "}
                    {review.body.length > 60 && (
                        <button
                            type="button"
                            onClick={toggle}
                            className="text-[#EF174B]"
                        >
                            {show ? "Read Less" : "Show More"}
                        </button>
                    )}
                </Text>
                <Text className={classes.details}>
                    {review.reviewer.name} <br />{" "}
                    {formatDate(review.updated_at)}
                </Text>
            </div>
        </Paper>
    );
}

export function CardsCarousel({ reviews }: CardsCarouselProps) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: 768px)`);
    const slides =
        Array.isArray(reviews) && reviews.length
            ? reviews.map(review => (
                  <Carousel.Slide key={review.title}>
                      <Card review={review} />
                  </Carousel.Slide>
              ))
            : null;

    return (
        <Carousel
            slideSize={mobile ? "100%" : "33%"}
            previousControlIcon={
                <IconChevronLeft
                    color={`${
                        theme.colorScheme === "dark" ? "white" : "black"
                    }`}
                />
            }
            nextControlIcon={
                <IconChevronRight
                    color={`${
                        theme.colorScheme === "dark" ? "white" : "black"
                    }`}
                />
            }
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
            sx={{
                padding: mobile ? "40px" : "50px",
                "& .mantine-Carousel-control:hover": {
                    backgroundColor: "#EF174B",
                    border: "none",
                },
            }}
        >
            {slides}
        </Carousel>
    );
}

CardsCarousel.defaultProps = {
    reviews: [],
};
