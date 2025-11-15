import { Box, Modal, useMantineTheme } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";
import { useStyles } from "./styles";
import IncludedFilesCollapse from "../accordion/IncludeFilesAccordion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IncludedFilesModal({
    opened,
    close,
    deliveredFiles,
}: {
    opened: boolean;
    close: () => void;
    deliveredFiles: {
        type: string;
        value: string;
    };
}) {
    const parsedDeliveredFiles = JSON.parse(deliveredFiles?.value);
    const matches = useMediaQuery("(max-width: 425px)");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomModal = styled(Modal)`
        .mantine-Modal-content {
            border-radius: ${matches ? "0px" : "30px"};
            border-top: 3px solid #ef174b;
            position: relative;
            overflow: visible;
        }
        .mantine-Modal-close {
            margin: 0;
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 23px;
            background-color: red;
            color: #ffffff;
            font-size: 40px;
            opacity: 1;
            z-index: 10;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 50%;
            // transform: translate(-50%, -50%);
        }
    `;
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <Box className="">
            <CustomModal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                size={matches ? "" : "70%"}
                className={matches ? "" : "rounded-3xl"}
                yOffset="10vh"
                xOffset="0vh"
            >
                <Box>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <IconX
                            style={{
                                zIndex: "11111111",
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? "#353540"
                                        : "#EAE8EB",
                                borderRadius: "50%",
                                border: "5px solid #201F26",
                                position: "fixed",
                                top: "-35px",
                            }}
                            size={64}
                            strokeWidth={2}
                            onClick={close}
                            aria-label="Close"
                        />
                    </div>
                    <Modal.Body>
                        <Box className="mt-2">
                            <h6 className={classes.heading1}>Included Files</h6>
                        </Box>
                        <hr
                            className="mt-5"
                            style={{
                                border: "1px solid rgba(255,255,255, 0.3)",
                            }}
                        />
                        <IncludedFilesCollapse
                            deliveredFiles={parsedDeliveredFiles}
                        />
                    </Modal.Body>
                </Box>
            </CustomModal>
        </Box>
    );
}

export default IncludedFilesModal;
