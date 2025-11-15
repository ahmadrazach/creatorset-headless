import React, { useMemo } from "react";
import AnimationModal from "./AnimationModal";
import { ProductNode } from "../../../common/types";

function MemoModel({
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
    // Memoize the AnimationModal component based on the specified props
    const memoizedModal = useMemo(
        () => (
            <AnimationModal
                opened={opened}
                close={close}
                animations={animations}
                selectedValue={selectedValue}
                loading={loading}
                handleMenuItemActivate={handleMenuItemActivate}
            />
        ),
        [
            opened,
            close,
            animations,
            selectedValue,
            loading,
            handleMenuItemActivate,
        ]
    );

    return <div>{memoizedModal}</div>;
}

export default MemoModel;
