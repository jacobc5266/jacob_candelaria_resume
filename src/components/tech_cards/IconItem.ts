import * as React from "react";

export type IconItem = {
    key: string;
    label?: string;
    sublabel?: string;
    isPrimary?: boolean;
    startYear?: number;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};