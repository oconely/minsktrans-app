import React, { useState } from 'react';
import './SearchInput.css';
import useComponentDidMount from '../Hooks/useComponentDidMount';
import { closest } from '../../../js/utils';

const handleClick = (e) => {
    const { target } = e;
    const input = closest(target, el => el.classList.contains('SearchInput'))
    if (input) {

    } else {

    }
}

const handleDidMount = (el) => {
    console.log(el)
    // document.addEventListener('click', handleClick)
};

const Input = ({ 
    placeholderText = "", 
    handleChange, 
    isDataLoaded, 
    className 
}) => {
    const inputRef = useComponentDidMount(handleDidMount);

    return(
        <div className={`SearchInput ${className} `} >
            <input 
                ref={inputRef}
                className="SearchInput__input input" 
                onChange={() => handleChange(inputRef.current.value)}
                placeholder={placeholderText}
                disabled={!isDataLoaded}
            />
        </div>
    );
}

export default Input;