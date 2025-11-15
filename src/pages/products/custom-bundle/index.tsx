import PopularBundlesList from "@/components/list/PopularBundlesList";
import CustomBundleComponent from "@/components/CustomBundle/index";
import useStyles from "@/styles/styles";
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Flex,
    Group,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import useSWR from "swr";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/store/store";
import Link from "next/link";
import { BundleFormProvider, useBundleForm } from "@/context/bundleFormContext";
import { zodResolver } from "@mantine/form";
import { bundleFormSchema } from "@/schemas";
import MemoModel from "@/components/modals/MemoModel";
import { getAllAnimation } from "../../../../common/api";
import { ProductNode } from "../../../../common/types";
import { END_POINT } from "../../../../common/constants";

function CustomBundle({ animations }: { animations: ProductNode[] }) {
    const [, setBundle] = useLocalStorage<number>({ key: "selected-bundle" });
    const [reverse, setReverse] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(
        "Featured"
    );
    const [isComponentLoading, setIsComponentLoading] =
        useState<boolean>(false);
    const products = useAppSelector(state => state.customCart?.data?.products);
    const form = useBundleForm({
        initialValues: {
            products: products.map(product => {
                return {
                    ...product,
                    node: {
                        ...product.node,
                        attributes: {},
                    },
                };
            }),
        },
        validate: zodResolver(bundleFormSchema),
    });

    const fetcher = async () => {
        const response = await getAllAnimation({
            sortBy: selectedValue || "Featured",
            reverse,
        });
        return response.edges;
    };
    const { data, mutate } = useSWR<ProductNode[]>(END_POINT, fetcher, {
        fallbackData: animations,
        revalidateOnReconnect: true,
    });
    const handleMenuItemActivate = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const { value } = event.currentTarget;
        if (
            value === "Alphabetically, Z-A" ||
            value === "Date, new to old" ||
            value === "Price, high to low"
        ) {
            setReverse(true);
        } else {
            setReverse(false);
        }
        setIsComponentLoading(true);
        setSelectedValue(value);

        await mutate(fetcher);
        setIsComponentLoading(false);
    };

    const theme = useMantineTheme();
    const { classes } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);
    const items = [
        {
            title: "Home",
            href: "/",
            color: "#EE184B",
            secondaryColor: "#EE184B",
        },
        {
            title: "Bundles",
            href: "/products/custom-bundle",
            color: "#FFFFFF",
            secondaryColor: "24242D",
        },
    ].map(item => (
        <Link
            style={{
                color:
                    item.color === "#FFFFFF"
                        ? theme.colorScheme === "dark"
                            ? theme.white
                            : theme.black
                        : item.color,
                fontFamily: "GothamMedium",
            }}
            href={item.href}
        >
            {item.title}
        </Link>
    ));
    const matches = useMediaQuery("(max-width: 720px)");
    const handleBundleSelect = (discount: number) => {
        setBundle(discount);
        open();
    };

    return (
        <BundleFormProvider form={form}>
            <Box>
                <div
                    className={
                        matches
                            ? `flex justify-center`
                            : `flex justify-center pt-10`
                    }
                >
                    <Breadcrumbs
                        separator={
                            <IconChevronRight
                                size={12}
                                strokeWidth={2}
                                style={{
                                    marginBottom: "10px",
                                    color: "#EF174B",
                                }}
                            />
                        }
                        mt="xs"
                    >
                        {items}
                    </Breadcrumbs>
                </div>
                {products.length === 0 ? (
                    <Container className={matches ? `` : `${classes.w90} mt-5`}>
                        <Flex
                            justify="center"
                            direction="column"
                            align="center"
                            gap="lg"
                            className="mb-12"
                        >
                            <Title className={classes.heading}>
                                Build Your Own Bundle
                            </Title>
                            <Text className={classes.subHeadingBundlePage}>
                                Build your own bundle by selecting from 3 to 5
                                animations of your choice.
                            </Text>
                        </Flex>
                        <Group className={classes.buttonGroup}>
                            <Button
                                variant="subtle"
                                className={`${classes.button2} pt-5`}
                                onClick={() => handleBundleSelect(5)}
                            >
                                3 Animation Set Save 5$
                            </Button>
                            <Button
                                variant="subtle"
                                className={`${classes.button2} pt-5`}
                                onClick={() => handleBundleSelect(7)}
                            >
                                4 Animation Set Save 7$
                            </Button>
                            <Button
                                variant="subtle"
                                className={`${classes.button2} pt-5`}
                                onClick={() => handleBundleSelect(10)}
                            >
                                5 Animation Set Save 10$
                            </Button>
                        </Group>
                        <Text className={`mb-3 ${classes.bundleHeading}`}>
                            Popular Bundles
                        </Text>
                        <Box
                            className={`${classes.popularBundlesContainer} ${classes.marginBN90}`}
                        >
                            {[0, 0, 0].map((_, index: number) => {
                                return (
                                    <>
                                        <PopularBundlesList />
                                        {index < 2 && <hr />}
                                    </>
                                );
                            })}
                        </Box>
                    </Container>
                ) : (
                    <CustomBundleComponent open={open} />
                )}
            </Box>
            <MemoModel
                opened={opened}
                close={close}
                animations={data}
                selectedValue={selectedValue}
                loading={isComponentLoading}
                handleMenuItemActivate={handleMenuItemActivate}
            />
        </BundleFormProvider>
    );
}

export default CustomBundle;
export async function getStaticProps() {
    const animations = await getAllAnimation({
        sortBy: "Featured",
    });
    return {
        props: {
            animations: animations.edges,
        },
    };
}
