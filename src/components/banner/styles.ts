import { createStyles, rem } from "@mantine/core";

const adineue = "adineue PRO Cyr Bold Web";
const useStyles = createStyles(theme => ({
    shadow: {
        boxShadow: "0px 0px 69px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(41px)",
    },
    topBanner: {
        backgroundColor: theme.colorScheme === "dark" ? "#2F2D37" : theme.white,
        boxShadow:
            theme.colorScheme === "light"
                ? "0px 0px 15px 2px lightgray"
                : "none",
        height: "234px",
        width: "100%",
        borderRadius: "30px",
    },
    banner: {
        backgroundColor: theme.colorScheme === "dark" ? "#2F2D37" : theme.white,
        boxShadow:
            theme.colorScheme === "light"
                ? "0px 0px 15px 2px lightgray"
                : "none",
        height: "150px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "30px",
    },
    mobileBanner: {
        backgroundColor: theme.colorScheme === "dark" ? "#2F2D37" : theme.white,
        height: "210px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "0px",
    },
    heading: {
        fontFamily: adineue,
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
        fontWeight: 700,
        fontSize: rem(50),
    },
    mobileHeading: {
        fontFamily: adineue,
        color: theme.colorScheme === "dark" ? theme.white : "#24242D",
        fontWeight: 700,
        fontSize: rem(32),
    },
    socialLogos: {
        width: "1200px",
        maxHeight: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
        [theme.fn.smallerThan("xl")]: {
            marginTop: "75px",
        },
        [theme.fn.smallerThan("lg")]: {
            marginTop: "80px",
        },
        [theme.fn.smallerThan("md")]: {
            marginTop: "130px",
        },
        [theme.fn.smallerThan("xs")]: {
            marginTop: "90px",
        },
    },
    logoContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        backgroundColor: "#2D2C34 !important",
        boxShadow: "0px 0px 45.904327392578125px 0px rgba(0, 0, 0, 0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        height: "107px",
        width: "107px",
        zIndex: 2,
        "&:hover": {
            backgroundColor: "#EF174B !important",
            color: theme.white,
        },
        [theme.fn.smallerThan("md")]: {
            height: "80.02px",
            width: "80.02px",
        },
    },
    redLogo: {
        backgroundColor: "#EF174B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        "&:hover": {
            backgroundColor: "#EF174B !important",
            color: theme.white,
        },
    },
    CreatorSetStudioBtn: {
        borderRadius: "38px",
        padding: "12px 22px",
        height: "57px",
        width: "250px",
        color: theme.white,
        backgroundColor: "#24242D !important",
        margin: "0px 10px",
        "&:hover": {
            backgroundColor: "#24242D !important",
            color: theme.white,
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
            color: theme.white,
        },
    },
    instaImagecontainer: {
        position: "relative",
        top: "-80px",
    },
    assetsDiscordImagecontainer: {
        position: "relative",
        top: "-100px",
    },
    discordImagecontainer: {
        position: "relative",
        top: "-165px",
        left: "40px",
    },
    twitchImagecontainer: {
        position: "relative",
        top: "-150px",
        left: "50px",
    },
    tiktokImagecontainer: {
        position: "relative",
        top: "-130px",
    },
    assetsInstaImagecontainer: {
        position: "relative",
        top: "-20px",
    },
    assetsYoutubeImagecontainer: {
        position: "relative",
        top: "-70px",
        left: "110px",
    },
    BannerTitle: {
        fontFamily: "adineue PRO Cyr Bold Web",
        fontWeight: 700,
        fontSize: "54px",
        lineHeight: "92px",
    },
    w90: {
        maxWidth: "90%",
    },
    Linkh6: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        // color: theme.white,
        display: "inline",
        fontSize: "15px",
        fontWeight: 500,
        "&:hover": {
            color: theme.white,
        },
    },
    whiteColor: {
        color: theme.white,
    },
    sellAssetsContainer: {
        height: "358px",
        backgroundColor:
            theme.colorScheme === "dark" ? "#2F2D37" : "#EAE8EB!important",
        borderRadius: "30px",
    },
}));

export default useStyles;
