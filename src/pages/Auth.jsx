import React, { useEffect, useState, useRef } from "react";
import "./Auth.css";
import Logo from "../assets/logo.png";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";

const Auth = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleOnFocus(e) {
    e.target.classList.add("active");
  }

  function handleOnBlur(e) {
    if (e.target.value != "") return;
    e.target.classList.remove("active");
  }

  const toogleRef = useRef(null);
  const handleToggleAuth = () => {
    toogleRef.current.classList.toggle("sign-up-mode");
  };

  const onChangeLogin = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const onChangeRegister = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = registerInfo;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // add display name
      await updateProfile(user, {
        displayName: name,
      });

      // storing information in database
      await setDoc(doc(db, "userRecordInfo", user.uid), {
        uid: user.uid,
        name,
        email,
      });

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main ref={toogleRef}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {/* Login */}
            <form
              onSubmit={handleLogin}
              autoComplete="off"
              className="sign-in-form"
            >
              <div className="logo">
                <img src={Logo} alt="Universal Medical Record" />
                <h4>Universal Medical Record</h4>
              </div>
              <div className="heading">
                <h2>Welcome</h2>
                <h6>Not registred yet?</h6>
                <a href="#" className="toggle" onClick={handleToggleAuth}>
                  Sign up
                </a>
              </div>
              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="email"
                    name="email"
                    onChange={onChangeLogin}
                    className="input-field"
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    autoComplete="off"
                    required
                  />
                  <label>Email</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="password"
                    minLength={4}
                    name="password"
                    onChange={onChangeLogin}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    className="input-field"
                    autoComplete="off"
                    required
                  />
                  <label>Password</label>
                </div>
                <input
                  type="submit"
                  defaultValue="Sign In"
                  className="sign-btn"
                />
                <p className="text">
                  Forgotten your password or you login datails?
                  <a href="#">Get help</a> signing in
                </p>
              </div>
            </form>

            {/* Register */}
            <form
              onSubmit={handleRegister}
              autoComplete="off"
              className="sign-up-form"
            >
              <div className="logo">
                <img src={Logo} alt="Universal Medical Record" />
                <h4>Universal Medical Record</h4>
              </div>
              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <a href="#" className="toggle" onClick={handleToggleAuth}>
                  Sign in
                </a>
              </div>
              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minLength={3}
                    name="name"
                    onChange={onChangeRegister}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    className="input-field"
                    autoComplete="off"
                    required
                  />
                  <label>Name</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="email"
                    name="email"
                    onChange={onChangeRegister}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    className="input-field"
                    autoComplete="off"
                    required
                  />
                  <label>Email</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="password"
                    minLength={4}
                    name="password"
                    onChange={onChangeRegister}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    className="input-field"
                    autoComplete="off"
                    required
                  />
                  <label>Password</label>
                </div>
                <input
                  type="submit"
                  defaultValue="Sign Up"
                  className="sign-btn"
                />
                <p className="text">
                  By signing up, I agree to the
                  <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>
          <Carousel />
        </div>
      </div>
    </main>
  );
};

export default Auth;
