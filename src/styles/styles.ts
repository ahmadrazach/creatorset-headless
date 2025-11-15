import { createStyles, rem } from "@mantine/core";

const font = "adineue PRO Cyr Bold Web !important";
const blur = "blur(41px)";

const backgroundColor = "#EF174B !important";
const useStyles = createStyles(theme => ({
    shadow: {
        boxShadow: "0px 0px 69px rgba(0, 0, 0, 0.1)",
        backdropFilter: blur,
    },
    h6: {
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
        display: "inline",
        fontSize: "15px",
        fontWeight: 500,
        textTransform: "capitalize",
        "&:hover": {
            color: theme.white,
        },
    },
    bgfilter: {
        backgroundColor: theme.colorScheme === "dark" ? "#2f2d37" : theme.white,
        width: "90%",
    },
    button1: {
        borderRadius: "38px",
        padding: "12px 22px",
        width: "335px",
        height: "45px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#24242D !important"
                : "#EAE8EB !important",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor,
            color: "#FFF! important",
        },
    },
    height120: {
        height: "120px",
    },
    backToHomeBtn: {
        border: theme.colorScheme === "dark" ? "2px solid #3E3851" : "none",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    tutorialBtnContainerMobile: {
        display: "inline-block",
        padding: "0",
    },
    containerMobile: {
        display: "-webkit-box",
        justifyContent: "center",
        alignItems: "center",
    },
    heading1: {
        display: "block",
        fontFamily: font,
        fontStyle: "normal",
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: "2rem",
        whiteSpace: "nowrap",
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
    },
    marginTopN30: {
        marginTop: "-30px",
    },
    headingMobile1: {
        display: "block",
        fontFamily: font,
        fontStyle: "normal",
        textTransform: "capitalize",
        fontWeight: 700,
        fontSize: rem(28),
        padding: "0px 45px",
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
    },
    w90: {
        maxWidth: "90%",
    },
    w95: {
        maxWidth: "95%",
    },
    width100: {
        maxWidth: "100%",
    },
    w100: {
        maxWidth: "100%",
        padding: "0",
        margin: "0",
    },
    w97: {
        maxWidth: "97%",
        padding: "0",
        margin: "0",
    },
    dFlex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    margin100: {
        marginTop: "100px!important",
    },
    margin90: {
        marginTop: "90px!important",
    },
    margin80: {
        marginTop: "80px!important",
    },
    marginN70: {
        marginTop: "-70px !important",
    },
    marginN80: {
        marginTop: "-80px !important",
    },
    marginN50: {
        marginTop: "-50px !important",
    },
    marginN20: {
        marginTop: "-20px !important",
    },
    marginN30: {
        marginTop: "-30px !important",
    },
    marginN40: {
        marginTop: "-40px !important",
    },
    marginBN20: {
        marginBottom: "-20px !important",
    },
    marginBN100: {
        marginBottom: "-100px",
    },
    marginBN90: {
        marginBottom: "-90px",
    },
    marginBN120: {
        marginBottom: "-120px",
    },
    marginBN50: {
        marginBottom: "-50px",
    },
    dropdown: {
        backgroundColor:
            theme.colorScheme === "light" ? "#E5E4E6!important" : "#353540",
    },
    dropedownMenuItem: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        "&:hover": {
            color: "#E71749",
        },
    },
    dropedownItemText: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "16px",
        color: theme.colorScheme === "dark" ? "#FFFF" : "black",
    },
    search: {
        minWidth: "30%",
        borderRadius: "25px",
    },
    sticky: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.colorScheme === "dark" ? "#1A1C1E" : "white",
        padding: "10px 0 10px 10px",
        height: "60px",
        width: "100%",
        zIndex: 3,
    },
    link1: {
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
    TextUnderline: {
        display: "inline",
        paddingBottom: "2px",
        borderBottom: "0.1px solid #EF174B",
    },
    Active: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "42px",
        color: "white",
        backgroundColor,
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#EF174B !important",
            color: "#FFF !important",
        },
    },
    listContainer: {
        cursor: "pointer",
        [theme.fn.smallerThan("md")]: {
            flexWrap: "wrap",
        },
    },
    listIcon: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
        backgroundColor: theme.colorScheme === "dark" ? "#2C2C33" : theme.white,
        border:
            theme.colorScheme === "dark"
                ? "4px solid #24242B"
                : "4px solid #E6E4E7",
        borderRadius: "50%",
        height: "3rem",
        width: "3rem",
        "&:hover": {
            backgroundColor: "#EF174B",
            color: theme.white,
        },
    },
    listText: {
        fontSize: rem(18),
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
    Linkh6: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        display: "inline",
        fontSize: "15px",
        fontWeight: 500,
        "&:hover": {
            color: "#FFF !important",
        },
    },
    button: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "42px",
        width: "335px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#24242D !important"
                : "#EAE8EB !important",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#EF174B !important",
            color: "#FFF !important",
        },
    },
    productsBanner: {
        width: "1204px",
        minHeight: "556px",
        backgroundColor: "#403E47 !important",
        borderRadius: "20px",
    },
    CheckoutBanner: {
        width: "362px",
        minHeight: "260px",
        backgroundColor: "#403E47!important",
        borderRadius: "20px",
    },
    removeBtn: {
        position: "absolute",
        marginLeft: "8.1rem",
        marginTop: "-2rem",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#24242D!important"
                : "#EAE8EB!important",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
    },
    hoverProduct: {
        backgroundColor: "#403E47",
        borderRadius: "20px",
        "&:hover": {
            background:
                theme.colorScheme === "dark"
                    ? "rgba(64, 62, 71, 0.4)"
                    : "#E6E4E7 !important",
            borderRadius: "20px",
            boxShadow:
                theme.colorScheme === "dark"
                    ? "0px 0px 69px rgba(0, 0, 0, 0.25)"
                    : "0px 0px 69px rgba(0, 0, 0, 0.1)",
            backdropFilter: blur,
        },
    },
    button2: {
        fontSize: rem(32),
        fontFamily: "GothamMedium",
        [theme.fn.smallerThan("lg")]: {
            fontSize: rem(24),
            padding: "0px 50px",
        },
        borderRadius: "15px",
        padding: " 0px 100px",
        maxWidth: "500px",
        height: "150px",
        textAlign: "center",
        boxShadow:
            theme.colorScheme === "light"
                ? "0px 0px 15px 2px lightgray"
                : "none",

        backgroundColor:
            theme.colorScheme === "dark"
                ? "#24242D!important"
                : "#FFFFFF!important",
        "&:hover": {
            backgroundColor: "#EF174B!important",
            color: "#FFF!important",
            span: {
                color: theme.white,
            },
        },
        span: {
            whiteSpace: "pre-line",
            lineHeight: 1.5,
            color: theme.colorScheme === "dark" ? theme.white : "#24242D",
        },
    },
    heading: {
        display: "block",
        fontFamily: font,
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: rem(54),
        textAlign: "center",
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
        [theme.fn.smallerThan("xs")]: {
            fontSize: rem(28),
            paddingTop: rem(20),
        },
    },
    subHeading: {
        fontFamily: font,
        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(15),
        },
        fontSize: rem(24),
        textAlign: "center",
        color: "#5B5D6E",
    },
    subHeadingBundlePage: {
        fontFamily: font,
        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(15),
        },
        fontSize: rem(24),
        textAlign: "center",
        color: "rgba(255,255,255,0.7",
    },
    bundleHeading: {
        fontFamily: font,
        fontWeight: 700,
        [theme.fn.smallerThan("md")]: {
            marginLeft: "0px",
            fontSize: rem(28),
        },
        marginLeft: "1.5rem",
        fontSize: rem(32),
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
    },
    buttonGroup: {
        [theme.fn.largerThan("md")]: {
            flexWrap: "nowrap",
        },
        [theme.fn.smallerThan("lg")]: {
            justifyContent: "center",
        },
        justifyContent: "space-between",
        marginBottom: "3rem",
    },
    popularBundlesContainer: {
        boxShadow:
            theme.colorScheme === "light"
                ? "0px 0px 15px 2px lightgray"
                : "none",
        backgroundColor:
            theme.colorScheme === "dark" ? "#24242D" : "transparent",
        [theme.fn.smallerThan("md")]: {
            padding: "1rem",
        },
        padding: "2rem",
        borderRadius: "5px",
        hr: {
            borderColor: theme.colorScheme === "dark" ? "#5B5D6E" : "none",
        },
    },
    CardContainer: {
        width: "250px",
        minHeight: "220px",
        backgroundColor:
            theme.colorScheme === "dark" ? "rgba(64, 62, 71, 0.4)" : "#EAE8EB",
        borderRadius: "15px",
        padding: "20px",
        paddingTop: "50px",
    },
    cardCircleSection: {
        height: "87px",
        width: "87px",
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#2D2C34 !important"
                : "#EAE8EB !important",
        borderRadius: "25rem",
        position: "relative",
        top: "-100px",
        border:
            theme.colorScheme === "dark"
                ? "10px solid #1A1B1E"
                : "10px solid #FFFFFF",
        "&:hover": {
            backgroundColor: "#EF174B!important",
            color: "#FFF!important",
        },
    },
    cardTitleText: {
        fontSize: "21px",
        fontFamily: "GothamMedium",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF !important"
                : "#24242D !important",
    },
    cardDetailText: {
        fontSize: "14px",
        fontFamily: "GothamMedium",
        color:
            theme.colorScheme === "dark"
                ? "#FFFFFF !important"
                : "#24242D !important",
        opacity: "0.7",
    },
    viewBtn: {
        padding: "8px 23px",
        borderRadius: "100px",
        border:
            theme.colorScheme === "dark"
                ? "1px solid #FFFFFF"
                : "1px solid #24242D",
        fontFamily: "GothamMedium",
    },
    ViewBtnText: {
        color: theme.colorScheme === "dark" ? "#FFFFFF" : "#24242D",
    },
    scrollArea: {
        padding: "0 20px 0 20px",
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
    bundleTitleText: {
        fontFamily: font,
        fontWeight: 700,
        fontSize: "54px",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        textAlign: "center",
    },
    cutomMax: {
        width: "444px",
        height: "444px",
        [theme.fn.smallerThan("md")]: {
            height: "320px",
        },
    },
    currencyValue: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        marginLeft: "2px",
    },
}));

export default useStyles;
