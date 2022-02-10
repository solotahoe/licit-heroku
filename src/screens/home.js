import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      if (user) {
        navigate("/coinbase");
      }
    } catch (error) {
      console.log(error.message);
      setEmailError(error.message);
    }
  };

  const register = async () => {
    console.log("weeeeeeeeerrw");
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      setEmailError(error.message);
    }
  };

  return (
    <div className="homePageLogin">
      <div className="loginDiv">
        <h1>LicitShop.Vip Login</h1>
        <input
          type="text"
          placeholder="Email address"
          className="emailInput"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="errorsg">{emailError}</p>
        <input
          type="password"
          placeholder="password"
          className="emailInput"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="errorsg">{emailError}</p>

        <button className="login_registerbtn" onClick={register}>
          Register
        </button>

        <p className="haveaAnAccount">
          Already have an account?{" "}
          <Link to="/" className="loginHere">
            Login here{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
