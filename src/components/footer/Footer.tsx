import { Col, Container, Grid, Text, rem } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import useStyles from "./styles";
import { footerLinks } from "../../../common/constants";

function FooterLinks() {
    const { classes } = useStyles();

    const group1 = footerLinks.group1.map(group => {
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
    const group2 = footerLinks.group2.map(group => {
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
    const group3 = footerLinks.group3.map(group => {
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
            <Grid className={classes.inner}>
                <Col xs={2} />
                <Col xs={2}>
                    <div className={classes.groups}>{group1}</div>
                </Col>
                <Col xs={2}>
                    <div className={classes.groups}>{group2}</div>
                </Col>
                <Col xs={2}>
                    <div className={classes.groups}>{group3}</div>
                </Col>
                <Col xs={2}>
                    <Container className={classes.afterFooter}>
                        <div className={`${classes.container} mb-5`}>
                            <Link href="https://twitter.com/CreatorSet">
                                <Image
                                    src="/images/Twitter.svg"
                                    width={52}
                                    height={52}
                                    alt="twitter"
                                    style={{ margin: "0.5rem" }}
                                />
                            </Link>
                            <Link href="https://www.instagram.com/CreatorSet">
                                <Image
                                    src="/images/Instagram.svg"
                                    width={52}
                                    height={52}
                                    alt="twitter"
                                    className="mt-2"
                                />
                            </Link>
                        </div>
                        <Text
                            color="dimmed"
                            size="sm"
                            style={{ fontSize: rem(16) }}
                        >
                            © 2023, CreatorSet
                        </Text>
                    </Container>
                </Col>
                <Col xs={2} />
            </Grid>
        </footer>
    );
}

export { FooterLinks };
