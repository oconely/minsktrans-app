import React from 'react';

export const IconClock = ({
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
        <g id="clock" transform="translate(-1 -1)">
            <path id="Path_15" data-name="Path 15" d="M6,1a5,5,0,1,0,5,5A5.006,5.006,0,0,0,6,1Zm0,9.583A4.583,4.583,0,1,1,10.583,6,4.588,4.588,0,0,1,6,10.583Z" fill={fill}/>
            <path id="Path_16" data-name="Path 16" d="M16.793,10.476V7h-.427v3.476a.425.425,0,0,0-.214.368.431.431,0,0,0,.016.109l-1.875,1.875.3.3,1.875-1.875a.422.422,0,0,0,.536-.411A.426.426,0,0,0,16.793,10.476Z" transform="translate(-10.549 -4.719)" fill={fill}/>
        </g>
    </svg>
)
