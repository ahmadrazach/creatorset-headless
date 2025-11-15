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
        cursor: "pointer",
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
        borderBottom: "0.0625rem solid rgba(255,255,255,0.2)",
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
        minWidth: "45%",
        // maxWidth: "80%",
        borderRadius: "25px",
    },

    w100: {
        width: "100%",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
    },
    w90: {
        width: "90%",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-around",
    },
    cartModalTitle: {
        fontSize: "16px",
        fontWeight: 700,
        fontFamily: "GothamMedium",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    cartItemTitle: {
        fontSize: "15px",
        fontWeight: 700,
        fontFamily: "adineue PRO Cyr Bold Web",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    continueShoppingText: {
        fontSize: "18px",
        fontWeight: 500,
        fontFamily: "GothamMedium",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    cartItemSubTitle: {
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "GothamMedium",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    cartItemQtyTitle: {
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: "GothamMedium",
        color:
            theme.colorScheme === "dark"
                ? "rgba(255,255,255,0.5)"
                : "rgba(36,36,45,0.5)",
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
    fixedPosition: {
        position: "fixed",
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
    marginTN10: {
        marginTop: "-10px",
    },
    marginBN30: {
        marginTop: "-30px",
    },
    drawerTitle: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "24px",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    dropdown: {
        backgroundColor: theme.colorScheme === "light" ? "#E5E4E6" : "#E3E3FF",
        [theme.fn.smallerThan("md")]: {
            marginLeft: "40px",
        },
    },
    currencyValue: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        marginLeft: "2px",
    },
    sticky: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.colorScheme === "dark" ? "#1A1C1E" : "white",
        padding: "10px 0 10px 10px",
        zIndex: 3,
    },
}));

export default useStyles;
