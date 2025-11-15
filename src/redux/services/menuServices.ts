import { getMenuItems } from "../../../common/api";
import { setMenu } from "../reducers/menu";
import { AppDispatch } from "../store/store";
import { MenuResponse } from "../../../common/types"; // Import the MenuResponse type

const getMenu = async (dispatch: AppDispatch): Promise<MenuResponse> => {
    try {
        const response = await getMenuItems(); // Replace with your actual API endpoint URL
        dispatch(setMenu(response));
        return response; // Return the menu response
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
};

export default getMenu;
