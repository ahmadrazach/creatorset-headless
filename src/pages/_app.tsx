import { FooterLinks } from "@/components/footer/Footer";
import { MobileFooterLinks } from "@/components/footer/MobileFooter";
import HeaderSearch from "@/components/nav/HeaderSearch";
import MobileHeaderSearch from "@/components/nav/MobileHeaderSearch";
import {
    ColorScheme,
    ColorSchemeProvider,
    LoadingOverlay,
    MantineProvider,
    rem,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import getMenu from "@/redux/services/menuServices";
import { Notifications } from "@mantine/notifications";
import { setMenu } from "@/redux/reducers/menu";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import store from "../redux/store/store";

export default function App({ Component, pageProps }: AppProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const [visible] = useDisclosure(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(prevColorScheme =>
            value || prevColorScheme === "dark" ? "light" : "dark"
        );
        window.localStorage.setItem(
            "theme",
            colorScheme === "dark" ? "light" : "dark"
        );
    };
    const matches = useMediaQuery("(max-width: 860px)");

    useEffect(() => {
        const theme = window.localStorage.getItem("theme") as ColorScheme;
        setColorScheme(theme || "dark");
        setIsInitialized(true);
        const fetchMenu = async () => {
            try {
                const menuData = await getMenu(store.dispatch);
                store.dispatch(setMenu(menuData));
            } catch (error) {
                console.error("Error fetching menu:", error);
            }
        };

        fetchMenu();
    }, []);

    if (!isInitialized) {
        return <LoadingOverlay visible={visible} overlayBlur={2} />; // Render nothing or a loading spinner during initialization
    }

    return (
        <Provider store={store}>
            <Layout>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider
                        withCSSVariables
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            colorScheme,
                            colors: {
                                deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
                                blue: ["#E9EDFC", "#C1CCF6", "#99ABF0"],
                                primaryColor: ["#EF174B"],
                            },
                            components: {
                                Input: {
                                    styles: {
                                        input: {
                                            borderRadius: "25px",
                                            backgroundColor: "#FFF",
                                            color: "#000",
                                        },
                                    },
                                },
                                Text: {
                                    styles: {
                                        root: {
                                            fontFamily:
                                                "GothamMedium !important",
                                            fontSize: rem(21),
                                        },
                                    },
                                },
                            },
                            white: "#FFFFFF",
                            black: "#24242D",

                            shadows: {
                                md: "1px 1px 3px rgba(0, 0, 0, .25)",
                                xl: "5px 5px 3px rgba(0, 0, 0, .25)",
                            },

                            fontSizes: {
                                lg: "1rem",
                            },

                            headings: {
                                fontFamily:
                                    "GothamMedium, sans-serif !important",
                                sizes: {
                                    h1: { fontSize: "2rem" },
                                    h6: { fontSize: "0.9375rem" },
                                },
                            },
                        }}
                    >
                        <Notifications position="top-right" zIndex={2077} />
                        {matches ? <MobileHeaderSearch /> : <HeaderSearch />}
                        <Component {...pageProps} />
                        {matches ? <MobileFooterLinks /> : <FooterLinks />}
                    </MantineProvider>
                </ColorSchemeProvider>
            </Layout>
        </Provider>
    );
}
