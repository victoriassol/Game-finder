import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { auth } from "firebase.js";
import { signOut } from "firebase/auth";
import "./Header.css";
import Menu from "img/Menu.svg";
import Search from "img/Search.svg";
import Sidebar from "Layout/Sidebar/Sidebar";

export default function Header() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

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
      <header className="header flex p-4 justify-between">
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
          className={`input md:block w-50 p-2 rounded-md ${
            showInput ? "" : "hidden"
          }`}
          onSubmit={handleSearch}
        />
        {auth.currentUser ? (
          <h3 className="underline text-white text-lg">
            <button onClick={logOut}>Log out</button>
          </h3>
        ) : (
          <h3 className="underline text-white text-lg">
            <Link to="/login">Log in</Link>
          </h3>
        )}
      </header>
      {showMenu && <Sidebar fromHeader={true} />}
    </>
  );
}
