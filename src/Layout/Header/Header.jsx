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
      <header className="header flex p-4 justify-between items-center fixed w-full z-10">
        <img src={Menu} alt="" className="md:hidden" onClick={handleShowMenu} />
        <img
          src="https://i.ibb.co/YQHSXJX/GAMEFINDER.png"
          alt=""
          className={`w-40 h-5 sm:h-auto sm:w-auto ${
            showInput ? "hidden" : ""
          }`}
        />
        <div className="flex gap-10 items-center">
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
            <h3 className="text-white text-lg font-bold hidden md:block">
              <button onClick={logOut}>Log out</button>
            </h3>
          ) : (
            <h3 className="text-white text-lg font-bold hidden md:block">
              <Link to="/login">Log in</Link>
            </h3>
          )}
        </div>
      </header>
      {showMenu && <Sidebar fromHeader={true} logOut={logOut} />}
    </>
  );
}
