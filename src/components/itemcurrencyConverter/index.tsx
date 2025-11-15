import { Convert } from "easy-currencies";

const itemCurrencyConverter = async ({
    dataNodes,
    currencyData,
}: {
    dataNodes: number[];
    currencyData: { currency: string }; // currencyData is an object with a "currency" property
}): Promise<number[]> => {
    try {
        if (!dataNodes) return dataNodes; // Return early if dataNodes is not available
        if (currencyData.currency === "USD") return dataNodes;
        return await Promise.all(
            dataNodes.map(async item => {
                const price = item ?? 0;
                // Return if price is zero
                if (!price) return price;

                const convertedValue = await Convert(price)
                    .from("USD")
                    .to(currencyData.currency);

                // Return the converted price for the current item as a floating-point number
                return convertedValue;
            })
        );
    } catch (error) {
        // Handle any errors that may occur during the conversion
        console.error("Error converting prices:", error);
        return dataNodes;
    }
};

export default itemCurrencyConverter;
