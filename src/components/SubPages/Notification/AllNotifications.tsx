import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../../contexts/AuthContext";
import { db } from "../../../firebase/config";
import { useEffect, useState } from "react";
import EachNotif from "./EachNotif";

function AllNotifications() {
  const {
    currentUser,
    setNotificationAlert,
    showNotification,
    notifRef,
    setShowNotification,
  } = useAuthContext();
  const [notifications, setNotifications] = useState([]);
  const [olderNotifications, setOlderNotifications] = useState([])

  // fetch engagers profile
  async function fetchEngager(enagerID) {
    const fetcher = await getDoc(doc(db, "users", enagerID));
    const enager = fetcher.data();
    return enager;
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      let recentNotifcationLocal = currentUser?.recentNotification;

      if (recentNotifcationLocal?.length > 0) {
        setNotificationAlert(true);

        const updatedNotifications = await Promise.all(
          recentNotifcationLocal.map(async (eachNotif) => {
            const engager = await fetchEngager(eachNotif.engagerRef);
            if (eachNotif.type === "comment") {
              return {
                ...eachNotif,
                engagerFName: engager?.fName,
                message: "commented on your post",
                engagerPhotoURL: engager?.photoURL,
              };
            } else if (eachNotif.type == "bookmark") {
              return {
                ...eachNotif,
                engagerFName: engager?.fName,
                message: "bookmarked on your post",
                engagerPhotoURL: engager?.photoURL,
              };
            } else if (eachNotif.type == "like") {
              return {
                ...eachNotif,
                engagerFName: engager?.fName,
                message: "liked on your post",
                engagerPhotoURL: engager?.photoURL,
              };
            }
            return eachNotif;
          })
        );
        setNotifications(updatedNotifications);
      }
    };
    fetchNotifications();
  }, [currentUser, setNotificationAlert]);
  return (
    <div
      ref={notifRef}
      className={`${
        showNotification ? "visible" : "hidden"
      }  bg-slate-200 p-12 w-4/12 h-full absolute right-0 top-0 `}
    >
      <p
        className=" font-extrabold text-4xl text-blue text-right mb-5"
        onClick={() => setShowNotification(false)}
      >
        X
      </p>
      <div className="">
        {notifications.map((each, index) => {
          return <EachNotif notifDetails={each} key={index} />;
        })}
      </div>
    </div>
  );
}

export default AllNotifications;