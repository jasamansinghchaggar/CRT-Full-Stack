import React, { Fragment } from "react";
import { useState } from "react";

const App = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("employee");

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });

    console.log("Form submitted");
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name,
        role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Register response:", data);
      })
      .catch((error) => {
        console.error("Register error:", error);
      });

    console.log("Register form submitted");
    setRegisterEmail("");
    setRegisterPassword("");
    setName("");
    setRole("employee");
  };

  return (
    <Fragment>
      <div className="main">
        <form className="form" onSubmit={handleSubmitLogin} method="post">
          <h1 className="form_heading">Login Form</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <form className="form" onSubmit={handleSubmitRegister} method="post">
          <h1 className="form_heading">Register Form</h1>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="employee">Employee</option>
            <option value="team-lead">Team Lead</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </Fragment>
  );
};

export default App;
