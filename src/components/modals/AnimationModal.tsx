import {
    ActionIcon,
    Box,
    Button,
    Center,
    Grid,
    Input,
    Loader,
    Menu,
    Modal,
    ScrollArea,
    useMantineTheme,
} from "@mantine/core";
import { useFocusTrap, useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconSearch, IconX } from "@tabler/icons-react";
import styled from "styled-components";
import React, { useRef, useState } from "react";
import { debounce } from "lodash";
import ModalPopularBundlesList from "../list/ModalPopularBundlesList";
import { useStyles } from "./styles";
import { ProductNode } from "../../../common/types";

function AnimationModal({
    opened,
    close,
    animations,
    loading,
    selectedValue,
    handleMenuItemActivate,
}: {
    opened: boolean;
    close: () => void;
    animations: ProductNode[] | undefined;
    loading: boolean;
    selectedValue: string | null;
    handleMenuItemActivate: (
        event: React.MouseEvent<HTMLButtonElement>
    ) => void;
}) {
    // const [searchValue, setSearchValue] = useDebouncedState("", 1000);
    const searchValueRef = useRef<string | null>(null);
    const [filterdAnimations, setFilterdAnimations] = useState<
        ProductNode[] | undefined
    >(animations);
    const [categorySelectedValue, setCategorySelectedValue] = useState<
        string | null
    >("Bundles");

    const handleSearchSubmit = () => {
        const inputValue = searchValueRef.current || "";
        const filteredAnimations = animations?.filter((product: ProductNode) =>
            product.node.title.toLowerCase().includes(inputValue)
        );
        setFilterdAnimations(
            filteredAnimations && filteredAnimations?.length > 0
                ? filteredAnimations
                : animations
        );
    };

    const debouncedFilter = debounce(() => {
        handleSearchSubmit();
    }, 1000); // Adjust the debounce delay as needed

    const handleSearchChange = (event: {
        currentTarget: { value: string };
    }) => {
        const inputValue = event.currentTarget.value;
        searchValueRef.current = inputValue;

        debouncedFilter();
    };

    const handleCategoryMenuItemActivate = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const { value } = event.currentTarget;

        setCategorySelectedValue(value);
    };
    const matches = useMediaQuery("(max-width: 425px)");
    const focusTrapRef = useFocusTrap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomInput: any = styled(Input)`
        .mantine-Input-input {
            height: 50px;
            margin-left: 20px;
        }
    `;
    const CustomModal = styled(Modal)`
        .mantine-Modal-content {
            border-radius: ${matches ? "0px" : "30px"};
            border-top: 3px solid #ef174b;
            position: relative;
            top: 20px;
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
        .mantine-ScrollArea-root {
            max-height: 22rem;
        }
    `;
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <Box ref={focusTrapRef}>
            <CustomModal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                size={matches ? "" : "70%"}
                className={matches ? "" : "rounded-3xl"}
                yOffset="10vh"
                xOffset="0vh"
                sx={{
                    "& .mantine-Modal-content": {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? "#353540"
                                : "#FFFFFF",
                        color:
                            theme.colorScheme === "dark"
                                ? theme.white
                                : theme.black,
                    },
                }}
            >
                <Box>
                    <ActionIcon
                        onClick={close}
                        className="w-full flex justify-center"
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
                            strokeWidth={1}
                            aria-label="Close"
                        />
                    </ActionIcon>
                    <Modal.Body>
                        <Box className="ml-5 mt-5">
                            <h6 className={classes.heading1}>
                                Select An Animation
                            </h6>
                        </Box>
                        <Box className="flex justify-between mx-1 mt-5">
                            <Box className={matches ? classes.w90 : ""}>
                                <CustomInput
                                    style={{
                                        width: matches ? "80vw" : "40vw",
                                        height: "60px",
                                        borderRadius: "25px",
                                        marginLeft: matches ? "-20px" : "-5px",
                                    }}
                                    defaultValue={searchValueRef.current}
                                    onChange={handleSearchChange}
                                    placeholder="Super Creators"
                                    data-autofocus
                                    rightSection={
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "13px",
                                                right: "0px",
                                                display: "flex",
                                                color: "#FFF",
                                            }}
                                        >
                                            <div
                                                className={`${classes.dropdown} mr-3 rounded`}
                                            >
                                                <Menu
                                                    transitionProps={{
                                                        transition:
                                                            "pop-top-right",
                                                    }}
                                                    position="bottom-end"
                                                    width={220}
                                                    withinPortal
                                                    classNames={classes}
                                                >
                                                    <Menu.Target>
                                                        <Button
                                                            rightIcon={
                                                                <IconChevronDown
                                                                    size="1.05rem"
                                                                    stroke={1.5}
                                                                    style={{
                                                                        marginTop:
                                                                            "10px",
                                                                    }}
                                                                />
                                                            }
                                                            pr={12}
                                                            style={{
                                                                fontFamily:
                                                                    "GothamMedium",
                                                                color: "#757592",
                                                            }}
                                                        >
                                                            <div className="mt-5">
                                                                {
                                                                    categorySelectedValue
                                                                }
                                                            </div>
                                                        </Button>
                                                    </Menu.Target>
                                                    <Menu.Dropdown
                                                        sx={{
                                                            borderTop:
                                                                "3px solid #EF174B",
                                                            borderRadius:
                                                                "none",
                                                            width: "300px !important", // Adjust the width as per your requirements
                                                            backgroundColor:
                                                                theme.white,
                                                        }}
                                                    >
                                                        <Grid>
                                                            <Grid.Col span={6}>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="All Products"
                                                                >
                                                                    All Products
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="Bundles"
                                                                >
                                                                    Bundles
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="Social"
                                                                >
                                                                    Social
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="Assets"
                                                                >
                                                                    Assets
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="Genres"
                                                                >
                                                                    Genres
                                                                </Menu.Item>
                                                            </Grid.Col>
                                                            <Grid.Col span={6}>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="Apps"
                                                                >
                                                                    Apps
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="Actions"
                                                                >
                                                                    Actions
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    onClick={
                                                                        handleCategoryMenuItemActivate
                                                                    }
                                                                    value="Gamming"
                                                                >
                                                                    Gamming
                                                                </Menu.Item>
                                                            </Grid.Col>
                                                        </Grid>
                                                    </Menu.Dropdown>
                                                </Menu>
                                            </div>
                                            <div
                                                style={{
                                                    borderRadius: "50%",
                                                    border: "2px solid #EF174B",
                                                    backgroundColor: "#EF174B",
                                                    width: "44px",
                                                    height: "44px",
                                                    marginRight: matches
                                                        ? "-20px"
                                                        : "-19px",
                                                }}
                                            >
                                                <IconSearch
                                                    size="1.5rem"
                                                    style={{
                                                        display: "block",
                                                        marginTop: "7px",
                                                        marginLeft: "7px",
                                                    }}
                                                    role="button"
                                                    onClick={handleSearchSubmit}
                                                />
                                            </div>
                                        </div>
                                    }
                                />
                            </Box>
                            {!matches && (
                                <Box>
                                    <div
                                        className={`${classes.dropdown} rounded`}
                                    >
                                        <Menu
                                            transitionProps={{
                                                transition: "pop-top-right",
                                            }}
                                            position="top-end"
                                            width={220}
                                            withinPortal
                                            classNames={classes}
                                        >
                                            <Menu.Target>
                                                <div>
                                                    <Button
                                                        rightIcon={
                                                            <IconChevronDown
                                                                size="1.05rem"
                                                                stroke={1.5}
                                                            />
                                                        }
                                                        pr={12}
                                                        style={{
                                                            fontFamily:
                                                                "GothamMedium",
                                                            color: "#757592",
                                                            height: "50px",
                                                        }}
                                                    >
                                                        <div className="mt-3">
                                                            Sort by:{" "}
                                                            <span
                                                                className={
                                                                    classes.dropedownItemText
                                                                }
                                                            >
                                                                {selectedValue}
                                                            </span>
                                                        </div>
                                                    </Button>
                                                </div>
                                            </Menu.Target>
                                            <Menu.Dropdown
                                                sx={{
                                                    borderTop:
                                                        "3px solid #EF174B",
                                                    borderRadius: "none",
                                                    backgroundColor: "#FFF",
                                                }}
                                            >
                                                <Menu.Item
                                                    value="Featured"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Featured
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="Best selling"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Best selling
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="Alphabetically, A-Z"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Alphabetically, A-Z
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="Alphabetically, Z-A"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Alphabetically, Z-A
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="Price, low to high"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Price, low to high
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="Price, high to low"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Price, high to low
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="Date, old to new"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Date, old to new
                                                </Menu.Item>
                                                <Menu.Item
                                                    value="Date, new to old"
                                                    className={
                                                        classes.dropedownMenuItem
                                                    }
                                                    onClick={
                                                        handleMenuItemActivate
                                                    }
                                                >
                                                    Date, new to old
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </div>
                                </Box>
                            )}
                        </Box>
                        <ScrollArea
                            h={400}
                            styles={() => ({
                                scrollbar: {
                                    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb':
                                        {
                                            backgroundColor: "#EF174B",
                                        },
                                },
                            })}
                        >
                            <Box className={classes.popularBundlesContainer}>
                                {loading ? (
                                    /* Content to show while loading */
                                    <Center maw={400} h={300} mx="auto">
                                        <Loader
                                            color="#EF174B"
                                            size="lg"
                                            variant="bars"
                                        />
                                    </Center>
                                ) : /* Content to show when not loading */
                                searchValueRef.current !== null &&
                                  searchValueRef.current.length > 0 ? (
                                    filterdAnimations?.map(
                                        (
                                            product: ProductNode,
                                            index: number
                                        ) => (
                                            <React.Fragment
                                                key={product.node.id}
                                            >
                                                <ModalPopularBundlesList
                                                    product={product}
                                                    close={close}
                                                />
                                                {index <
                                                    [0, 0, 0, 0, 0].length -
                                                        1 && <hr />}
                                            </React.Fragment>
                                        )
                                    )
                                ) : (
                                    animations?.map(
                                        (
                                            product: ProductNode,
                                            index: number
                                        ) => (
                                            <React.Fragment
                                                key={product.node.id}
                                            >
                                                <ModalPopularBundlesList
                                                    product={product}
                                                    close={close}
                                                />
                                                {index <
                                                    [0, 0, 0, 0, 0].length -
                                                        1 && <hr />}
                                            </React.Fragment>
                                        )
                                    )
                                )}
                            </Box>
                        </ScrollArea>
                    </Modal.Body>
                </Box>
            </CustomModal>
        </Box>
    );
}

export default React.memo(AnimationModal);
