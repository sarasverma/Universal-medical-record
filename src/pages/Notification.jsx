import React, { useContext, useEffect, useState } from "react";
import { RiNotificationOffFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { Wrapper1, Wrapper2 } from "./styles/NotificationStyle";
import Wrapper from "./styles/CardStyle";
import { toast } from "react-toastify";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaUserAlt } from "react-icons/fa";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getDoc(doc(db, "userSetting", currentUser.email));
        if (res.exists()) {
          const notification = res.data().notification;
          if (notification.length != 0) {
            setNotifications(notification);
          }
        }
      } catch (e) {
        toast.error(e);
      }
    }
    getData();
  }, []);

  const handleAccept = async (email) => {
    // console.log("accept");
    try {
      // add to your access list
      await updateDoc(doc(db, "userSetting", currentUser.email), {
        notification: arrayRemove(email),
        access: arrayUnion(email),
      });
      // add to permission list of other user
      await updateDoc(doc(db, "userSetting", email), {
        permission: arrayUnion(currentUser.email),
      });

      const newNotifications = notifications.filter(
        (notification) => notification !== email
      );
      setNotifications(newNotifications);
      toast.success(`${email} request accepted`);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleReject = async (email) => {
    // console.log("reject");
    try {
      // remove from notification list
      await updateDoc(doc(db, "userSetting", currentUser.email), {
        notification: arrayRemove(email),
      });

      const newNotifications = notifications.filter(
        (notification) => notification !== email
      );
      setNotifications(newNotifications);
      toast.success(`${email} request rejected`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Wrapper2>
      <Wrapper>
        {notifications.length === 0 ? (
          <Wrapper1>
            <RiNotificationOffFill style={{ fontSize: "100px" }} />
            <h2>No notification</h2>
          </Wrapper1>
        ) : (
          <>
            <h1>Access requests</h1>
            {notifications.map((email) => {
              return (
                <div
                  className="card"
                  key={email}
                  style={{ marginTop: "20px", padding: "10px 0" }}
                >
                  <div className="card__body">
                    <FaUserAlt
                      className="card__image"
                      style={{ color: "grey" }}
                    />
                    <h2 className="card__title">{email}</h2>
                  </div>

                  <div
                    className="buttons"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="notificationAccept"
                      onClick={() => handleAccept(email)}
                      style={{ fontSize: "32px" }}
                    >
                      ✅
                    </button>
                    <button
                      className="notificationReject"
                      onClick={() => handleReject(email)}
                      style={{ fontSize: "32px" }}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </Wrapper>
    </Wrapper2>
  );
};

export default Notification;
