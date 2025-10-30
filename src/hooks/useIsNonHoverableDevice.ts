import { useEffect, useState } from "react";

export const useIsNonHoverableDevice = (): boolean => {
    const [isNonHoverable, setIsNonHoverable] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsNonHoverable(window.matchMedia("(hover: none)").matches);
        }
    }, []);

    return isNonHoverable;
};
