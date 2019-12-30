import React from 'react';

export const IconMarker = ({
    style={},
    width="100%",
    height="100%",
    className = "",
    viewBox = "0 0 8.27 11.05",
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
        <g id="iconfinder_icons_pin_1564524" transform="translate(-3)">
          <path id="pin" className="stores-map__icon-marker" d="M7.135,0A4.118,4.118,0,0,0,3,4.135a8.127,8.127,0,0,0,3.905,6.846.5.5,0,0,0,.505,0A8.25,8.25,0,0,0,11.27,4.135,4.118,4.118,0,0,0,7.135,0Zm0,5.973A1.838,1.838,0,1,1,8.973,4.135,1.843,1.843,0,0,1,7.135,5.973Z" transform="translate(0)" fill={fill} />
        </g>
    </svg>
)
