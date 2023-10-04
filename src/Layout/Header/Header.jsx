import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";
import Menu from "img/Menu.svg";
import Search from "img/Search.svg";
import Sidebar from "Layout/Sidebar/Sidebar";

export default function Header({ manageNewQuery }) {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`search/${inputValue}`);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };
  return (
    <>
      <header className="flex p-4 justify-between">
        <img src={Menu} alt="" className="md:hidden" onClick={handleShowMenu} />
        <img
          src="https://i.ibb.co/YQHSXJX/GAMEFINDER.png"
          alt=""
          className={`w-48 sm:w-auto ${showInput ? "hidden" : ""}`}
        />
        <img
          src={Search}
          alt=""
          className={`md:hidden ${showInput ? "hidden" : ""}`}
          onClick={handleShowInput}
        />
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
          type="text"
          placeholder="Search games..."
          className={`md:block w-50 p-2 rounded-md ${
            showInput ? "" : "hidden"
          }`}
          onSubmit={handleSearch}
        />
      </header>
      {showMenu && <Sidebar fromHeader={true} />}
    </>
  );
}
