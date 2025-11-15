import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles(theme => ({
    h6: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        display: "inline",
        fontSize: "15px",
        marginTop: "12px",
        fontFamily: "GothamMedium",
    },

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    Linkh6: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        // color: theme.white,
        display: "inline",
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "GothamMedium",
        "&:hover": {
            color: "#FFF!important",
        },
    },

    button: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "42px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#24242D!important"
                : "#EAE8EB!important",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#EF174B!important",
            color: "#FFF!important",
        },
    },

    icons: {
        color: theme.colorScheme === "dark" ? "#5B5D6F!important" : theme.black,
        display: "inline",
        // width: "1.5rem",
        // height: "1.5rem",
    },

    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        border: "none!important",
    },

    inner: {
        height: rem(56),
        maxWidth: "90%",
        display: "flex",
        alignItems: "center",
        gap: 0,
        justifyContent: "space-between",
        borderBottom: "0.0625rem solid #e9ecef",
    },

    links: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    search: {
        // [theme.fn.smallerThan("xs")]: {
        //     display: "none",
        // },
        [theme.fn.smallerThan("lg")]: {
            minWidth: "35%",
        },
        minWidth: "50%",
        // maxWidth: "80%",
        borderRadius: "25px",
    },

    w100: {
        width: "100%",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
    },

    heading1: {
        display: "block",
        fontFamily: "adineue PRO Cyr Bold Web",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2rem",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
        }),

        "&:active": theme.activeStyles,
    },
    reviews: {
        ".jdgm-rev-widg": {
            display: "flex",
            flexDirection: "column",
            gap: rem(40),
            ".jdgm-star.jdgm--on": {
                position: "relative",
                display: "inline-block",
                width: 0,
                height: 0,
                marginLeft: ".9em",
                marginRight: ".9em",
                marginBottom: "1.2em",

                borderRight: ".3em solid transparent",
                borderBottom: ".7em  solid #EF174B",
                borderLeft: ".3em solid transparent",

                /* Controlls the size of the stars. */
                fontSize: rem(12),
                "&:before, &:after": {
                    content: '""',
                    display: "block",
                    width: 0,
                    height: 0,
                    position: "absolute",
                    top: ".6em",
                    left: "-1em",

                    borderRight: "1em solid transparent",
                    borderBottom: ".7em  solid #EF174B",
                    borderLeft: "1em solid transparent",

                    transform: "rotate(-35deg)",
                },

                "&:after": {
                    transform: "rotate(35deg)",
                },
            },
            ".jdgm-star.jdgm--off": {
                position: "relative",
                display: "inline-block",
                width: 0,
                height: 0,

                marginLeft: ".9em",
                marginRight: ".9em",
                marginBottom: "1.2em",

                borderRight: ".3em solid transparent",
                borderBottom:
                    theme.colorScheme === "dark"
                        ? ".7em  solid #23222A"
                        : ".7em  solid #E7E5E8",
                borderLeft: ".3em solid transparent",

                /* Controlls the size of the stars. */
                fontSize: rem(12),

                "&:before, &:after": {
                    content: '""',

                    display: "block",
                    width: 0,
                    height: 0,

                    position: "absolute",
                    top: ".6em",
                    left: "-1em",

                    borderRight: "1em solid transparent",
                    borderBottom:
                        theme.colorScheme === "dark"
                            ? ".7em  solid #23222A"
                            : ".7em  solid #E7E5E8",
                    borderLeft: "1em solid transparent",

                    transform: "rotate(-35deg)",
                },

                "&:after": {
                    transform: "rotate(35deg)",
                },
            },
        },
        ".jdgm-rev-widg__header": {
            ".jdgm-rev-widg__title": {
                fontFamily: "adineue PRO Cyr Bold Web",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: rem(44),
                marginBottom: rem(20),
                color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
                [theme.fn.smallerThan("sm")]: {
                    fontSize: rem(28),
                },
            },
            ".jdgm-rev-widg__summary": {
                float: "left",
                ".jdgm-rev-widg__summary-text": {
                    fontSize: rem(14),
                    color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
                    marginTop: rem(16),
                },
            },
            ".jdgm-write-rev-link": {
                color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
                display: "block !important",
                float: "right",
                paddingTop: rem(16),
                padding: "15px 30px 6px",
                borderRadius: rem(40),
                border:
                    theme.colorScheme === "dark" ? "1px solid #FFF" : "none",
                backgroundColor:
                    theme.colorScheme === "dark" ? "transparent" : "#E7E5E8",
            },
            ".jdgm-rev-widg__sort-wrapper": {
                position: "relative",
                display: "inline-block",
                clear: "both",
                ".jdgm-sort-dropdown": {
                    borderRadius: rem(6),
                    fontSize: rem(16),
                    appearance: "none",
                    padding: "10px",
                    minWidth: rem(140),
                    color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
                    backgroundColor:
                        theme.colorScheme === "dark" ? "#353540" : "#E7E5E8",
                },
                ".jdgm-sort-dropdown-arrow": {
                    display: "block",
                    width: 0,
                    height: 0,
                    right: "8px",
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "6px solid",
                    bordeColor:
                        theme.colorScheme === "dark" ? "#FFF" : "#24242D",
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                },
            },
            ".jdgm-histogram": {
                float: "left",
                padding: "0px 16px",
                margin: "0 24px",
                [theme.fn.smallerThan("sm")]: {
                    padding: 0,
                    margin: 0,
                },
                ".jdgm-histogram__row": {
                    display: "flex",
                    alignItems: "center",
                    gap: 10,

                    ".jdgm-histogram__bar": {
                        width: rem(120),
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? "#23222A"
                                : "#E7E5E8",
                        ".jdgm-histogram__bar-content": {
                            backgroundColor: "#EF174B",
                            height: rem(20),
                        },
                    },
                    ".jdgm-histogram__percentage, .jdgm-histogram__frequency": {
                        fontSize: rem(14),
                        color:
                            theme.colorScheme === "dark" ? "#FFF" : "#24242D",
                        marginTop: rem(10),
                    },
                },
            },
        },
        ".jdgm-rev-widg__body": {
            ".jdgm-rev-widg__reviews": {
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: rem(30),
                [theme.fn.smallerThan("lg")]: {
                    gridTemplateColumns: "repeat(2, 1fr)",
                },
                [theme.fn.smallerThan("md")]: {
                    gridTemplateColumns: "1fr",
                },
                ".jdgm-rev": {
                    width: rem(470),
                    minHeight: rem(200),
                    borderRadius: rem(25),
                    padding: rem(30),
                    backgroundColor:
                        theme.colorScheme === "dark" ? "#23222B" : "#FFF",
                    boxShadow:
                        theme.colorScheme === "dark"
                            ? "none"
                            : "0px 0px 69px 0px rgba(0, 0, 0, 0.1)",
                    [theme.fn.smallerThan("md")]: {
                        width: "auto",
                        padding: rem(20),
                    },
                    ".jdgm-rev__header": {
                        ".jdgm-rev__icon": {
                            display: "none",
                        },
                        ".jdgm-rev__timestamp": {
                            fontSize: rem(14),
                            color:
                                theme.colorScheme === "dark"
                                    ? "#FFF"
                                    : "#24242D",
                            marginTop: rem(16),
                            "&:after": {
                                content: "attr(data-content)",
                            },
                        },
                        ".jdgm-rev__author": {
                            color:
                                theme.colorScheme === "dark"
                                    ? "#FFF"
                                    : "#24242D",
                            fontSize: rem(19),
                            fontFamily: "adineue PRO Cyr Bold Web",
                        },
                        ".jdgm-rev__rating": {
                            display: "flex",
                            marginBottom: rem(10),
                        },
                    },
                    ".jdgm-rev__content": {
                        padding: rem(12),
                        borderRadius: rem(8),
                        border: "1px solid",
                        borderColor: "rgba(91, 93, 110, 0.2)",
                        ".jdgm-rev__title": {
                            fontSize: rem(14),
                            color:
                                theme.colorScheme === "dark"
                                    ? "#FFF"
                                    : "#24242D",
                        },
                        ".jdgm-rev__body": {
                            p: {
                                fontSize: rem(14),
                                color:
                                    theme.colorScheme === "dark"
                                        ? "rgba(255,255,255,0.5)"
                                        : "#24242D",
                            },
                        },
                    },
                },
            },
            ".jdgm-paginate-btn": {
                marginTop: rem(30),
                color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
                padding: "16px 30px 8px",
                fontFamily: "GothamMedium",
                borderRadius: rem(40),
                border:
                    theme.colorScheme === "dark" ? "1px solid #FFF" : "none",
                backgroundColor:
                    theme.colorScheme === "dark" ? "transparent" : "#E7E5E8",
            },
        },
        ".jdgm-paginate": {
            display: "none",
        },
    },
}));

export default useStyles;
