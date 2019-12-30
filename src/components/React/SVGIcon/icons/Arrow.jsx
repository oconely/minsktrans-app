import React from 'react';

export const IconArrow = ({
    style={},
    width="100%",
    height="100%",
    className = "",
    viewBox = "0 0 8.4 14",
    fill = "#f50057"
}) => (
    <svg 
        width={width} 
        style={style} 
        height={height} 
        viewBox={viewBox} 
        className={`svg-icon ${className || ""}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"`}
    >
        <path id="iconfinder_icon-ios7-arrow-forward_211688" d="M160,97.418,161.413,96l6.987,7h0l-6.987,7L160,108.582,165.569,103Z" transform="translate(-160 -96)" fill={fill} />
    </svg>
)