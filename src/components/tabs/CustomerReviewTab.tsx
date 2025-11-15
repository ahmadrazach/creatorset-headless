import { Box, Loader } from "@mantine/core";
import { useEffect, useState } from "react";

import useStyles from "./styles";
import { getReviews } from "../../../lib/reviewsAPI";

function CustomerReviewTab({ productId }: { productId: string }) {
    const { classes } = useStyles();
    const [productReviews, setProductReviews] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const updatedReviews = await getReviews(productId);
                setProductReviews(updatedReviews);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const sortDiv = document.querySelector(".jdgm-rev-widg__sort-wrapper");
        const bodyDiv = document.querySelector(".jdgm-rev-widg__body");

        // Create a new select element
        const selectElement = document.createElement("select");
        selectElement.className = "jdgm-sort-dropdown";
        selectElement.setAttribute("aria-label", "Sort dropdown");

        // Create a new arrow element
        const arrowElement = document.createElement("span");
        arrowElement.className = "jdgm-sort-dropdown-arrow";

        // create a new button
        const buttonElement = document.createElement("button");
        buttonElement.className = "jdgm-paginate-btn";
        buttonElement.innerText = "View More";
        buttonElement.type = "button";

        // Define an array of option values and text
        const options = [
            { value: "most-recent", text: "Most Recent" },
            { value: "highest-rating", text: "Highest Rating" },
            { value: "lowest-rating", text: "Lowest Rating" },
            { value: "with-pictures", text: "Only Pictures" },
            { value: "pictures-first", text: "Pictures First" },
            { value: "videos-first", text: "Videos First" },
            { value: "most-helpful", text: "Most Helpful" },
        ];

        // Create and append option elements to the select element
        options.forEach(optionData => {
            const option = document.createElement("option");
            option.value = optionData.value;
            option.textContent = optionData.text;
            selectElement.appendChild(option);
        });

        // Append the select element
        sortDiv?.appendChild(selectElement);
        // Append the arrow element
        sortDiv?.appendChild(arrowElement);
        // Append the button element
        bodyDiv?.appendChild(buttonElement);
    }, [productReviews]);

    return isLoading ? (
        <Box className="flex justify-center py-12">
            <Loader color="#EF174B" size="lg" />
        </Box>
    ) : (
        <div
            className={classes.reviews}
            dangerouslySetInnerHTML={{ __html: productReviews }}
        />
    );
}

export default CustomerReviewTab;
