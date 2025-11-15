/* eslint-disable react/no-unstable-nested-components */
import {
    Col,
    Container,
    Grid,
    Group,
    Header,
    Select,
    useMantineTheme,
    SelectItemProps,
    Flex,
    Center,
    ActionIcon,
} from "@mantine/core";
import {
    IconChevronDown,
    IconShoppingBag,
    IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag";
import { useAppSelector, useAppDisatch } from "@/redux/store/store";
import { setCurrencyAction } from "@/redux/services/currencyServices";
import useStyles from "./styles";
import ToggleMode from "../toggleMode/ToggleMode";
import TopLinks from "./TopLinks";
import SearchPopover from "./SearchPopover";
import { countriesData } from "../../../common/constants";

function HeaderSearch() {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDisatch();
    const router = useRouter();
    const currentRoute = router.pathname;

    const [currencyValue, setCurrencyValue] = useState<string>("USD");
    const menuItems = useAppSelector(state => state.menu.data);
    const cartData = useAppSelector(state => state.cart.data);
    const currencyData = useAppSelector(state => state.currency.data);
    const { currency } = currencyData;

    const handleCountriesChange = async (value: string) => {
        const country = countriesData.find(item => item.value === value);
        const currencyLabel = country?.label || "USD";
        setCurrencyValue(currencyLabel);
        await setCurrencyAction(dispatch, currencyLabel);
    };

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

    useEffect(() => {
        setCurrencyValue(currency);
    }, [currency]);

    return (
        <>
            <Header height={56} className={classes.header} mb={24}>
                <Container className={classes.inner}>
                    <Group style={{ marginRight: "20px" }}>
                        {theme.colorScheme === "dark" ? (
                            <Link href="/">
                                <Image
                                    src="/logo/CreatorSet-Text-Logo-Dark.svg"
                                    alt="image"
                                    height={29}
                                    width={186}
                                />
                            </Link>
                        ) : (
                            <Link href="/">
                                <Image
                                    src="/logo/CreatorSet-Text-Logo-Light.svg"
                                    alt="image"
                                    height={29}
                                    width={186}
                                />
                            </Link>
                        )}
                    </Group>

                    <Group className={classes.w100}>
                        <SearchPopover />
                        <Grid>
                            <Col
                                xs={3}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0px",
                                }}
                            >
                                <Image
                                    src="/images/needHelp.svg"
                                    width={24}
                                    height={24}
                                    alt="Help"
                                />
                                <Link href="/instructions" className="mt-1">
                                    <h6
                                        className={`${classes.h6} ml-2 mt-3 whitespace-nowrap`}
                                    >
                                        Need Help?
                                    </h6>
                                </Link>
                            </Col>
                            <Col
                                xs={3}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0px",
                                }}
                            >
                                <Image
                                    src="/images/currency.svg"
                                    width={24}
                                    height={24}
                                    alt="Currency"
                                    className="ml-5"
                                />
                                <Link
                                    href="/apply"
                                    className="mt-1"
                                    style={{ zIndex: 1 }}
                                >
                                    <h6
                                        className={`${classes.h6} ml-2 mt-3 whitespace-nowrap`}
                                    >
                                        Sell Your Assets
                                    </h6>
                                </Link>
                            </Col>
                            <Col
                                xs={2}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0px",
                                }}
                            >
                                <Center mx="auto">
                                    <div>
                                        <ReactCountryFlag
                                            style={{
                                                fontSize: "15px",
                                                position: "relative",
                                                left: "98px",
                                                top: "14px",
                                            }}
                                            countryCode={
                                                currencyValue !== ""
                                                    ? `${currencyValue
                                                          ?.toLocaleString()
                                                          .trim()} `
                                                    : "USD "
                                            }
                                        />
                                    </div>

                                    <Select
                                        sx={{
                                            border: "none",
                                            marginLeft: "90px",
                                            marginRight: "50px",
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
                                            "& .mantine-Input-input::placeholder":
                                                {
                                                    color:
                                                        theme.colorScheme ===
                                                        "dark"
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
                                        itemComponent={Item}
                                        value={
                                            countriesData.find(
                                                item =>
                                                    item.label === currencyValue
                                            )?.value
                                        }
                                        placeholder="USD"
                                        data={countriesData}
                                        onChange={handleCountriesChange}
                                    />
                                </Center>
                            </Col>
                            <Col
                                xs={1}
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
                                        marginLeft: "27px",
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
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div className="m-0 pt-1">
                                            {cartData.itemCount}
                                        </div>
                                    </span>
                                </Link>
                            </Col>
                            <Col
                                xs={1}
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
                            </Col>
                            <Col
                                xs={2}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0px",
                                }}
                            >
                                <div
                                    style={{
                                        border: "none",
                                        display: "flex",
                                        justifyContent: "center",
                                        marginLeft: "10px",
                                    }}
                                >
                                    <ToggleMode size="md" />
                                </div>
                            </Col>
                        </Grid>
                    </Group>
                </Container>
            </Header>

            {currentRoute !== "/" && <TopLinks menuItems={menuItems} />}
        </>
    );
}

export default HeaderSearch;
