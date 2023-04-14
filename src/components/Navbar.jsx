import { useRef } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import { RiNotification4Fill } from "react-icons/ri";
import Logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navRef = useRef();

  const openNavbar = () => {
    if (!navRef.current.classList.contains("responsive_nav"))
      navRef.current.classList.add("responsive_nav");
  };
  const closeNavbar = () => {
    if (navRef.current.classList.contains("responsive_nav"))
      navRef.current.classList.remove("responsive_nav");
  };

  const handleSignOut = () => {
    signOut(auth);
    toast.success("Logout successfully !");
  };

  return (
    <div className="navbarContainer">
      <div>
        <button id="navOpenBtn" onClick={openNavbar}>
          <FaBars />
        </button>
        <div id="navLogo">
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <nav ref={navRef}>
        <Link to="/" onClick={closeNavbar}>
          Home
        </Link>
        <Link to="/new" onClick={closeNavbar}>
          New
        </Link>
        <Link to="/account" onClick={closeNavbar}>
          Account
        </Link>
        <Link to="/setting" onClick={closeNavbar}>
          Setting
        </Link>
        <button id="navCloseBtn" onClick={closeNavbar}>
          <FaTimes />
        </button>
      </nav>
      <div className="navUtilityBtn">
        <button className="navBtn">
          <Link to="/notifications">
            <RiNotification4Fill />
          </Link>
        </button>
        <button className="navBtn" onClick={handleSignOut}>
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
