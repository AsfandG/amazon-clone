import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // Login function
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((credentials) => {
        if (credentials) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then((user) => {
        console.log(user);
        if (user) {
          navigate("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <main className="login">
      <Link to="/">
        <img
          src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/amazon-png-logo-vector-1.png"
          alt="amazon-logo"
          className="login_image"
        />
      </Link>
      <section className="login-form">
        <h1 className="login_title">Sign in</h1>
        <form>
          <section className="form-group">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={value.email}
              onChange={changeHandler}
            />
          </section>
          <section className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={value.password}
              onChange={changeHandler}
            />
          </section>
          <button type="submit" onClick={signIn} className="login_btn">
            Sign in
          </button>
          <p className="login_desc">
            By signing in you agree to Amazon's condition of use & sale. Please
            see our privacy Notice, our Cookies Notice and our Interest Based
            ads Notice
          </p>
          <button onClick={register} className="account_btn">
            Create Your Amazon Account
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
