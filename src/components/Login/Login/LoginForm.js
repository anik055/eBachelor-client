/* eslint-disable react/react-in-jsx-scope */
import "../../../App.css"
import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function LoginForm( {children}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

// console.log(useAuth());
  const {loggedInUser, login, storeAuthToken} =  useAuth();
  const history = useNavigate();
  // console.log(loggedInUser);

  async function handleSubmit(e) {
    e.preventDefault();


    try {
      setError("");
      console.log(loggedInUser);
      await login(email, password);
      storeAuthToken();
      localStorage.setItem("userDetails", loggedInUser);
      history("../", { replace: true });
    } catch (err) {
      console.log(err);
      setError("Failed to login!");
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label for="">EMAIL</label>
      <input
        className="login-email register-form"
        type="text"
        placeholder="Enter email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label for="">PASSWORD</label>
      <input
        className="login-password register-form"
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button class="submit-btn" type="submit">
        <span>Submit Now</span>
      </button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
      <h3>login as admin by  email:test1@gmail.com pass: 111111</h3>
    </form>
  );
}
