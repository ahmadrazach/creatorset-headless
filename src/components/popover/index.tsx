import { Popover as MantinePopover, PopoverProps, rem } from "@mantine/core";
import { ReactNode } from "react";

interface Props extends PopoverProps {
    target: ReactNode;
}

function Popover(props: Props) {
    const { target, children } = props;
    return (
        <MantinePopover
            position="bottom"
            width="target"
            transitionProps={{ transition: "pop" }}
            styles={{
                dropdown: {
                    borderTop: "5px solid #EF174B",
                    borderBottomLeftRadius: rem(14),
                    borderBottomRightRadius: rem(14),
                    padding: 0,
                },
            }}
            {...props}
        >
            <MantinePopover.Target>{target}</MantinePopover.Target>
            <MantinePopover.Dropdown>{children}</MantinePopover.Dropdown>
        </MantinePopover>
    );
}

export default Popover;
