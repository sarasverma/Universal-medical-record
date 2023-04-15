import React, { useEffect, useState, useRef, useContext } from "react";
import Logo from "../assets/logo.png";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { toast } from "react-toastify";
import Wrapper from "./styles/AuthStyle";
import { AiFillFileImage } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { HashLoader } from "react-spinners";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    file: null,
  });

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

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

  const onChangeRegisterFile = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.files[0] });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      setIsLoading(false);
      toast.success(`Welcome back ${user.displayName} 😊`);
      navigate("/");
    } catch (e) {
      setIsLoading(false);
      toast.error(`Error authenticating user: ${e}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, file } = registerInfo;
    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // store img of user
      const storageRef = ref(storage, email);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await updateProfile(user, {
                displayName: name,
                photoURL: downloadURL,
              });

              // storing information in database
              // userInfo
              await setDoc(doc(db, "userInfo", email), {
                email,
                name,
                photoURL: downloadURL,
              });

              // userSetting
              await setDoc(doc(db, "userSetting", email), {
                email,
                notification: [],
                access: [],
                permission: [],
                cids: [],
              });

              setIsLoading(false);
              toast.success(`Welcome ${user.displayName} 😊`);
              navigate("/");
            })
            .catch((e) => {
              setIsLoading(false);
              toast.error(`Error : ${e}`);
            });
        }
      );
    } catch (e) {
      setIsLoading(false);
      toast.error(`Error : ${e}`);
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <div className="loader">
          <HashLoader
            color="#76d636"
            loading={isLoading}
            cssOverride=""
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
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
                        minLength={8}
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
                        minLength={8}
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
                    <div className="input-wrap">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        style={{ display: "none" }}
                        onChange={onChangeRegisterFile}
                        required
                      />
                      <label
                        htmlFor="file"
                        style={{ pointerEvents: "auto", cursor: "pointer" }}
                      >
                        <AiFillFileImage />
                        <span>{`${
                          registerInfo.file
                            ? registerInfo.file.name
                            : "Add a picture"
                        }`}</span>
                      </label>
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
      )}
    </Wrapper>
  );
};

export default Auth;
