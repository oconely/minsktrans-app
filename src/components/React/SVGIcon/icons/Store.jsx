import React from 'react';
import '../style.css';

export const IconStore = ({
    style={},
    width="100%",
    height="100%",
    className = "",
    viewBox = "0 0 18 16",
    fill = "#F50057"
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
        <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
            <g fill={fill} id="Core" className="stores-map__icon-store-path" transform="translate(-465.000000, -424.000000)">
                <g id="store" transform="translate(465.000000, 424.000000)">
                    <path d="M17,0 L1,0 L1,2 L17,2 L17,0 L17,0 Z M18,10 L18,8 L17,3 L1,3 L0,8 L0,10 L1,10 L1,16 L11,16 L11,10 L15,10 L15,16 L17,16 L17,10 L18,10 L18,10 Z M9,14 L3,14 L3,10 L9,10 L9,14 L9,14 Z" id="Shape"/>
                </g>
            </g>
        </g>
    </svg>
)
