import axios from "axios";
import { Review } from "../common/types";

export const getReviews = async (productId: string): Promise<string> => {
    try {
        const response = await axios.get(
            `https://api.creatorset.com/api/v1/product-reviews/product_review/${productId}`
        );
        console.log("testing reviews respnse", response);
        return response.data.widget;
    } catch (error) {
        console.error("Error fetching Reviews", error);
        return "";
    }
};

export const getHomePageReviews = async (
    viewMore?: number
): Promise<Review[]> => {
    try {
        const response = await axios.get(
            `https://judge.me/api/v1/reviews?api_token=${process.env.NEXT_PUBLIC_API_TOKEN}&shop_domain=${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}&per_page=${viewMore}`
        );
        const { reviews } = response.data;
        const filteredReviews = reviews.filter(
            (review: Review) => review.rating >= 4
        );
        return filteredReviews.slice(0, 10);
    } catch (error) {
        console.error("Error fetching Reviews", error);
        return [];
    }
};
