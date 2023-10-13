import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth, googleProvider } from "firebase.js";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const googleSignup = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password, username)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <>
      <header className="flex p-4 justify-between">
        <img
          src="https://i.ibb.co/YQHSXJX/GAMEFINDER.png"
          alt=""
          className={`w-48 sm:w-auto`}
        />
      </header>
      <div
        id="firebaseui-auth-container"
        className="m-10 text-center p-10 max-w-max rounded-md bg-white font-title">
        <h1 className="font-bold">Welcome! Sign up your account</h1>
        <h3>Sign up to interact with your favorite games</h3>
        <form action="">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block mx-auto border-2 w-full p-2 my-2 rounded-md"
          />
          <input
            type="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block mx-auto border-2 w-full p-2 my-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block mx-auto border-2 w-full p-2 my-2 rounded-md"
          />
          <div className="flex justify-center">
            <input type="checkbox" className="" />
            <h2 className="pl-2">Remember me</h2>
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className="border-2 w-full p-2 my-2 rounded-md">
            Sign up
          </button>
          <h3>
            Already registered? <Link to="/login">Log in now</Link>
          </h3>
          <div className="flex items-center pl-10 pr-10">
            <div className="w-1/2 h-0.5 bg-gray-300"></div>
            <span className="px-2">or</span>
            <div className="w-1/2 h-0.5 bg-gray-300"></div>
          </div>
          <button className="block mx-auto border-2 w-full p-2 my-2 rounded-md">
            Sign up with Facebook
          </button>
          <button className="block mx-auto border-2 w-full p-2 my-2 rounded-md">
            Sign up with Twitter
          </button>
          <button
            onClick={googleSignup}
            className="block mx-auto border-2 w-full p-2 my-2 rounded-md">
            Sign up with Google
          </button>
        </form>
      </div>
    </>
  );
}
