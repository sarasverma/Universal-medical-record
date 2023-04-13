import { useRef } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import { RiNotification4Fill } from "react-icons/ri";
import Logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div className="navbarContainer">
      <div>
        <button id="navOpenBtn" onClick={showNavbar}>
          <FaBars />
        </button>
        <div id="navLogo">
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <nav ref={navRef}>
        <Link to="/home">Home</Link>
        <Link to="/new">New</Link>
        <Link to="/account">Account</Link>
        <Link to="/setting">Setting</Link>
        <button id="navCloseBtn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <div className="navUtilityBtn">
        <button className="navBtn">
          <RiNotification4Fill />
        </button>
        <button className="navBtn" onClick={() => signOut(auth)}>
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
