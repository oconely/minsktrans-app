import React from 'react';

const Bar = ({ children, className="" }) => (
    <div className={`Bar ${className}`}>
        {children}
    </div>
);

export default Bar;