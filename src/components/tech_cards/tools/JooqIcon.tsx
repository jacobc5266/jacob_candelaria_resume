import * as React from "react";

type JooqIconProps = React.SVGProps<SVGSVGElement>;

export function JooqIcon(props: JooqIconProps) {
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" {...props}>
                <rect id="Background" width="160" height="160" fill="#000"/>
                <g id="Letters" fill="currentColor">
                <path id="Bottom_right_O" data-name="Bottom right O" d="M12.6,139.49h60.03v-59.46H12.6v59.46ZM42.49,94.91h15.07v14.69h-15.07v-14.69Z"/>
                <path id="Q_shape" data-name="Q shape" d="M87.44,139.29l22.8.16.2,14.54h14.28s.09-14.55.09-14.55l22.59-.13v-59.27s-59.98,0-59.98,0v59.25ZM132.33,94.94l.03,29.46h-7.48s-.26-7.68-.26-7.68h-14.09s-.32,7.69-.32,7.69l-7.7-.08-.03-29.4h29.85Z"/>
                <path id="Top_right_O" data-name="Top right O" d="M87.43,6.01v59.16h59.99V6.01h-59.99ZM117.99,50.59h-15.5v-15.71h15.5v15.71Z"/>
                <polygon id="j_hook" data-name="j hook" points="72.59 65.13 72.6 27.89 57.62 27.81 57.47 50.49 27.74 50.41 27.53 35.58 12.58 35.64 12.67 65.15 72.59 65.13"/>
                <rect id="dot_above_j" data-name="dot above j" x="57.5" y="6.02" width="15.12" height="14.68" transform="translate(-.03 .14) rotate(-.12)"/>
                </g>
        </svg>
    );
}