import React, { useState } from "react";
import './SearchBar.css';
import { FaSistrix } from "react-icons/fa";

export default function SearchBar(props) {

    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleInput = (event) => {
        setValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (value.length >= 3) {
                setError(false);
                props.onClick(value);
            } else {
                setError(true);
            }
        }
    };

    const onSearchClick = () => {
        if (value.length >= 3) {
            setError(false);
            props.onClick(value);
        } else {
            setError(true);
        }
    };

    return (
        <div className='wrapper'>
            <input
                className='searchInput'
                onChange={handleInput}
                onKeyPress={handleKeyPress} />
            {error ?
                <p className="error">Requires at least 3 or more characters</p>
                :
                <p></p>
            }
            <button
                className='searchBtn'
                onClick={onSearchClick}>
                <FaSistrix />
            </button>
        </div>
    );
}
