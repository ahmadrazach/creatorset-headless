import {
    Badge,
    Button,
    Container,
    Flex,
    ScrollArea,
    SimpleGrid,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import useStyles from "./styles";
import { PopulerSeller } from "../../../common/types";

function PopularSellerCard({
    populerSeller,
}: {
    populerSeller: PopulerSeller[] | undefined;
}) {
    const matches = useMediaQuery("(max-width: 720px)");
    const { classes } = useStyles();
    return (
        <div>
            {!matches ? (
                <div className={classes.card}>
                    <div>
                        {/* <div className={classes.entry}> */}
                        <SimpleGrid
                            cols={2}
                            spacing={0}
                            style={{ width: "100%" }}
                        >
                            {populerSeller?.map(
                                (seller: PopulerSeller, index) => {
                                    return (
                                        <Link
                                            href={`profile?vendor=${seller.url}`}
                                        >
                                            <div
                                                className={
                                                    index === 8 || index === 9
                                                        ? `${classes.entryNoBorder} p-5 pl-2 pr-0 relative`
                                                        : `${classes.entry} p-5 pl-2 pr-0 relative`
                                                }
                                            >
                                                <div className="mt-3 ms-2 me-5">
                                                    <span
                                                        className={
                                                            classes.outerRing
                                                        }
                                                    >
                                                        <span
                                                            className={`${classes.innerRing} pt-3`}
                                                        >
                                                            {index + 1}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        maxWidth: "100%",
                                                        minHeight: "90px",
                                                        border: "10px solid #403E4766",
                                                        borderRadius: "10px",
                                                    }}
                                                    className="aspect-w-1 aspect-h-1"
                                                >
                                                    <Image
                                                        src={
                                                            seller?.picture_url ||
                                                            "/images/Avatar.png"
                                                        }
                                                        style={{
                                                            minHeight:
                                                                "inherit",
                                                            height: "92px",
                                                        }}
                                                        className="rounded-md object-cover"
                                                        alt="avatar"
                                                        width={92}
                                                        height={92}
                                                    />
                                                </div>
                                                <div className="mt-5 ml-4">
                                                    <h6>
                                                        {seller?.displayName}
                                                    </h6>
                                                    <span className="mt-3">
                                                        <IconDownload
                                                            style={{
                                                                display:
                                                                    "inline",
                                                            }}
                                                            size="1rem"
                                                        />
                                                        <small
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                marginTop:
                                                                    "10px",
                                                            }}
                                                        >
                                                            {seller?.views ||
                                                                ""}
                                                        </small>
                                                        <div>
                                                            <Badge
                                                                className="pt-2"
                                                                color="#E6E4E7"
                                                            >
                                                                By{" "}
                                                                {seller?.displayName ||
                                                                    ""}
                                                            </Badge>
                                                        </div>
                                                    </span>
                                                </div>

                                                <Flex
                                                    mih={70}
                                                    gap="xs"
                                                    justify="center"
                                                    align="center"
                                                    direction="column"
                                                    wrap="wrap"
                                                    style={{
                                                        position: "absolute",
                                                        right: "0",
                                                    }}
                                                    id={`profileBtn-${index}`}
                                                >
                                                    <Button
                                                        variant="filled"
                                                        className="profileBtn"
                                                    >
                                                        <div className="pt-2">
                                                            View Profile
                                                        </div>
                                                    </Button>
                                                </Flex>
                                            </div>
                                        </Link>
                                    );
                                }
                            )}
                        </SimpleGrid>
                    </div>
                    {/* </div> */}
                </div>
            ) : (
                <ScrollArea type="never">
                    <Container
                        fluid
                        style={{ display: "flex", width: "900px" }}
                    >
                        {populerSeller?.map((seller: PopulerSeller, index) => {
                            return (
                                <Link href={`profile?vendor=${seller.url}`}>
                                    <div className="mx-3">
                                        <div
                                            style={{
                                                background:
                                                    "rgba(64, 62, 71, 0.4)",
                                                boxShadow:
                                                    "0px 0px 63.8065px rgba(0, 0, 0, 0.25)",
                                                marginTop: "30px",
                                                borderRadius: "12px",
                                                position: "relative",
                                            }}
                                        >
                                            <div
                                                className="mt-2 ms-2 me-5"
                                                style={{
                                                    position: "absolute",
                                                    width: "170px",
                                                }}
                                            >
                                                <span
                                                    className={
                                                        classes.outerRingSmaller
                                                    }
                                                >
                                                    <span
                                                        className={`${classes.innerRingSmaller} pt-3`}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                </span>
                                            </div>
                                            <div
                                                className="mt-2 pt-5"
                                                style={{
                                                    display: "flex",
                                                    width: "150px",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <Image
                                                    src={
                                                        seller?.picture_url ||
                                                        "/images/Avatar.png"
                                                    }
                                                    style={{
                                                        border: "10px solid #403E4766",
                                                        borderRadius: "10px",
                                                    }}
                                                    alt="avatar"
                                                    width={82}
                                                    height={92}
                                                    className="mt-3 rounded-md"
                                                />

                                                <h6 className="mt-3">
                                                    {seller?.displayName || ""}
                                                </h6>
                                                <span>
                                                    <IconDownload
                                                        style={{
                                                            display: "inline",
                                                        }}
                                                        size="1rem"
                                                    />
                                                    <span>
                                                        {seller?.views || ""}
                                                    </span>
                                                </span>
                                                <p className="mb-2">
                                                    By{" "}
                                                    {seller?.displayName || ""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </Container>
                </ScrollArea>
            )}
        </div>
    );
}

export default PopularSellerCard;
