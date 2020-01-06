import React from 'react';

const Shield = ({ children, className=''}) => (
    <li
        className={`Shield ${className}`}
    >
        {children}
    </li>
)

export default Shield;