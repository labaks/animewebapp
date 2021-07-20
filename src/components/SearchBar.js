import { useState } from "react";

export default function SearchBar(props) {

    const [value, setValue] = useState('');

    const handleInput = (event) => {
        setValue(event.target.value);
    };

    const searchSubmit = () => {
        console.log("val", value);
        props.value(value);
    };
    return (
        <div className='wrapper'>
            <input
                className='searchInput'
                onChange={handleInput} />
            <button
                className='searchBtn'
                onClick={() => props.onClick(searchSubmit)}>o</button>
        </div>
    );
}
