import {
    Switch,
    Group,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

type SwitchToggleProps = {
    size: string;
};

export default function SwitchToggle({
    size = "md",
}: PropsWithChildren<SwitchToggleProps>) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    return (
        <Group position="center">
            <Switch
                checked={colorScheme === "dark"}
                onChange={() => toggleColorScheme()}
                color={theme.colorScheme === "dark" ? "#353540" : "#E7E5E8"}
                sx={{
                    ".mantine-Switch-track": {
                        border: "none",
                    },
                    "input:checked+*>.mantine-Switch-thumb": {
                        borderColor: "#EF174B",
                    },
                    ".mantine-Switch-thumb": {
                        backgroundColor: "#EF174B",
                        borderColor: "#EF174B",
                    },
                }}
                size={size || "md"}
                onLabel={
                    <IconSun
                        size="1rem"
                        stroke={2.5}
                        color={
                            theme.colorScheme === "dark"
                                ? theme.white
                                : theme.black
                        }
                    />
                }
                offLabel={<IconMoon size="1rem" style={{ color: "red" }} />}
            />
        </Group>
    );
}
