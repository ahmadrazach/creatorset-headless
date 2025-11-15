import { createStyles, em, rem } from "@mantine/core";

const useStyles = createStyles(theme => ({
    popularBundles: {
        padding: "10px",
        // marginLeft: "-20px",
        img: {
            [theme.fn.smallerThan("xs")]: {
                maxWidth: "initial",
                marginTop: "-10px",
            },
        },
        div: {
            fontFamily: "adineue PRO Cyr Bold Web!important",
            [theme.fn.smallerThan("lg")]: {
                fontSize: rem(28),
            },
            [theme.fn.smallerThan("sm")]: {
                fontSize: "15px",
            },
            [`@media (max-width: ${em(320)})`]: {
                fontSize: rem(14),
            },
            fontSize: rem(36),
            color: theme.colorScheme === "dark" ? "#FFF" : "",
        },
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark" ? "#393943" : "#EAE8EB",
            boxShadow:
                // eslint-disable-next-line sonarjs/no-all-duplicated-branches
                theme.colorScheme === "dark"
                    ? "0px 0px 69px rgba(0, 0, 0, 0.1)"
                    : "",
        },
    },
    fadeText: {
        [theme.fn.smallerThan("lg")]: {
            fontSize: "1.75rem!important",
        },
        [theme.fn.smallerThan("sm")]: {
            fontSize: "1rem!important",
        },
        [`@media (max-width: ${em(320)})`]: {
            fontSize: "0.875rem!important",
        },
        fontSize: "2rem!important",
        color: "#5B5D6E!important",
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
    w100: {
        maxWidth: "100%",
        padding: "0",
        margin: "0",
    },
}));

export default useStyles;
