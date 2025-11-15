import {
    addCutomItemsToCart,
    addToCart,
    retrieveCart,
} from "../../../common/api";
import { setCart, setCartCount } from "../reducers/cart";
import { AppDispatch } from "../store/store";
import { CartRequest, CartResponse, ProductNode } from "../../../common/types"; // Import the MenuResponse type
import {
    setCartCountToLocalStorage,
    setCartIdToLocalStorage,
} from "../../../helper/helper";
import { clearCustomCart } from "../reducers/customBundle";

const getCart = async (
    dispatch: AppDispatch,
    cartRequest: CartRequest
): Promise<CartResponse> => {
    try {
        const response = await addToCart(cartRequest); // Replace with your actual API endpoint URL
        setCartIdToLocalStorage(response.id);
        const cartDetails = await retrieveCart(response.id);
        setCartCountToLocalStorage(
            cartDetails?.lines?.edges?.length.toString()
        );

        dispatch(
            setCart({
                id: response.id,
                itemCount: cartDetails?.lines?.edges?.length,
            })
        );
        return {
            id: response.id,
            itemCount: cartDetails?.lines?.edges?.length,
        }; // Return the menu response
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
};

const setCustomCart = async (
    dispatch: AppDispatch,
    products: ProductNode[]
): Promise<CartResponse> => {
    try {
        const response = await addCutomItemsToCart(products); // Replace with your actual API endpoint URL
        setCartIdToLocalStorage(response.id);
        const cartDetails = await retrieveCart(response.id);
        setCartCountToLocalStorage(
            cartDetails?.lines?.edges?.length.toString()
        );
        dispatch(
            setCart({
                id: response.id,
                itemCount: cartDetails?.lines?.edges?.length,
            })
        );
        dispatch(clearCustomCart());
        return {
            id: response.id,
            itemCount: cartDetails?.lines?.edges?.length,
        }; // Return the menu response
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
};

const setCount = async (
    dispatch: AppDispatch,
    itemCount: number,
    Id: string
) => {
    setCartCountToLocalStorage(itemCount.toString());
    dispatch(
        setCartCount({
            itemCount,
            id: Id,
        })
    );
};

export { getCart, setCount, setCustomCart };
