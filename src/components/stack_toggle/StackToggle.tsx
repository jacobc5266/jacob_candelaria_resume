import classes from "./StackToggle.module.css";

export type StackFilter = "backend" | "frontend" | "data";

type StackToggleProps = {
    value: StackFilter;
    onChange: (v: StackFilter) => void;
};

const OPTIONS: { label: string; value: StackFilter }[] = [
    { label: "Backend", value: "backend" },
    { label: "Frontend", value: "frontend" },
    { label: "Data", value: "data" },
];

export function StackToggle({ value, onChange }: StackToggleProps) {
    return (
        <div className={classes.toggle} role="radiogroup" aria-label="Tech stack category">
            {OPTIONS.map((opt) => {
                const active = value === opt.value;

                return (
                    <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        className={`${classes.option} ${active ? classes.active : ""}`}
                        onClick={() => onChange(opt.value)}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}
