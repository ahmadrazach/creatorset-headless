import {
    Box,
    Center,
    Collapse,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import componentStyles from "./styles";

function FAQ({ title, details }: { title: string; details: string }) {
    const theme = useMantineTheme();
    const { classes: componentClass } = componentStyles();

    const [optionFaQOpened, { toggle: toggleFaQssOptions }] =
        useDisclosure(false);

    function faQOptions(data: string) {
        return (
            <div
                className={componentClass.detailsText}
                dangerouslySetInnerHTML={{ __html: data }}
            />
        );
    }

    return (
        <div>
            <UnstyledButton
                className={componentClass.link}
                onClick={toggleFaQssOptions}
                style={{
                    width: "100%",
                    paddingTop: "5%",
                    minHeight: "100px",
                }}
            >
                <Center
                    inline
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        component="span"
                        className="text-base"
                        style={{ maxWidth: "90%" }}
                    >
                        {optionFaQOpened ? (
                            <span className={componentClass.activeColor}>
                                {title}
                            </span>
                        ) : (
                            <span>{title}</span>
                        )}
                    </Box>
                    {optionFaQOpened ? (
                        <IconMinus
                            size={16}
                            style={{ marginTop: "-10px" }}
                            color={theme.fn.primaryColor()}
                        />
                    ) : (
                        <IconPlus
                            style={{ marginTop: "-10px" }}
                            size={16}
                            color={theme.fn.primaryColor()}
                        />
                    )}
                </Center>
            </UnstyledButton>
            <Collapse in={optionFaQOpened}>{faQOptions(details)}</Collapse>
            <hr />
        </div>
    );
}

export default FAQ;
