/* eslint-disable react/function-component-definition */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router.events]);

    return (
        <div>
            {isLoading && <Loader />}
            {children}
        </div>
    );
};

export default Layout;
