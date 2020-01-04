import React from 'react';

const Button = ({ active, handleClick, children, className='' }) => (
    <button
        onClick={handleClick}
        className={`Button ${active ? 'Button_active ' + className : className}`}
    >
        {children}
    </button>
);

export default Button;