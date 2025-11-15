import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ProductNode, ProductsProps } from "../../../common/types";
import LatestProductCard from "../card/LatestProductCard";

export function LatestProductsCarousel({ InTrendProducts }: ProductsProps) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: 720px)`);
    const slides = InTrendProducts?.map((product: ProductNode) => (
        <Carousel.Slide>
            <LatestProductCard product={product} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            slideSize={mobile ? "100%" : "15%"}
            previousControlIcon={
                <IconChevronLeft
                    color={theme.colorScheme === "dark" ? "white" : "black"}
                />
            }
            nextControlIcon={
                <IconChevronRight
                    color={theme.colorScheme === "dark" ? "white" : "black"}
                />
            }
            slideGap="xs"
            align="start"
            sx={{
                padding: "50px",
                "& .mantine-Carousel-control:hover": {
                    backgroundColor: "#EF174B",
                    border: "none",
                },
            }}
            slidesToScroll={mobile ? 1 : 2}
            loop
            dragFree
        >
            {slides}
        </Carousel>
    );
}
