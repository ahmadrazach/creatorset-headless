import { addProductNode, removeProductNode } from "../reducers/customBundle";
import { AppDispatch } from "../store/store";
import { ProductNode } from "../../../common/types"; // Import the ProductNode type

const addItemToCustomCart = async (
    dispatch: AppDispatch,
    product: ProductNode
) => {
    dispatch(
        addProductNode({
            node: product.node,
        })
    );
};

const removeItemToCustomCart = async (
    dispatch: AppDispatch,
    nodeId: string
) => {
    dispatch(removeProductNode(nodeId));
};

export { addItemToCustomCart, removeItemToCustomCart };
