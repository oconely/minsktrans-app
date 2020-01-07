import React from 'react';
import './Button.css';

const Button = ({ 
    active, 
    handleClick, 
    children, 
    className='' 
}) => (
    <button
        onClick={handleClick}
        className={`btn-reset Button ${active ? 'Button_active ' + className : className}`}
    >
        {children}
    </button>
);

export default Button;