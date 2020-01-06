import React from 'react';
import './Bar.css';

const Bar = ({ children, className="" }) => (
    <div className={`Bar ${className}`}>
        {children}
    </div>
);

export default Bar;