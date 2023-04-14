import React, { useContext } from "react";
import "./UserInfo.css";
import { AuthContext } from "../context/AuthContext";

const UserInfo = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="userInfo">
      <img src={currentUser.photoURL} alt="user" />
      <h3>{currentUser.displayName}</h3>
      <p>{currentUser.email}</p>
    </div>
  );
};

export default UserInfo;
