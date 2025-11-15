import { Breadcrumbs, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import useStyles from "./styles";

function AllProductBanner({ path }: { path: string }) {
    let title = path;
    title = title.replace(/-/g, " ").replace(/\b\w/g, value => {
        return value.toUpperCase();
    });
    const { classes } = useStyles();
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
            title: `${title}`,
            href: `/collections/${path}`,
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
                {title}
            </h3>
        </div>
    );
}

export default AllProductBanner;
