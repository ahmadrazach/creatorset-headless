import {
    Box,
    Button,
    Flex,
    Grid,
    Space,
    Text,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
import useStyles from "./styles";

function DescriptionTab({
    description,
    open,
    deliveredFiles,
}: {
    description: string;
    open: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
    deliveredFiles: {
        type: string;
        value: string;
    };
}) {
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 720px)");
    const theme = useMantineTheme();
    const [showMore, setShowMore] = useDisclosure(true);

    const renderChecklistItem = (text: string, icon?: string) => (
        <>
            <Flex
                gap={10}
                justify={{ base: "center", sm: "start" }}
                align={{ base: "center", sm: "start" }}
            >
                <Image
                    src={`/images/${icon || "Check"}.svg`}
                    width={24}
                    height={24}
                    alt="Check"
                />
                <Text
                    style={{
                        fontSize: matches ? rem(16) : rem(18),
                        color:
                            theme.colorScheme === "dark"
                                ? theme.white
                                : theme.black,
                    }}
                    className="mt-[3px]"
                >
                    {text}
                </Text>
            </Flex>
            <Space h="lg" />
        </>
    );

    const renderSection = (title: string, items: string[], icon?: string) => (
        <Grid.Col span={matches ? 12 : 3}>
            <Text
                className={classes.heading1}
                style={{ fontSize: matches ? rem(28) : rem(34) }}
            >
                {title}
            </Text>
            {items.map(item => renderChecklistItem(item, icon))}
        </Grid.Col>
    );

    return (
        <Box>
            <Box>
                <Text
                    className={classes.heading1}
                    style={{ fontSize: matches ? rem(28) : rem(34) }}
                >
                    Description
                </Text>
                <Text style={{ fontSize: matches ? rem(16) : rem(18) }}>
                    {showMore
                        ? `${description.substring(0, 200)}`
                        : description}
                </Text>
                {description.length > 200 && showMore && (
                    <Button
                        className={`${
                            theme.colorScheme === "dark"
                                ? "border-white"
                                : "border-black"
                        } rounded-full h-12 w-48 flex items-center justify-center`}
                        style={
                            matches
                                ? { width: "100%", fontFamily: "GothamMedium" }
                                : { fontFamily: "GothamMedium" }
                        }
                        onClick={() => setShowMore.toggle()}
                    >
                        <span
                            className={`${
                                theme.colorScheme === "dark"
                                    ? "text-white"
                                    : "text-black"
                            } mt-2 ml-2 font-light`}
                        >
                            Show More
                        </span>
                    </Button>
                )}
            </Box>
            <Box className="mt-5">
                <Grid className={matches ? "text-center" : ""}>
                    <Grid.Col span={matches ? 12 : 6}>
                        <Text
                            className={classes.heading1}
                            style={{ fontSize: matches ? rem(28) : rem(34) }}
                        >
                            What You Get
                        </Text>
                        <Grid>
                            <Grid.Col span={matches ? 12 : 6}>
                                {renderChecklistItem("MOV File (Transparent)")}
                                {renderChecklistItem("MP4 File (Green Screen)")}
                                {renderChecklistItem("One Free Revision")}
                            </Grid.Col>
                            <Grid.Col span={matches ? 12 : 6}>
                                {renderChecklistItem("Sound Effects Included")}
                                {renderChecklistItem("Instructions Document")}
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    {renderSection(
                        "Fast Delivery",
                        ["5 Minute Delivery"],
                        "DeliveryIcon"
                    )}
                    {renderSection("Compatibility", [
                        "Adobe Premiere Pro CC 2016 and later",
                        "Requires 140MB of free space",
                    ])}
                </Grid>
            </Box>
            <Box style={{ fontSize: rem(26), marginTop: rem(12) }}>
                CreatorSet Default License
            </Box>
            {deliveredFiles && (
                <Button
                    className={`${
                        theme.colorScheme === "dark"
                            ? "border-white"
                            : "border-black"
                    } rounded-full h-12 w-48 flex items-center justify-center`}
                    style={
                        matches
                            ? { width: "100%", fontFamily: "GothamMedium" }
                            : { fontFamily: "GothamMedium" }
                    }
                    onClick={open}
                >
                    <span
                        className={`${
                            theme.colorScheme === "dark"
                                ? "text-white"
                                : "text-black"
                        } mt-2 ml-2 font-light`}
                    >
                        Show Delivered Files
                    </span>
                </Button>
            )}
        </Box>
    );
}

export default DescriptionTab;
