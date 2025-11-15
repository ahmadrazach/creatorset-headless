import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles(theme => ({
    heading1: {
        display: "block",
        fontFamily: "adineue PRO Cyr Bold Web",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2rem",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? "rgba(64, 62, 71, 0.4)" : "#FFF",
        boxShadow: "0px 0px 69px rgba(0, 0, 0, 0.25)",
        // backdrop-filter: blur(41px);
        /* Note: backdrop-filter has minimal browser support */
        borderRadius: "20px",
    },
    outerRing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: theme.colorScheme === "dark" ? "#201F26" : "#E6E4E7",
        width: "72px",
        height: "72px",
    },
    innerRing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: theme.colorScheme === "dark" ? "#2C2C33" : "#FFF",
        width: "52px",
        height: "52px",
    },
    outerRingSmaller: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: theme.colorScheme === "dark" ? "#201F26" : "#E6E4E7",
        width: "50px",
        height: "50px",
        position: "relative",
        bottom: "32px",
        left: "40px",
    },
    innerRingSmaller: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: theme.colorScheme === "dark" ? "#2C2C33" : "#FFF",
        width: "38px",
        height: "38px",
    },
    entry: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        borderBottom: "1px solid #FFF",
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? "rgba(64, 62, 71, 0.4)"
                    : "#E6E4E7",
            marginLeft: 0,
            ".profileBtn": {
                display: "block",
            },
        },
        ".profileBtn": {
            backgroundColor: "#EF174B!important",
            font: "GothamLight",
            borderTopLeftRadius: rem(20),
            borderBottomLeftRadius: rem(20),
            borderTopRightRadius: rem(0),
            borderBottomRightRadius: rem(0),
            paddingRight: 10,
            display: "none",
        },
    },

    entryNoBorder: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? "rgba(64, 62, 71, 0.4)"
                    : "#E6E4E7",
            marginLeft: 0,
            ".profileBtn": {
                display: "block",
            },
        },
        ".profileBtn": {
            backgroundColor: "#EF174B!important",
            font: "GothamLight",
            borderTopLeftRadius: rem(20),
            borderBottomLeftRadius: rem(20),
            borderTopRightRadius: rem(0),
            borderBottomRightRadius: rem(0),
            paddingRight: 10,
            display: "none",
        },
    },
    line: {
        borderLeft: "1px solid #4C4C52",
    },
    w100: {
        width: "100%",
    },
    ProdCatAvatar: {
        marginTop: "-70px",
        backgroundColor: theme.colorScheme === "dark" ? "#1F1E25" : "#EAE8EB",
        border:
            theme.colorScheme === "dark"
                ? "10px solid #1F1E25"
                : "10px solid #EAE8EB",
        borderRadius: "25px",
    },
    ProdCatTitle: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "28px",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    ProdCatDescription: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "16px",
        opacity: 0.7,
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    ProdCatTwitterTxt: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "14px",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    ProdCatDownloadTxt: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "14px",
        color: theme.colorScheme === "dark" ? "#919196" : "#24242D",
    },
    hover: {
        "&:hover": {
            textDecoration: "underline",
        },
    },
    cardTextContainer: {
        [theme.fn.largerThan("xl")]: {
            height: "61px",
        },
    },
    borderRadius10: {
        borderRadius: "10px",
    },
    imageBox: {
        position: "relative",
        width: "100%",
        paddingBottom: "100%",
    },
    imageContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        "&:hover": {
            zIndex: 500,
        },
    },
    boxContainer: {
        transition: "transform 0.3s ease",
        "&:hover": {
            transform: "scale(1.05)",
            zIndex: 500,
        },
    },
    latestBoxContainer: {
        marginTop: "5px",
        transition: "transform 0.3s ease",
        "&:hover": {
            transform: "scale(1.02)",
            zIndex: 500,
        },
    },
}));

export default useStyles;
