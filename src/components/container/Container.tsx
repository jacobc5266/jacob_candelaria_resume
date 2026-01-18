import classes from "./container.module.css"
import {ReactNode} from "react";

type ContainerVariant = "default" | "floatingHeader";

interface ContainerProps {
    header?: ReactNode;
    showDivider?: boolean;
    children: ReactNode;

    variant?: ContainerVariant;

    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    dividerClassName?: string;
}

export default function Container({
                                      header,
                                      showDivider = true,
                                      children,
                                      variant = "default",
                                      className,
                                      headerClassName,
                                      bodyClassName,
                                      dividerClassName,
                                  }: ContainerProps) {
    const isFloating = variant === "floatingHeader";

    return (
        <div className={`${classes.container} ${isFloating ? classes.floating : ""} ${className ?? ""}`}>
            {header ? (
                <div className={`${classes.header} ${isFloating ? classes.headerFloating : ""} ${headerClassName ?? ""}`}>
                    {header}
                </div>
            ) : null}

            {header && showDivider && !isFloating ? (
                <hr className={`${classes.divider} ${dividerClassName ?? ""}`} />
            ) : null}

            <div className={`${classes.body} ${isFloating ? classes.bodyFloating : ""} ${bodyClassName ?? ""}`}>
                {children}
            </div>
        </div>
    );
}
