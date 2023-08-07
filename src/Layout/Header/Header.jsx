import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Header.css"

export default function Header ({clearResults}){
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`search/${inputValue}`);
        setInputValue('');
        clearResults()
      };

      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSearch(event);
        }
    };
    return(
        <header className="flex p-4 justify-between">
            <img src="https://i.ibb.co/YQHSXJX/GAMEFINDER.png" alt="" />
            <input value={inputValue} onChange={handleInputChange} onKeyUp={handleKeyPress} type="text" placeholder="Search games..." className="w-50 rounded-md" onSubmit={handleSearch}/>
        </header>
    )
}