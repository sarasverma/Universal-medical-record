import React, { useContext, useEffect, useState } from "react";
import { RiNotificationOffFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { Wrapper1, Wrapper2 } from "./styles/NotificationStyle";
import { toast } from "react-toastify";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

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
              <div className="notificationCard" key={email}>
                <h3>{email}</h3>
                <button
                  className="notificationAccept"
                  onClick={() => handleAccept(email)}
                >
                  ✅
                </button>
                <button
                  className="notificationReject"
                  onClick={() => handleReject(email)}
                >
                  ❌
                </button>
              </div>
            );
          })}
        </>
      )}
    </Wrapper2>
  );
};

export default Notification;
