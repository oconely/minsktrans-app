import React, { useRef } from 'react';
import './SearchInput.css';
import useComponentDidMount from '../Hooks/useComponentDidMount';
import { closest } from '../../../js/utils';

const handleDidMount = (input) => {
    const handleClick = () => {
        return (e) => {
            const isSearchInput = closest(e.target, el => el.classList && el.classList.contains('SearchInput'));
            if (isSearchInput) {
                input.classList.add('SearchInput_focused')
            } else {
                input.classList.remove('SearchInput_focused')
            }
        }
    }
    
    const handleClickWithInputRef = handleClick(input);

    document.addEventListener('click', handleClickWithInputRef)
};

const Input = ({ 
    placeholderText = "", 
    handleChange, 
    isDataLoaded, 
    className 
}) => {
    const searchInputRef = useComponentDidMount(handleDidMount);
    const inputRef = useRef(null);

    return(
        <div 
            ref={searchInputRef} 
            className={`SearchInput ${className} `} 
        >
            <input 
                ref={inputRef}
                className="SearchInput__input input" 
                onChange={() => {
                    handleChange(inputRef.current.value)}}
                placeholder={placeholderText}
                disabled={!isDataLoaded}
            />
        </div>
    );
}

export default Input;