import { useState, useEffect, useMemo } from "react";
import { Convert } from "easy-currencies";

const useCurrencyConverter = ({
    price,
    currencyData,
}: {
    price: string;
    currencyData: { currency: string };
}) => {
    const [convertedPrice, setConvertedPrice] = useState(price);
    useEffect(() => {
        const convertPrice = async () => {
            try {
                if (currencyData.currency === "USD" || !parseFloat(price))
                    return;
                const convertedValue = await Convert(parseFloat(price))
                    .from("USD")
                    .to(currencyData.currency);
                const fixedConvertedValue = parseFloat(
                    convertedValue.toString()
                ).toFixed(2);
                setConvertedPrice(`${fixedConvertedValue}`);
            } catch (error) {
                // Handle any errors that may occur during the conversion
                console.error("Error converting price:", error);
            }
        };
        setConvertedPrice(price);
        convertPrice();
    }, [price, currencyData]);

    return useMemo(() => convertedPrice, [convertedPrice]);
};

export default useCurrencyConverter;
