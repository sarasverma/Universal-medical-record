import React, { useContext, useState } from "react";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Search.css";

const Search = () => {
  const [userEmail, setUserEmail] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (userEmail === currentUser.email) {
        toast("It's your email address");
        return;
      }

      const res = await getDoc(doc(db, "userSetting", userEmail));
      if (res.exists()) {
        console.log(res.data());

        await updateDoc(doc(db, "userSetting", userEmail), {
          notification: arrayUnion(currentUser.email),
        });

        toast.success("Access Request sent !✅");
      } else {
        toast.error("User doesn't exists");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={handleSearch}>
        <input
          type="email"
          placeholder="Find a user"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          required
        />
        <button type="submit">search</button>
      </form>
    </div>
  );
};

export default Search;
