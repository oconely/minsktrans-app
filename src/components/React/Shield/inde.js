import React from 'react';
import './Shield.css';

const Shield = ({ children, className=''}) => (
    <li
        className={className}
    >
        {children}
    </li>
)

export default Shield;