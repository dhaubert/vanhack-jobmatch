import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

import api from "../services/api.js";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/login", {
      email: email,
      password: password
    });

    const { _id, role } = response.data;

    if (!_id) {
      setLoginFailed(true);
    } else {
      localStorage.setItem("user", _id);

      history.push(`/${role}/${_id}`);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>VanHack Match</h1>
        <h3>Connecting employers and talents from all over the world.</h3>
        {/* <img src={logo} alt="Tindev Logo"/> */}
        <input
          placeholder="Type your email here"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Type your password here"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit">Sign in</button>
        <Link to="/signup"> Not registered yet? Click here. </Link>
        {loginFailed && <label class="alert"> Error signing you in. </label>}
      </form>
    </div>
  );
}
