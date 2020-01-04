import React from 'react';

const Input = ({ placeholderText = "", handleChange, isDataLoaded }) => {
    let input;
    
    return(
        <input 
            ref={node => input = node}
            className="SearchInput" 
            onChange={() => handleChange(input.value)}
            placeholder={placeholderText}
            disabled={!isDataLoaded}
        />
    );
}

export default Input;