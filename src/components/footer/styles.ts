import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "start",
    },
    containerCenter: {
        display: "flex",
        justifyContent: "center",
    },
    footer: {
        marginTop: rem(120),
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
        }`,
    },

    logo: {
        maxWidth: rem(200),

        [theme.fn.smallerThan("sm")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
    },

    description: {
        marginTop: rem(5),

        [theme.fn.smallerThan("sm")]: {
            marginTop: theme.spacing.xs,
            textAlign: "center",
        },
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },

    groups: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",

        // [theme.fn.smallerThan("sm")]: {
        //     display: "none",
        // },
    },

    wrapper: {
        width: rem(160),
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        "&:hover": {
            color: "#EF174B!important",
        },
        cursor: "pointer",
    },

    link: {
        display: "block",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: rem(3),
        paddingBottom: rem(3),

        "&:hover": {
            textDecoration: "underline",
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,
        fontFamily: `${theme.fontFamily}`,
        cursor: "pointer",
        // marginBottom: `calc(${theme.spacing.xs} / 2)`,
        "&:hover": {
            color: "#EF174B!important",
        },
    },

    afterFooter: {
        // display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
        // marginTop: theme.spacing.xl,
        // paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        // borderTop: `${rem(1)} solid ${
        //     theme.colorScheme === "dark"
        //         ? theme.colors.dark[4]
        //         : theme.colors.gray[2]
        // }`,
    },

    social: {
        [theme.fn.smallerThan("sm")]: {
            marginTop: theme.spacing.xs,
        },
    },
}));

export default useStyles;
