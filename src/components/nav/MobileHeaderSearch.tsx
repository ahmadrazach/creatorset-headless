import {
    ActionIcon,
    Box,
    Burger,
    Center,
    Collapse,
    Container,
    Divider,
    Drawer,
    Flex,
    Grid,
    Group,
    Header,
    RemoveScroll,
    ScrollArea,
    Select,
    SelectItemProps,
    Text,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
    IconChevronDown,
    IconChevronUp,
    IconShoppingBag,
    IconUser,
} from "@tabler/icons-react";
import { useAppDisatch, useAppSelector } from "@/redux/store/store";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import React, { forwardRef, useEffect, useState } from "react";
import { setCurrencyAction } from "@/redux/services/currencyServices";
import useStyles from "./styles";
import ToggleMode from "../toggleMode/ToggleMode";
import TopLinks from "./TopLinks";
import SearchPopover from "./SearchPopover";
import { countriesData } from "../../../common/constants";

const mockdata = [
    {
        collapsable: false,
        title: "All Products",
    },
    {
        collapsable: false,
        title: "Bundles",
    },
    {
        collapsable: true,
        title: "Socials",
    },
    {
        collapsable: true,
        title: "Assets",
    },
    {
        collapsable: true,
        title: "Gender",
    },
    {
        collapsable: true,
        title: "Software",
    },
    {
        collapsable: true,
        title: "Action",
    },
    {
        collapsable: true,
        title: "Gaming",
    },
];
const mocksubdata = [
    {
        title: "Memes",
    },
    {
        title: "Classy",
    },
    {
        title: "Art",
    },
];

function MobileHeaderSearch() {
    const matches = useMediaQuery("(max-width: 720px)");
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDisatch();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [innerLinksOpened, { toggle: innerToggleLinks }] =
        useDisclosure(false);
    const menuItems = useAppSelector(state => state.menu.data);
    const cartData = useAppSelector(state => state.cart.data);
    const [currencyValue, setCurrencyValue] = useState<string>("USD");
    const currencyData = useAppSelector(state => state.currency.data);
    const { currency } = currencyData;

    const links = mockdata.map(item => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <div className="ml-6 w-full">
                    {item.collapsable ? (
                        <>
                            <UnstyledButton
                                className={classes.link}
                                onClick={innerToggleLinks}
                                sx={{
                                    width: "100%",
                                    backgroundColor: "none",
                                    padding: "0",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                <Center
                                    inline
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        className={classes.drawerTitle}
                                        style={{
                                            color: innerLinksOpened
                                                ? "#EF174B"
                                                : "",
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    {innerLinksOpened ? (
                                        <div className={classes.marginTN10}>
                                            <IconChevronUp
                                                size={22}
                                                color={
                                                    theme.colorScheme === "dark"
                                                        ? theme.white
                                                        : theme.black
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className={classes.marginTN10}>
                                            <IconChevronDown
                                                size={22}
                                                color={
                                                    theme.colorScheme === "dark"
                                                        ? theme.white
                                                        : theme.black
                                                }
                                            />
                                        </div>
                                    )}
                                </Center>
                            </UnstyledButton>
                            <Collapse in={innerLinksOpened}>
                                {mocksubdata?.map(item2 => (
                                    <UnstyledButton
                                        className={classes.subLink}
                                        key={item2.title}
                                    >
                                        <Group noWrap align="flex-start">
                                            <div className="ml-6">
                                                <Text
                                                    className={
                                                        classes.drawerTitle
                                                    }
                                                >
                                                    {item2.title}
                                                </Text>
                                            </div>
                                        </Group>
                                    </UnstyledButton>
                                ))}
                            </Collapse>
                        </>
                    ) : (
                        <Text className={classes.drawerTitle}>
                            {item.title}
                        </Text>
                    )}
                </div>
            </Group>
        </UnstyledButton>
    ));

    // eslint-disable-next-line react/no-unstable-nested-components
    const Item = forwardRef<HTMLDivElement, SelectItemProps>(
        ({ label, value, ...others }, ref) => {
            return (
                <div ref={ref} {...others}>
                    <Flex align="center">
                        <div className="mt-3">
                            <ReactCountryFlag
                                style={{ fontSize: "15px" }}
                                countryCode={
                                    value ? value?.toLocaleString() : "USD"
                                }
                            />
                        </div>

                        <div className={classes.currencyValue}>{label}</div>
                    </Flex>
                </div>
            );
        }
    );

    const handleCountriesChange = async (value: string) => {
        const country = countriesData.find(item => item.value === value);
        const currencyLabel = country?.label || "USD";
        setCurrencyValue(currencyLabel);
        await setCurrencyAction(dispatch, currencyLabel);
    };

    useEffect(() => {
        setCurrencyValue(currency);
    }, [currency]);

    return (
        <>
            <Header height={56} mb={90}>
                <Container className={matches ? "mt-3" : ""}>
                    <Grid
                        sx={{
                            flexWrap: "nowrap",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Grid.Col span={2}>
                            <Burger
                                opened={drawerOpened}
                                onClick={toggleDrawer}
                                className={classes.hiddenDesktop}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            {theme.colorScheme === "dark" ? (
                                <Link href="/">
                                    <Image
                                        src="/logo/CreatorSet-Text-Logo-Dark.svg"
                                        alt="image"
                                        height={23}
                                        width={153}
                                    />
                                </Link>
                            ) : (
                                <Link href="/">
                                    <Image
                                        src="/logo/CreatorSet-Text-Logo-Light.svg"
                                        alt="image"
                                        height={23}
                                        width={153}
                                    />
                                </Link>
                            )}
                        </Grid.Col>
                        <Grid.Col
                            span={2}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0px",
                            }}
                        >
                            <Link
                                href="/cart"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0px",
                                }}
                            >
                                <IconShoppingBag
                                    className={classes.icons}
                                    size="1.5rem"
                                    stroke={1.5}
                                />
                                <span
                                    style={{
                                        color: "#FFF",
                                        backgroundColor: "#EF174B",
                                        padding: "0px 4px",
                                        borderRadius: "10px",
                                        fontSize: "10px",
                                        marginLeft: "-6px",
                                        marginTop: "-10px",
                                    }}
                                >
                                    <div className="m-0 pt-1">
                                        {cartData.itemCount}
                                    </div>
                                </span>
                            </Link>
                        </Grid.Col>
                        <Grid.Col
                            span={2}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0px",
                            }}
                        >
                            <ActionIcon
                                component="a"
                                href="https://studio.creatorset.com/"
                                target="_blank"
                            >
                                <IconUser size="1.5rem" stroke={1.5} />
                            </ActionIcon>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Container className="mt-5 mx-3">
                    <SearchPopover />
                </Container>
                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    sx={{
                        ".mantine-CloseButton-root svg": {
                            width: "2.5rem",
                            height: "2.5rem",
                            overflow: "hidden",
                            color:
                                theme.colorScheme === "dark"
                                    ? theme.white
                                    : theme.black,
                        },
                    }}
                    size="100%"
                    padding="xl"
                    title={
                        theme.colorScheme === "dark" ? (
                            <Center mx="auto">
                                <div>
                                    <Image
                                        src="/logo/CreatorSet-Text-Logo-Dark.svg"
                                        alt="image"
                                        height={33}
                                        width={212}
                                        className="mx-14"
                                    />
                                </div>
                            </Center>
                        ) : (
                            <Center mx="auto">
                                <div>
                                    <Image
                                        src="/logo/CreatorSet-Text-Logo-Light.svg"
                                        alt="image"
                                        height={33}
                                        width={212}
                                        className="mx-14"
                                    />
                                </div>
                            </Center>
                        )
                    }
                    className={classes.hiddenDesktop}
                    zIndex={1000000}
                >
                    <div
                        className={`${RemoveScroll.classNames.fullWidth} ${RemoveScroll.classNames.zeroRight} mt-10`}
                    >
                        <ScrollArea
                            h={`calc(100vh - ${rem(260)})`}
                            mx="md"
                            type="never"
                        >
                            <UnstyledButton
                                className={classes.link}
                                onClick={toggleLinks}
                                sx={{
                                    width: "100%",
                                    backgroundColor: "none",
                                    "&:hover": {
                                        backgroundColor: "transparent",
                                    },
                                }}
                            >
                                <Center
                                    inline
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box
                                        component="span"
                                        mr={10}
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: 500,
                                            color: linksOpened
                                                ? "#EF174B"
                                                : theme.colorScheme === "dark"
                                                ? theme.white
                                                : theme.black,
                                        }}
                                    >
                                        All Categories
                                    </Box>
                                    {linksOpened ? (
                                        <div className={classes.marginTN10}>
                                            <IconChevronUp
                                                size={22}
                                                color={
                                                    theme.colorScheme === "dark"
                                                        ? theme.white
                                                        : theme.black
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className={classes.marginTN10}>
                                            <IconChevronDown
                                                size={22}
                                                color={
                                                    theme.colorScheme === "dark"
                                                        ? theme.white
                                                        : theme.black
                                                }
                                            />
                                        </div>
                                    )}
                                </Center>
                            </UnstyledButton>
                            <Collapse in={linksOpened}>{links}</Collapse>
                            <Box
                                className={classes.link}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "24px",
                                }}
                            >
                                <Image
                                    src="/images/needHelp.svg"
                                    width={20}
                                    height={20}
                                    style={{
                                        marginRight: "10px",
                                    }}
                                    alt="Help"
                                />
                                <Link
                                    href="/instructions"
                                    onClick={closeDrawer}
                                >
                                    <Text
                                        className={`${classes.drawerTitle} mt-4`}
                                    >
                                        Need Help?
                                    </Text>
                                </Link>
                            </Box>
                            <Box
                                className={classes.link}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "24px",
                                }}
                            >
                                <Image
                                    src="/images/currency.svg"
                                    width={20}
                                    height={20}
                                    alt="Currency"
                                    style={{
                                        marginRight: "10px",
                                    }}
                                />
                                <Link
                                    href="/products/custom-bundle"
                                    onClick={closeDrawer}
                                >
                                    <Text
                                        className={`${classes.drawerTitle} mt-4`}
                                    >
                                        Sell Your Assets
                                    </Text>
                                </Link>
                            </Box>
                        </ScrollArea>
                    </div>
                    <Flex justify="center" align="center" className="my-12">
                        <ToggleMode size="xl" />
                        <Divider orientation="vertical" className="ml-6" />
                        <Flex justify="center" align="center">
                            <ReactCountryFlag
                                style={{
                                    fontSize: "30px",
                                    position: "relative",
                                    left: "35px",
                                    top: "12px",
                                }}
                                countryCode={
                                    currencyValue !== ""
                                        ? `${currencyValue
                                              ?.toLocaleString()
                                              .trim()} `
                                        : "USD"
                                }
                            />

                            <Select
                                sx={{
                                    border: "none",
                                    fontFamily: "GothamMedium",
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    "& .mantine-Select-item": {
                                        backgroundColor:
                                            theme.colorScheme === "dark"
                                                ? theme.black
                                                : theme.white,
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.white
                                                : theme.black,
                                    },
                                    "& .mantine-Select-dropdown": {
                                        width: "100px !important",
                                        marginLeft: "-9px",
                                    },
                                    "& .mantine-Select-input": {
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.white
                                                : theme.black,
                                        width: "83px",
                                    },
                                    "& .mantine-Input-rightSection": {
                                        right: "12px",
                                        position: "absolute",
                                        top: 0,
                                        bottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "2.25rem",
                                        pointerEvents: "none",
                                    },
                                    "& .mantine-Input-input::placeholder": {
                                        color:
                                            theme.colorScheme === "dark"
                                                ? theme.white
                                                : theme.black,
                                    },
                                }}
                                rightSection={
                                    <IconChevronDown
                                        data-chevron="true"
                                        size="1rem"
                                    />
                                }
                                value={
                                    countriesData.find(
                                        item => item.label === currencyValue
                                    )?.value
                                }
                                itemComponent={Item}
                                placeholder="USD"
                                data={countriesData}
                                onChange={handleCountriesChange}
                            />
                        </Flex>
                    </Flex>
                </Drawer>
            </Header>
            <TopLinks menuItems={menuItems} />
        </>
    );
}

export default MobileHeaderSearch;
