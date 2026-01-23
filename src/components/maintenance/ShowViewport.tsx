"use client";

import { useEffect, useState } from "react";

const showViewport =
    process.env.NEXT_PUBLIC_SHOW_VIEWPORT === "true";

export default function ShowViewport() {
    const [size, setSize] = useState<{ w: number; h: number } | null>(null);

    useEffect(() => {
        const update = () =>
            setSize({ w: window.innerWidth, h: window.innerHeight });

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    if (!showViewport || !size) return null;

    return (
        <p
            style={{
                position: "fixed",
                bottom: 8,
                left: 8,
                fontSize: 12,
                opacity: 0.7,
            }}
        >
            {size.w} × {size.h}
        </p>
    );
}
