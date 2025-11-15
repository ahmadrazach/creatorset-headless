/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
import { Container, Tabs, createStyles, rem } from "@mantine/core";

const useStyles = createStyles(theme => ({
    header: {
        marginBottom: rem(24),
    },

    dropdown: {
        backgroundColor:
            theme.colorScheme === "light" ? "#E5E4E6!important" : "#353540",
    },
    dropedownItemText: {
        fontFamily: "GothamMedium",
        fontWeight: 500,
        fontSize: "16px",
        color: theme.colorScheme === "dark" ? "#FFFF" : "black",
    },

    tabsList: {
        borderBottom: "0 !important",
    },

    tab: {
        fontWeight: 500,
        height: rem(64),
        backgroundColor: "transparent",
        borderRadius: "0rem",
        [theme.fn.smallerThan("xs")]: {
            padding: rem(8),
        },
        [theme.fn.smallerThan("400")]: {
            fontSize: rem(12),
        },

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
        },

        "&[data-active]": {
            border: "0",
            borderTop: "4px solid #EF174B",
            color: "#EF174B!important",
        },
    },
}));

interface HeaderTabsProps {
    tabs: string[];
    tabsData?: JSX.Element[];
    defaultTab: string;
    activeTab: string | null;
    setActiveTab: (value: string | null) => void;
}

export function HeaderTabs({
    tabs,
    tabsData,
    defaultTab,
    activeTab,
    setActiveTab,
}: HeaderTabsProps) {
    const { classes } = useStyles();

    const items = tabs.map(tab => (
        <Tabs.Tab
            sx={{
                margin: "0px",
                fontFamily: "GothamMedium",
                ":hover": {
                    backgroundColor: "transparent !important",
                },
            }}
            value={tab}
            key={tab}
        >
            {tab}
        </Tabs.Tab>
    ));

    return (
        <div className={classes.header}>
            <Container
                style={{
                    maxWidth: "100%",
                    display: "flex",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    padding: "0px",
                    height: "auto",
                    borderTop: "1px solid rgba(255 255 255/0.2)",
                    position: "relative",
                }}
            >
                <div>
                    <Tabs
                        value={activeTab}
                        onTabChange={setActiveTab}
                        style={{ flex: "0 0 auto" }}
                        defaultValue={defaultTab}
                        variant="outline"
                        classNames={{
                            tabsList: classes.tabsList,
                            tab: classes.tab,
                        }}
                    >
                        <Tabs.List>{items}</Tabs.List>
                        {tabs.map((item, i) => (
                            <Tabs.Panel value={item} key={item} pt="xs">
                                {tabsData && tabsData[i]}
                            </Tabs.Panel>
                        ))}
                    </Tabs>
                </div>
            </Container>
        </div>
    );
}
