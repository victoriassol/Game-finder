import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "firebase.js";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleSignup = async (e) => {
    try {
      e.preventDefault();
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      const errorCode = await error.code;
      const errorMessage = await error.message;
      // The email of the user's account used.
      const email = await error.customData.email;
      // The Credential type that was used.
      const credential = await googleProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential, error);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
        <h1 className="font-bold">Welcome! Log in or register</h1>
        <h3>Log in to find the games you're looking for</h3>
        <form action="">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            autoComplete="email"
            className="block mx-auto border-2 w-full p-2 my-2 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="current-password"
            className="block mx-auto border-2 w-full p-2 my-2 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <input type="checkbox" className="" />
            <h2 className="pl-2">Remember me</h2>
          </div>
          <h2>Forgot password?</h2>
          <button
            className="border-2 w-full p-2 my-2 rounded-md"
            onClick={onLogin}>
            Log in
          </button>
          <h3>
            Not registered yet? <Link to="/register">Register now</Link>
          </h3>
          <div className="flex items-center pl-10 pr-10">
            <div className="w-1/2 h-0.5 bg-gray-300"></div>
            <span className="px-2">or</span>
            <div className="w-1/2 h-0.5 bg-gray-300"></div>
          </div>
          <button className="block mx-auto border-2 w-full p-2 my-2 rounded-md">
            Log in with Facebook
          </button>
          <button className="block mx-auto border-2 w-full p-2 my-2 rounded-md">
            Log in with Twitter
          </button>
          <button
            onClick={googleSignup}
            className="block mx-auto border-2 w-full p-2 my-2 rounded-md">
            Log in with Google
          </button>
        </form>
      </div>
    </>
  );
}
