import { Box, rem, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEye, IconPoint } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import useStyles from "./styles";

function ProductBySellerCard() {
    const matches = useMediaQuery("(max-width: 769px)");
    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <div>
            <div>
                <Image
                    src="/images/ProductBySeller.svg"
                    alt="image"
                    width={370}
                    height={370}
                />
            </div>
            <div className="mt-3" style={{}}>
                <h6
                    style={{
                        fontSize: matches ? rem(12) : rem(16),
                        color: theme.colorScheme ? theme.white : theme.black,
                    }}
                >
                    Full Video On Channel Tag | YouTube Shorts
                </h6>
                {/* <Box className="flex items-center m-0 p-0">
                    <Image
                        src="/images/Ellipse.png"
                        alt="image"
                        width={44}
                        height={44}
                    />
                    <p style={{ fontSize: "15px", marginLeft: rem(12) }}>
                        Zumbs
                    </p>
                </Box> */}
                <Box>
                    <h6
                        className={classes.heading1}
                        style={{ fontSize: matches ? rem(15) : rem(24) }}
                    >
                        329,40₴UAH{" "}
                        <span
                            style={{
                                textDecorationLine: "line-through",
                                opacity: "0.4",
                                fontSize: matches ? rem(13) : rem(18),
                                fontWeight: 500,
                            }}
                        >
                            500,40₴UAH
                        </span>
                    </h6>
                    <h6 style={{ fontSize: matches ? rem(10) : rem(16) }}>
                        <IconEye
                            style={{ display: "inline", color: "#5B5D6E" }}
                            size={24}
                            strokeWidth={2}
                        />
                        <span style={{ color: "#5B5D6E" }}> 98k views </span>
                        <span style={{ color: "#5B5D6E" }}>
                            <IconPoint
                                fill="#5B5D6E"
                                size={8}
                                style={{
                                    display: "inline",
                                    margin: "0px",
                                    padding: "0px",
                                }}
                            />{" "}
                            1 years ago{" "}
                        </span>
                    </h6>
                </Box>
            </div>
        </div>
    );
}

export default ProductBySellerCard;
