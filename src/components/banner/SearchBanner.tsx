import { Breadcrumbs, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import useStyles from "./styles";

function SearchBanner({ totalCount }: { totalCount: number }) {
    const { classes } = useStyles();
    const { query } = useRouter();
    const { q } = query;
    const theme = useMantineTheme();
    const matches = useMediaQuery("(max-width: 769px)");
    const items = [
        {
            title: "Home",
            href: "/",
            color: "#EE184B",
            secondaryColor: "#EE184B",
        },
        {
            title: "Search",
            href: "/search",
            color: "#FFFFFF",
            secondaryColor: "24242D",
        },
    ].map((item, index) => (
        <Link
            style={{
                color:
                    item.color === "#FFFFFF"
                        ? theme.colorScheme === "dark"
                            ? theme.white
                            : theme.black
                        : item.color,
                fontFamily: "GothamMedium",
            }}
            href={item.href}
            key={index}
        >
            {item.title}
        </Link>
    ));

    return (
        <div
            className={
                matches
                    ? `${classes.mobileBanner} ${classes.shadow} shadow`
                    : `${classes.banner} ${classes.shadow} shadow`
            }
        >
            <div className="flex justify-center">
                <Breadcrumbs
                    separator={
                        <IconChevronRight
                            size={12}
                            strokeWidth={2}
                            style={{
                                marginBottom: "10px",
                                color: "#EF174B",
                            }}
                        />
                    }
                    mt="xs"
                >
                    {items}
                </Breadcrumbs>
            </div>
            <h3
                className={
                    matches ? classes.mobileHeading : `${classes.heading}`
                }
                style={{ textAlign: "center" }}
            >
                {q ? `${totalCount} Results for "${q}"` : "Search Our Site"}
            </h3>
        </div>
    );
}

export default SearchBanner;
