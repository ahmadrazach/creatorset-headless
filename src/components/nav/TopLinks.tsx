import {
    Box,
    Button,
    Container,
    HoverCard,
    List,
    ScrollArea,
    rem,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import useStyles from "./styles";
import { TopLinksProps, MenuItem } from "../../../common/types";

function TopLinks({ menuItems }: TopLinksProps) {
    const matches = useMediaQuery("(max-width: 720px)");
    const { items } = menuItems || {};
    const { classes } = useStyles();

    // Create separate state variables for each button's hover state
    const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>(
        {}
    );

    // Function to update the hover state for a button
    const handleHover = (itemId: string, isHovered: boolean) => {
        setHoverStates(prevStates => ({
            ...prevStates,
            [itemId]: isHovered,
        }));
    };

    return (
        <Box
            className={
                matches
                    ? `${classes.sticky} ${classes.marginBN30} pb-5`
                    : `${classes.sticky}`
            }
        >
            <ScrollArea type="never" sx={{ overflow: "visible" }}>
                <Container
                    className={classes.container}
                    sx={{ paddingLeft: matches ? "200px" : "" }}
                >
                    {items?.map((item: MenuItem) => {
                        const url = new URL(item.url);

                        // Check if hover state is defined for the current button
                        const isHovered = hoverStates[item.id] || false;

                        return (
                            <HoverCard width={200} shadow="md" key={item.id}>
                                {item.items.length > 0 ? (
                                    <HoverCard.Target>
                                        <Button
                                            className={`${classes.button} ${classes.Linkh6}`}
                                            key={item.id}
                                            onMouseEnter={() =>
                                                handleHover(item.id, true)
                                            }
                                            onMouseLeave={() =>
                                                handleHover(item.id, false)
                                            }
                                            rightIcon={
                                                isHovered ? (
                                                    <IconChevronUp
                                                        size={rem(18)}
                                                    />
                                                ) : (
                                                    <IconChevronDown
                                                        size={rem(18)}
                                                    />
                                                )
                                            }
                                        >
                                            <div className="pt-3">
                                                {item.title}
                                            </div>
                                        </Button>
                                    </HoverCard.Target>
                                ) : (
                                    <HoverCard.Target>
                                        <Link href={url.pathname}>
                                            <Button
                                                className={`${classes.button} ${classes.Linkh6}`}
                                                key={item.id}
                                                onMouseEnter={() =>
                                                    handleHover(item.id, true)
                                                }
                                                onMouseLeave={() =>
                                                    handleHover(item.id, false)
                                                }
                                            >
                                                <div className="pt-3">
                                                    {item.title}
                                                </div>
                                            </Button>
                                        </Link>
                                    </HoverCard.Target>
                                )}
                                {item.items.length > 0 && (
                                    <HoverCard.Dropdown
                                        sx={{
                                            padding: "15px 0px 10px 20px",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <List>
                                            {item.items.map(subitem => {
                                                const subUrl = new URL(
                                                    subitem.url
                                                );
                                                return (
                                                    <Link
                                                        href={subUrl.pathname}
                                                        key={subitem.id}
                                                    >
                                                        <List.Item
                                                            sx={{
                                                                "&:hover": {
                                                                    color: "#EF174B",
                                                                },
                                                            }}
                                                        >
                                                            {subitem.title}
                                                        </List.Item>
                                                    </Link>
                                                );
                                            })}
                                        </List>
                                    </HoverCard.Dropdown>
                                )}
                            </HoverCard>
                        );
                    })}
                </Container>
            </ScrollArea>
        </Box>
    );
}

TopLinks.defaultProps = {
    menuItems: undefined,
};

export default TopLinks;
