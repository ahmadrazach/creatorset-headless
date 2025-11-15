import { Collapse, Group, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { FileItem } from "../../../common/types";

function NestedCollapse({ deliveredFiles }: { deliveredFiles: FileItem[] }) {
    const theme = useMantineTheme();

    // State to track the collapse state for each section
    const [collapseStates, setCollapseStates] = useState(
        deliveredFiles.map(() => false)
    );

    // Helper function to get the collapse state of a section by index
    const getCollapse = (index: number) => {
        return collapseStates[index];
    };

    // Helper function to set the collapse state of a section by index
    const setCollapse = (index: number, value: boolean) => {
        setCollapseStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = value;
            return newStates;
        });
    };

    // Helper function to generate nested content for each collapsible section
    const generateNestedContent = (nestedFiles: FileItem[]) => {
        return nestedFiles.map(file => (
            <div className="" key={file.filename}>
                <div className="">
                    <Group>
                        <Image
                            src={
                                theme.colorScheme === "dark"
                                    ? "/images/wDoc.svg"
                                    : "/images/bDoc.svg"
                            }
                            alt="Product Image"
                            width={15}
                            height={15}
                        />
                        <span className="mt-3">{file.filename}</span>
                    </Group>
                </div>
            </div>
        ));
    };

    const minimizeIcon = "/images/minimizeCollapse.svg";
    const maximizeIcon = "/images/maximizeCollapse.svg";
    const folderIcon = "/images/folderIcon.svg";
    const folderCloseIcon = "/images/folderCloseIcon.svg";

    return (
        <div className="mt-5">
            {deliveredFiles.map((file, index) => (
                <div key={file.filename}>
                    <Group
                        className="cursor-pointer w-2/4 mt-2"
                        onClick={() => setCollapse(index, !getCollapse(index))}
                    >
                        <Image
                            src={
                                getCollapse(index) ? minimizeIcon : maximizeIcon
                            }
                            alt="Product Image"
                            width={25}
                            height={25}
                        />
                        <Image
                            src={
                                getCollapse(index)
                                    ? folderIcon
                                    : folderCloseIcon
                            }
                            className={getCollapse(index) ? `mt-1` : `mt-0`}
                            alt="Product Image"
                            width={22.41}
                            height={16.72}
                        />
                        <span
                            className="border-0"
                            style={{ marginLeft: "-18px" }}
                        >
                            <div
                                className="pt-4 ml-3"
                                style={{
                                    fontSize: "21px",
                                    color:
                                        theme.colorScheme === "dark"
                                            ? "white"
                                            : "black",
                                }}
                            >
                                {file.filename}
                            </div>
                        </span>
                    </Group>

                    <Collapse in={getCollapse(index)}>
                        <div className="ml-10">
                            {file.files && generateNestedContent(file.files)}
                        </div>
                    </Collapse>
                </div>
            ))}
        </div>
    );
}

export default NestedCollapse;
