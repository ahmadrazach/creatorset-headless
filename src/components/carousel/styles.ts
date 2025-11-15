import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    textCenter: {
        textAlign: "center",
    },
    card: {
        minHeight: rem(250),
        backgroundColor:
            theme.colorScheme === "dark"
                ? "#23222B!important"
                : "#FFFFFF!important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "2rem",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    title: {
        fontFamily: "'adineue PRO Cyr Bold Web'",
        fontWeight: 700,
        lineHeight: rem(26),
        fontSize: rem(28),
        marginTop: theme.spacing.xs,
        color: theme.colorScheme === "dark" ? "#FFFFFF" : "#24242D",
        [theme.fn.smallerThan("md")]: {
            fontSize: rem(22),
        },
    },

    category: {
        opacity: 0.5,
        fontWeight: 500,
        fontFamily: "GothamMedium",
        fontSize: rem(14),
        marginTop: rem(10),
        color: theme.colorScheme === "dark" ? "#FFFFFF" : "#24242D",
    },

    details: {
        fontWeight: 500,
        fontFamily: "GothamMedium",
        color: theme.colorScheme === "dark" ? "#FFFFFF" : "#24242D",
        fontSize: rem(14),
    },
}));

export default useStyles;
