import axios from "axios";
import { PopulerSeller } from "../common/types"; // Make sure you provide the correct path to your types

export const getPopularSeller = async (): Promise<PopulerSeller[]> => {
    try {
        const response = await axios.get(
            `https://api.creatorset.com/api/v1/popularity/seller/views`
        );

        const { data } = response; // Destructure the 'data' property

        const popularSellers: PopulerSeller[] = Object.values(data)
            .filter(
                (item: unknown): item is PopulerSeller =>
                    (item as PopulerSeller)?.id !== "creatorset" &&
                    (item as PopulerSeller)?.displayName !== undefined && // Filter out users without display name
                    (item as PopulerSeller)?.picture_url !== undefined
            )
            .sort((a, b) => b.views - a.views) // Sort the sellers based on views
            .slice(0, 10); // Take the top 10 sellers
        return popularSellers;
    } catch (error) {
        console.error("Error fetching popular sellers", error);
        return [];
    }
};
