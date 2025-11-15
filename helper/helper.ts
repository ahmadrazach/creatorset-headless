export const getCartIdFromLocalStorage = (cartId: string) => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(cartId);
    }
    return "";
};
export const setCartIdToLocalStorage = (cartId: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cartId", cartId);
    }
};
export const removeCartIdToLocalStorage = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("cartId");
    }
};

export const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

export const getCartCountFromLocalStorage = (cartCount: string) => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(cartCount);
    }
    return "";
};
export const setCartCountToLocalStorage = (cartCount: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cartCount", cartCount);
    }
};
