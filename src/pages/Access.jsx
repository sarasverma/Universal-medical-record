import React, { useContext, useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Wrapper from "./styles/CardStyle";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessList, setAcessList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const res = await getDoc(doc(db, "userSetting", currentUser.email));
        if (res.exists()) {
          const data = res.data();
          setAcessList(data.access);
          setPermissionList(data.permission);

          setIsLoading(false);
        } else {
          console.log("No record");
        }
      } catch (e) {
        setIsLoading(false);
        toast.error(e);
      }
    }

    getData();
  }, []);

  const handleRemoveAccess = async (email) => {
    try {
      // remove from your access list
      console.log(email);
      await updateDoc(doc(db, "userSetting", currentUser.email), {
        access: arrayRemove(email),
      });

      // remove from permission list of other user
      await updateDoc(doc(db, "userSetting", email), {
        permission: arrayRemove(currentUser.email),
      });

      const newAccessList = accessList.filter((access) => access !== email);
      setAcessList(newAccessList);

      toast.success(`${email} request accepted`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Searchbar />
      {isLoading ? (
        <div
          className="loader"
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
        <Wrapper>
          {permissionList.length != 0 && (
            <>
              <h2 style={{ textAlign: "center" }}>Permission list</h2>
              <div className="wrapper">
                {permissionList.map((email) => (
                  <div className="card" key={email}>
                    <div className="card__body">
                      <FaUserAlt
                        className="card__image"
                        style={{ color: "grey" }}
                      />
                      <h2 className="card__title">{email}</h2>
                    </div>
                    <Link to={`/new/${email}/`} className="card__btn add">
                      Add record
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}

          {accessList.length != 0 && (
            <>
              <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                Access list
              </h2>
              <div className="wrapper">
                {accessList.map((email) => (
                  <div className="card" key={email}>
                    <div className="card__body">
                      <FaUserAlt
                        className="card__image"
                        style={{ color: "grey" }}
                      />
                      <h2 className="card__title">{email}</h2>
                    </div>
                    <button
                      className="card__btn"
                      onClick={() => {
                        handleRemoveAccess(email);
                      }}
                    >
                      Remove access
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </Wrapper>
      )}
    </div>
  );
};

export default Search;
