import React from 'react';

const Shield = ({ children, className=''}) => (
    <li
        className={className}
    >
        {children}
    </li>
)

export default Shield;