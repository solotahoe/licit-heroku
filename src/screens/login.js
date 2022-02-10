import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const loginfn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      if (user) {
        navigate("/chime");
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
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="errorsg">{emailError}</p>
        <span>
          <input
            type="checkbox"
            className="remember"
            value="Remember"
            required
          />
          <label className="rememberMe">Remember me</label>
        </span>
        <button className="login_registerbtn" onClick={loginfn}>
          Login
        </button>

        <Link className="registerLink" to="/register">
          <button className="login_registerbtn"> Register</button>{" "}
        </Link>
      </div>
    </div>
  );
}
