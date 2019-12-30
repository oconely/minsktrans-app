import React from 'react';

export const IconPhone = ({
    style={},
    width="100%",
    height="100%",
    className = "",
    viewBox = "0 0 10 10",
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
        <g id="clock">
            <path id="Path_17" data-name="Path 17" d="M0,0H10V10H0Z" fill="none"/>
            <path id="Path_18" data-name="Path 18" d="M7.51,9.248a6.275,6.275,0,0,0,2.746,2.744l.917-.919a.418.418,0,0,1,.423-.1,4.743,4.743,0,0,0,1.487.238.415.415,0,0,1,.417.417v1.458a.415.415,0,0,1-.417.417A7.083,7.083,0,0,1,6,6.417.417.417,0,0,1,6.417,6H7.875a.415.415,0,0,1,.417.417A4.743,4.743,0,0,0,8.529,7.9a.418.418,0,0,1-.1.423Z" transform="translate(-4.75 -4.75)" fill={fill} />
        </g>
    </svg>
)





