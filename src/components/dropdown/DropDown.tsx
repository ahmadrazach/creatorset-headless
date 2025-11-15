import useStyles from "@/styles/styles";
import { Button, Menu, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { DropDownProps } from "../../../common/types";

function Dropdown({ selectedValue, handleMenuItemActivate }: DropDownProps) {
    const matches = useMediaQuery("(max-width: 720px)");
    const theme = useMantineTheme();
    const { classes } = useStyles();
    return (
        <div className={`${classes.dropdown} mt-2`}>
            <Menu
                transitionProps={{
                    transition: "pop-top-right",
                }}
                position="top-end"
                width={220}
                withinPortal
            >
                <Menu.Target>
                    <Button
                        className="shadow border"
                        rightIcon={
                            <IconChevronDown size="1.05rem" stroke={1.5} />
                        }
                        pr={12}
                        style={{
                            color: "#757592",
                            fontFamily: "GothamMedium",
                            fontSize: "16px",
                            fontWeight: 500,
                            height: "48px",
                            width: matches ? "-webkit-fill-available" : "auto",
                            display: "flex",
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? "#353540"
                                    : "#E7E5E8",
                        }}
                    >
                        <div className="mt-3">
                            Sort by:{" "}
                            <span className={classes.dropedownItemText}>
                                {selectedValue}
                            </span>
                        </div>
                    </Button>
                </Menu.Target>
                <Menu.Dropdown
                    sx={{
                        borderTop: "3px solid #EF174B",
                        borderRadius: "none",
                    }}
                >
                    <Menu.Item
                        value="Featured"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Featured
                    </Menu.Item>
                    <Menu.Item
                        value="Best selling"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Best selling
                    </Menu.Item>
                    <Menu.Item
                        value="Alphabetically, A-Z"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Alphabetically, A-Z
                    </Menu.Item>
                    <Menu.Item
                        value="Alphabetically, Z-A"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Alphabetically, Z-A
                    </Menu.Item>
                    <Menu.Item
                        value="Price, low to high"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Price, low to high
                    </Menu.Item>
                    <Menu.Item
                        value="Price, high to low"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Price, high to low
                    </Menu.Item>
                    <Menu.Item
                        value="Date, old to new"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Date, old to new
                    </Menu.Item>
                    <Menu.Item
                        value="Date, new to old"
                        className={classes.dropedownMenuItem}
                        onClick={handleMenuItemActivate}
                    >
                        Date, new to old
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
}

export default Dropdown;
