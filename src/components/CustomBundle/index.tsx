import BundleSection from "@/components/Bundle/BundleSection";
import useStyles from "@/styles/styles";
import { Box, Text } from "@mantine/core";

function CustomBundle({ open }: { open: () => void }) {
    const { classes } = useStyles();

    return (
        <Box>
            <Box className="mb-5">
                <Text className={classes.bundleTitleText}>
                    Build your own bundle
                </Text>
            </Box>
            <BundleSection open={open} />
        </Box>
    );
}

export default CustomBundle;
