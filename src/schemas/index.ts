import { object, array, custom } from "zod";

interface Product {
    nameArray: string[];
    attributes: {
        username?: string;
        channelUrl?: string;
        subscribeValue?: string;
        subscribeCount: number;
    };
}

const bundleFormSchema = object({
    products: array(
        object({
            node: custom(
                values => {
                    const { nameArray } = values as Product;
                    const { subscribeValue } = (values as Product).attributes;

                    return !(
                        nameArray?.includes("Channel Url") && !subscribeValue
                    );
                },
                values => {
                    const { nameArray } = values as Product;
                    const { subscribeValue } = (values as Product).attributes;

                    if (nameArray?.includes("Channel Url") && !subscribeValue) {
                        return {
                            message: `Please select the value`,
                            path: ["attributes.subscribeValue"],
                        };
                    }
                    return {};
                }
            ),
        })
    ),
});

export { bundleFormSchema };
