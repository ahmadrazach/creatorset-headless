import { Box, Button, Flex, Modal, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import useStyles from "./styles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CartMenu({ opened, close, cart }: any) {
    const matches = useMediaQuery("(max-width: 425px)");
    const CustomModal = styled(Modal)`
        .mantine-Modal-content {
            border-top: 3px solid #ef174b;
            position: absolute;
            overflow: visible;
            top: 58px;
            min-width: 450px;
            min-height: 295px;
            right: 14%;
        }
        .mantine-ScrollArea-root {
            height: 22rem;
        }
    `;
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <Box>
            <CustomModal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                overlayProps={{
                    opacity: 0.01,
                }}
                size={matches ? "" : "50%"}
                sx={{
                    "& .mantine-Modal-content": {
                        position: "absolute",
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? "#353540"
                                : "#FFFFFF",
                        color:
                            theme.colorScheme === "dark"
                                ? theme.white
                                : theme.black,
                    },
                }}
            >
                <Box>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <IconX
                            style={{
                                zIndex: "11111111",
                                position: "fixed",
                                height: "30px",
                                width: "30px",
                                top: "5px",
                                right: "12px",
                                color:
                                    theme.colorScheme === "dark"
                                        ? theme.white
                                        : theme.black,
                                backgroundColor: "transparent",
                            }}
                            size={64}
                            strokeWidth={1}
                            onClick={close}
                            aria-label="Close"
                        />
                    </div>
                    <Modal.Body>
                        <Box className={classes.w100}>
                            <Text className={`${classes.cartModalTitle} mt-2`}>
                                Just added to your cart
                            </Text>
                        </Box>
                        <hr
                            style={{
                                border: "1px solid #E0DEE1",
                                width: "100%",
                            }}
                        />
                        <Box className={`${classes.w100} mt-5`}>
                            <Flex
                                mih={50}
                                gap="md"
                                justify="flex-start"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                            >
                                <Box>
                                    <Image
                                        src="/images/cartModelImage.svg"
                                        alt="image"
                                        height={81}
                                        width={81}
                                    />
                                </Box>
                                <Box className="mt-2">
                                    <Text
                                        className={`${classes.cartItemTitle} truncate`}
                                    >
                                        {cart ? cart.title : ""}
                                    </Text>
                                    <Text
                                        className={`${classes.cartItemSubTitle} truncate`}
                                    >
                                        Username: {cart ? cart.userName : ""}
                                    </Text>
                                    <Text
                                        className={`${classes.cartItemSubTitle} truncate`}
                                    >
                                        Language: {cart ? cart.language : ""}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text
                                        className={`${classes.cartItemQtyTitle}`}
                                    >
                                        Qty: 1
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box className={`${classes.w100} mt-5`}>
                            <Link href="/cart" className={`${classes.w100}`}>
                                <Button
                                    variant="outline"
                                    sx={{
                                        color:
                                            theme.colorScheme === "dark"
                                                ? "white"
                                                : "black",
                                        border:
                                            theme.colorScheme === "dark"
                                                ? "0.0625rem solid white"
                                                : "0.0625rem solid black",
                                        "&:hover": {
                                            backgroundColor: "transparent",
                                        },
                                        width: "95%",
                                    }}
                                    radius="xl"
                                    size="xl"
                                    pt="md"
                                    fullWidth
                                    onClick={close}
                                >
                                    View Cart (1)
                                </Button>
                            </Link>
                        </Box>
                        <Box className={`${classes.w100} mt-5`}>
                            <Text
                                className={
                                    theme.colorScheme === "dark"
                                        ? `${classes.continueShoppingText} underline underline-offset-4 decoration-white`
                                        : `${classes.continueShoppingText} underline underline-offset-4 decoration-black`
                                }
                            >
                                Continue shopping
                            </Text>
                        </Box>
                    </Modal.Body>
                </Box>
            </CustomModal>
        </Box>
    );
}

export default CartMenu;
