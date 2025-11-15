import Faq from "@/components/Faq/index";
import { Box, Grid, Text } from "@mantine/core";
import useStyles from "./styles";

function FAQTab() {
    const { classes } = useStyles();
    return (
        <Box>
            <Box>
                <div>
                    <Text className={classes.heading1}>FAQ</Text>
                </div>
                <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                    <Grid.Col md={12} lg={6} sm={12}>
                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />

                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />
                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />
                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />
                    </Grid.Col>
                    <Grid.Col md={12} lg={6} sm={12}>
                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />
                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />
                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />
                        <Faq
                            title="Can I change the profile picture or the subscriber count on my animation?"
                            details="We will send the order to your PayPal email. Make sure to check your spam folder. If you want to change the email of your order, simply contact us on Twitter."
                        />
                    </Grid.Col>
                </Grid>
            </Box>
        </Box>
    );
}

export default FAQTab;
