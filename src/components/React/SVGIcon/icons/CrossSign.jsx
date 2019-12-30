import React from 'react';

export const IconCrossSign = ({
    style={},
    width="100%",
    height="100%",
    className = "",
    viewBox = "0 0 9.707 9.707",
    stroke="#707070"
}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox={viewBox}
        style={style}
        className={`svg-icon ${className || ""}`}
    >
        <g id="Group_30" data-name="Group 30" transform="translate(-243.146 -953.146)">
            <line id="Line_8" data-name="Line 8" x2="9" y2="9" transform="translate(243.5 953.5)" fill="none" stroke={stroke} strokeWidth="1"/>
            <line id="Line_9" data-name="Line 9" x1="9" y2="9" transform="translate(243.5 953.5)" fill="none" stroke={stroke} strokeWidth="1"/>
        </g>
    </svg>
);