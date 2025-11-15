import {
    Text,
    CopyButton as MantineCopyButton,
    Button,
    useMantineTheme,
    rem,
} from "@mantine/core";
import { FC } from "react";

type Props = {
    url: string;
};

// eslint-disable-next-line react/function-component-definition
const CopyButton: FC<Props> = ({ url }) => {
    const theme = useMantineTheme();
    return (
        <MantineCopyButton value={url}>
            {({ copied, copy }) => (
                <Button
                    color={
                        theme.colorScheme === "dark" ? "#C1C2C5" : theme.black
                    }
                    onClick={copy}
                    className="p-0"
                >
                    <Text
                        className="mt-2 text-[#C1C2C5]"
                        style={{
                            fontSize: rem(14),
                        }}
                    >
                        {copied ? "Copied url" : "Copy url"}
                    </Text>
                </Button>
            )}
        </MantineCopyButton>
    );
};

export default CopyButton;
