import * as React from "react";
import Container from "../../container/Container.tsx";
import classes from "../TechCard.module.css";
import type {IconItem} from "../IconItem.ts";

type Props = {
    title: React.ReactNode;
    note?: React.ReactNode;

    items: IconItem[];

    /** Outer wrapper around the whole section (ex: stackSection) */
    sectionClassName?: string;

    /** Class applied to the outer Container that wraps the grid (ex: stackPanel) */
    panelClassName?: string;

    /** Class applied to the row/grid wrapper (ex: iconRow) */
    rowClassName?: string;

    /** Class applied to each per-item card Container (ex: iconCard) */
    itemCardClassName?: string;

    /** Class applied to the svg icon itself */
    iconClassName?: string;

    /** Class applied to the label <p> */
    labelClassName?: string;

    /** Container variants */
    panelVariant?: "default" | "floatingHeader";

    /** If true, each item is wrapped in its own <Container> */
    wrapItemsInContainer?: boolean;

    /** If true, show the title header */
    showTitle?: boolean;
};

export function IconGridSection({
                                    title,
                                    note,
                                    items,

                                    sectionClassName = classes.stackSection,
                                    panelClassName = classes.stackPanel,
                                    rowClassName = classes.iconRow,

                                    itemCardClassName = classes.iconCard,
                                    iconClassName = classes.icon,

                                    panelVariant = "default",
                                    wrapItemsInContainer = true,
                                    showTitle = true,
                                }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <div className={sectionClassName}>
            {note ? <div className={classes.stackNote}>{note}</div> : null}

            {showTitle ? (
                <div>
                    <h2>{title}</h2>
                </div>
            ) : null}

            <Container className={panelClassName} variant={panelVariant}>
                <div className={rowClassName}>
                    {items.map(({ key, label, sublabel, isPrimary, startYear, Icon }) =>
                        wrapItemsInContainer ? (
                            <Container className={itemCardClassName} key={key}>
                                <Icon className={iconClassName} />
                                {label ? <p>{label}</p> : null}
                                {sublabel ? <p className={classes.subheader}>{sublabel}</p> : null}
                                {isPrimary ? <p className={classes.subheader}><i><strong>Primary</strong></i></p> : null}
                                {startYear ? <p className={classes.subheader}>Since {startYear}</p> : null}
                            </Container>
                        ) : (
                            <div className={itemCardClassName} key={key}>
                                <Icon className={iconClassName} />
                                {label ? <p>{label}</p> : null}
                            </div>
                        )
                    )}
                </div>
            </Container>
        </div>
    );
}
