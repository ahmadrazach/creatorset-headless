/* eslint-disable sonarjs/no-duplicate-string */
import { createStyles, rem } from "@mantine/core";

// eslint-disable-next-line sonarjs/no-duplicate-string
const font = "adineue PRO Cyr Bold Web";
// eslint-disable-next-line sonarjs/cognitive-complexity
const useStyles = createStyles(theme => ({
    listContainer: {
        [theme.fn.smallerThan("md")]: {
            flexWrap: "wrap",
        },
    },
    listIcon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
        border: "4px solid #E6E4E7",
        borderRadius: "50%",
        height: "3rem",
        width: "3rem",
        // padding: rem(24),
        "&:hover": {
            backgroundColor: "#EF174B",
            color: "#fff",
        },
    },
    listText: {
        fontSize: rem(18),
    },
    margin100: {
        marginTop: "100px!important",
    },
    heading1: {
        display: "block",
        fontFamily: font,
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2rem",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    w90: {
        maxWidth: "90%",
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
    },
    tutorialContent: {
        display: "block",
        fontSize: "17px",
        lineHeight: "24px",
    },
    activeColor: {
        color: "#EF174B",
    },
    Linkh6: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        display: "inline",
        fontSize: "15px",
        fontWeight: 500,
        "&:hover": {
            color: theme.white,
        },
    },
    button: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "42px",
        width: "335px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#24242D!important"
                : "#EAE8EB!important",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#EF174B !important",
            color: "#FFF!important",
        },
    },
    checkoutBtn: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "42px",
        maxWidth: "299px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#24242D!important"
                : "#EAE8EB!important",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#EF174B !important",
            color: "#FFF!important",
        },
    },
    Active: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "42px",
        color: "white",
        backgroundColor: "#EF174B!important",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#EF174B!important",
            color: "#FFF!important",
        },
    },
    productsBannerHeader: {
        maxWidth: "1204px",
    },
    productsBanner: {
        maxWidth: "1204px",
        padding: "8px",
        paddingTop: "25px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "rgba(64, 62, 71, 0.4)"
                : "#FFFFFF!important",
        borderRadius: "20px",
        boxShadow:
            theme.colorScheme === "dark"
                ? "0px 0px 69px rgba(0, 0, 0, 0.25)"
                : "0px 0px 69px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(41px) !important",
    },
    CheckoutBanner: {
        maxWidth: "362px",
        minHeight: "260px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "rgba(64, 62, 71, 0.4)"
                : "#FFFFFF !important",
        borderRadius: "20px",
        boxShadow:
            theme.colorScheme === "dark"
                ? "0px 0px 69px rgba(0, 0, 0, 0.25)"
                : "0px 0px 69px rgba(0, 0, 0, 0.1)",
        backdropFilter:
            theme.colorScheme === "dark"
                ? "blur(41px)"
                : "blur(41px) !important",
    },
    removeBtn: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "42px",
        // margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#EF174B !important",
            color: "#FFF!important",
        },
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#393742!important"
                : "#EAE8EB!important",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
    },
    hoverProduct: {
        "&:hover": {
            width: "inherit",
            background:
                theme.colorScheme === "dark"
                    ? "rgba(64, 62, 71, 0.4)"
                    : "#E6E4E7 !important",
            boxShadow:
                theme.colorScheme === "dark"
                    ? "0px 0px 69px rgba(0, 0, 0, 0.25)"
                    : "0px 0px 69px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(41px)",
            // opacity: theme.colorScheme === "dark" ? 1 : 0.5,
        },
    },
    hoverProductMobile: {
        borderBottom: "1px solid rgba(255,255,255, 0.3)",
        margin: "0",
        "&:hover": {
            width: "inherit",
            borderBottom: "none",
            background:
                theme.colorScheme === "dark"
                    ? "rgba(64, 62, 71, 0.4)"
                    : "#E6E4E7",
            boxShadow:
                theme.colorScheme === "dark"
                    ? "0px 0px 69px rgba(0, 0, 0, 0.25)"
                    : "0px 0px 69px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(41px)",
            // opacity: theme.colorScheme === "dark" ? 1 : 0.5,
        },
    },
    productTitle: {
        fontFamily: font,
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF!important"
                : "#403E47 !important",
    },
    lineThroughPrice: {
        textDecoration: "line-through",
        fontFamily: font,
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "17px",
        lineHeight: "24px",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF!important"
                : "#403E47 !important",
        opacity: "0.4",
    },
    priceText: {
        fontFamily: font,
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "28px",
        lineHeight: "24px",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF!important"
                : "#403E47 !important",
    },
    propertyContainer: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    propertyTitleText: {
        fontFamily: font,
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "15px",
        lineHeight: "24px",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF!important"
                : "#403E47 !important",
        opacity: "0.5",
    },
    mobileTextContainer: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#3A3843 !important"
                : "#E6E4E7 !important",
        borderRadius: "7px",
        color: theme.colorScheme === "dark" ? "#FFFFFF" : "#403E47",
    },
    propertyDescriptionText: {
        fontFamily: "adineue PRO Cyr Bold Web",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "15px",
        lineHeight: "24px",
        paddingLeft: "1px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF!important"
                : "#403E47 !important",
    },
    subTotalText: {
        fontFamily: "GothamMedium",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "24px",
        lineHeight: "24px",
        marginLeft: "1rem",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF!important"
                : "#403E47 !important",
    },
    subTotalAmmountText: {
        fontFamily: "adineue PRO Cyr Bold Web",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "28px",
        lineHeight: "24px",
        marginRight: "-4.7rem",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF!important"
                : "#403E47 !important",
    },
    hrLine: {
        border: "1px solid #FFFF",
        opacity: 0.2,
    },
}));

export default useStyles;
