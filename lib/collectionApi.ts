import axios from "axios";
import { CollectionItem } from "../common/types";

export const getAllCollection = async (): Promise<CollectionItem[]> => {
    try {
        const response = await axios.get(
            `https://api.creatorset.com/api/v1/collections`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching Collections", error);
        return [];
    }
};
