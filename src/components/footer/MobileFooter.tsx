import {
    Container,
    SimpleGrid,
    Text,
    rem,
    useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import useStyles from "./styles";
import { mobileFooterLinks } from "../../../common/constants";

function MobileFooterLinks() {
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const group1 = mobileFooterLinks.group1.map(group => {
        return (
            <span className={`${classes.wrapper} mb-3`} key={group.title}>
                <Link
                    className={classes.title}
                    href={group.link}
                    target={group.newTab ? "_blank" : ""}
                >
                    {group.title}
                </Link>
            </span>
        );
    });
    const group2 = mobileFooterLinks.group2.map(group => {
        return (
            <span className={`${classes.wrapper} mb-3`} key={group.title}>
                <Link
                    className={classes.title}
                    href={group.link}
                    target="_blank"
                >
                    {group.title}
                </Link>
            </span>
        );
    });
    const group3 = mobileFooterLinks.group3.map(group => {
        return (
            <span className={`${classes.wrapper} mb-3`} key={group.title}>
                <Link
                    className={classes.title}
                    href={group.link}
                    target="_blank"
                >
                    {group.title}
                </Link>
            </span>
        );
    });
    const group4 = mobileFooterLinks.group4.map(group => {
        return (
            <span className={`${classes.wrapper} mb-3`} key={group.title}>
                <Link
                    className={classes.title}
                    href={group.link}
                    target="_blank"
                >
                    {group.title}
                </Link>
            </span>
        );
    });

    return (
        <footer className={classes.footer}>
            <div className={`${classes.containerCenter} mb-5`}>
                {theme.colorScheme === "dark" ? (
                    <Image
                        src="/logo/CreatorSet-Text-Logo-Dark.svg"
                        alt="image"
                        height={34}
                        width={217}
                    />
                ) : (
                    <Image
                        src="/logo/CreatorSet-Text-Logo-Light.svg"
                        alt="image"
                        height={34}
                        width={217}
                    />
                )}
            </div>
            <SimpleGrid cols={2} className="m-5" spacing={0}>
                <div className="text-start">
                    <div className={classes.groups}>{group1}</div>
                </div>
                <div className="text-end">
                    <div className={classes.groups}>{group2}</div>
                </div>
            </SimpleGrid>
            <SimpleGrid cols={2} className="m-5" spacing={0}>
                <div className="text-start">
                    <div className={classes.groups}>{group3}</div>
                </div>
                <div className="text-end">
                    <div className={classes.groups}>{group4}</div>
                </div>
            </SimpleGrid>
            <div className="text-center">
                <Container className={classes.afterFooter}>
                    <div className={`${classes.containerCenter} mb-5`}>
                        <Image
                            src="/images/Twitter.svg"
                            width={52}
                            height={52}
                            alt="twitter"
                            style={{ margin: "0.5rem" }}
                        />
                        <Image
                            src="/images/Instagram.svg"
                            width={52}
                            height={52}
                            alt="twitter"
                        />
                    </div>
                    <Text
                        color="dimmed"
                        size="sm"
                        style={{ fontSize: rem(16) }}
                    >
                        © 2023, CreatorSet
                    </Text>
                </Container>
            </div>
        </footer>
    );
}

export { MobileFooterLinks };
