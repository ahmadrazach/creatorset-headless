import { createStyles } from "@mantine/core";

const useStyles = createStyles(theme => ({
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
    activeColor: {
        color: "#EF174B",
    },
    detailsText: {
        color:
            theme.colorScheme === "dark"
                ? "rgba(255,255,255,0.5)"
                : "rgba(36, 36, 45,0.5)",
        a: {
            color: "#EF174B",
        },
    },
}));

export default useStyles;
