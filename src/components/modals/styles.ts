import { createStyles } from "@mantine/core";

export const useStyles = createStyles(theme => ({
    heading1: {
        display: "block",
        fontFamily: "adineue PRO Cyr Bold Web",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2rem",
        color: theme.colorScheme === "dark" ? "#FFF" : "#24242D",
    },
    dropdown: {
        backgroundColor: theme.colorScheme === "light" ? "#E5E4E6" : "#E3E3FF",
        [theme.fn.smallerThan("md")]: {
            marginLeft: "40px",
        },
    },
    item: {
        color: theme.black,
        textAlign: "center",
        "&[data-hovered]": {
            backgroundColor: "#E3E3FF",
            color: theme.black,
        },
    },
    popularBundlesContainer: {
        boxShadow:
            theme.colorScheme === "light"
                ? "0px 0px 15px 2px lightgray"
                : "none",
        backgroundColor:
            theme.colorScheme === "dark" ? "#353540" : "transparent",
        [theme.fn.smallerThan("md")]: {
            padding: "1rem",
        },
        padding: "0.4rem 1rem 0.4rem 1rem",
        borderRadius: "5px",
        hr: {
            borderColor: theme.colorScheme === "dark" ? "#5B5D6E" : "none",
        },
    },
    w90: {
        maxWidth: "90%",
    },
    margin100: {
        marginTop: "100px!important",
    },
    marginBN90: {
        marginBottom: "-90px",
    },
    marginBN80: {
        marginBottom: "-80px",
    },
    dropedownItemText: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "16px",
        color: theme.black,
    },
    dropedownMenuItem: {
        color: theme.colorScheme === "dark" ? theme.black : theme.white,
        "&:hover": {
            color: "#E71749",
        },
    },
}));
