import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles(theme => ({
    shadow: {
        boxShadow: "0px 0px 69px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(41px)",
    },
    h6: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        // color: theme.white,
        display: "inline",
        fontSize: "15px",
        fontWeight: 500,
        "&:hover": {
            color: "#FFF!important",
        },
    },
    bgfilter: {
        backgroundColor: theme.colorScheme === "dark" ? "#2f2d37" : "#FFFFFF",
    },
    button: {
        borderRadius: "38px",
        padding: "12px 22px",
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
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    containerMobile: {
        display: "-webkit-box",
        justifyContent: "center",
        alignItems: "center",
    },
    heading1: {
        display: "block",
        fontFamily: "adineue PRO Cyr Bold Web",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2rem",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    headingMobile1: {
        display: "block",
        fontFamily: "adineue PRO Cyr Bold Web",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: rem(28),
        padding: rem(58),
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    w90: {
        maxWidth: "90%",
    },
    w100: {
        maxWidth: "100%",
        padding: "0",
        margin: "0",
    },
    margin100: {
        marginTop: "100px!important",
    },
    dropdown: {
        backgroundColor:
            theme.colorScheme === "light" ? "#E5E4E6!important" : "",
    },
    search: {
        // [theme.fn.smallerThan("xs")]: {
        //     display: "none",
        // },
        // [theme.fn.smallerThan("lg")]: {
        //     minWidth: "35%",
        // },
        minWidth: "30%",
        // maxWidth: "80%",
        borderRadius: "25px",
    },
    link: {
        display: "block",
        lineHeight: 1,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        // "&:hover": {
        //     backgroundColor:
        //         theme.colorScheme === "dark"
        //             ? theme.colors.dark[6]
        //             : theme.colors.gray[0],
        // },
    },
    priceTextInput: {
        backgroundColor:
            theme.colorScheme === "dark" ? "#2F2D37!important" : "#FFFF",
        border:
            theme.colorScheme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(36, 36, 45, 0.2)",
    },
    hrLine: {
        border:
            theme.colorScheme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(36, 36, 45, 0.2)",
    },
    filterAccodionTitle: {
        fontFamily: "GothamMedium",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        color: theme.colorScheme === "dark" ? "#E6E4E7" : theme.black,
    },
    filterAccodionInnerItemText: {
        fontFamily: "GothamMedium",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "19px",
        color: theme.colorScheme === "dark" ? "#E6E4E7" : theme.black,
    },
    collectionsTextTitle: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "15px",
        color: theme.colorScheme === "dark" ? "#FFFF" : theme.black,
        "&:hover": {
            color: "#EF174B",
        },
    },
    collectionsTextContent: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "15px",
        color: "#888A9D",
        "&:hover": {
            color: "#EF174B",
        },
    },
}));

export default useStyles;
