import { Center, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import useStyles from "./styles";

// eslint-disable-next-line sonarjs/cognitive-complexity
function TopBanner() {
    const { classes } = useStyles();
    const matches = useMediaQuery("(max-width: 769px)");
    const matches2 = useMediaQuery("(max-width: 425px)");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollWidth / 2 - 290,
                behavior: "smooth",
            }); // Set the desired offset value here
        }
    }, []);

    const logos = (
        <div className={classes.socialLogos}>
            <div className={classes.logoContainer}>
                <Link href="/collections/youtube1">
                    <span className={`mx-5 p-5 ${classes.logo}`}>
                        <Image
                            src="/logo/Youtube.svg"
                            alt="youtube"
                            height={matches2 ? 31 : 53.5}
                            width={matches2 ? 31 : 53.5}
                        />
                    </span>
                </Link>
                <span className="mt-3">Youtube</span>
            </div>

            <div className={classes.logoContainer}>
                <Link href="/collections/instagram">
                    <span className={`mx-5 p-5 ${classes.logo}`}>
                        <Image
                            src="/logo/Instagram.svg"
                            alt="youtube"
                            height={matches2 ? 31 : 53.5}
                            width={matches2 ? 31 : 53.5}
                        />
                    </span>
                </Link>
                <span className="mt-3">Instagram</span>
            </div>
            <div className={classes.logoContainer}>
                <Link href="/collections/tiktok">
                    <span className={`mx-5 p-5 ${classes.logo}`}>
                        <Image
                            src="/logo/Tiktok.svg"
                            alt="youtube"
                            height={matches2 ? 31 : 53.5}
                            width={matches2 ? 31 : 53.5}
                        />
                    </span>
                </Link>
                <span className="mt-3">TikTok</span>
            </div>
            <div className={classes.logoContainer}>
                <Link href="/collections/gaming">
                    <span className={`mx-5 p-5 ${classes.logo}`}>
                        <Image
                            src="/logo/Gaming.svg"
                            alt="youtube"
                            height={matches2 ? 31 : 53.5}
                            width={matches2 ? 31 : 53.5}
                        />
                    </span>
                </Link>
                <span className="mt-3">Gaming</span>
            </div>
            <div className={classes.logoContainer}>
                <Link href="/collections/premiere-pro">
                    <span className={`mx-5 p-5 ${classes.logo}`}>
                        <Image
                            src="/logo/Adobe.svg"
                            alt="youtube"
                            height={matches2 ? 31 : 53.5}
                            width={matches2 ? 31 : 53.5}
                        />
                    </span>
                </Link>
                <span className="mt-3">Premiere pro</span>
            </div>
            <div className={classes.logoContainer}>
                <Link href="/collections/free-green-screens">
                    <span className={`mx-5 p-5 ${classes.logo}`}>
                        <Image
                            src="/logo/GreenScreen.svg"
                            alt="youtube"
                            height={matches2 ? 31 : 53.5}
                            width={matches2 ? 31 : 53.5}
                        />
                    </span>
                </Link>
                <span className="mt-3">Green Screen</span>
            </div>
        </div>
    );

    return (
        <div
            className={
                matches
                    ? `${classes.mobileBanner} shadow`
                    : `${classes.topBanner} shadow`
            }
        >
            <h3
                className={`${
                    matches ? classes.mobileHeading : classes.heading
                } ${
                    matches
                        ? "text-center mt-5 pt-10 "
                        : "mt-5 pt-10 text-center"
                }`}
            >
                Creative Assets For All Creators
            </h3>
            <Center
                maw={matches2 ? 370 : "95%"}
                h={200}
                mx="auto"
                style={{ marginTop: matches2 ? "-45px" : "0px" }}
            >
                {matches2 ? (
                    <ScrollArea
                        w={320}
                        h={200}
                        viewportRef={scrollRef}
                        type="never"
                    >
                        {logos}
                    </ScrollArea>
                ) : matches ? (
                    <ScrollArea
                        w={680}
                        h={300}
                        type="never"
                        viewportRef={scrollRef}
                    >
                        {logos}
                    </ScrollArea>
                ) : (
                    <ScrollArea h={200} type="never" viewportRef={scrollRef}>
                        {logos}
                    </ScrollArea>
                )}
            </Center>
        </div>
    );
}

export default TopBanner;
