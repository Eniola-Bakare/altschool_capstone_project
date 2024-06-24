import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../../contexts/AuthContext";
import { db } from "../../../firebase/config";
import { useEffect, useState } from "react";
import EachNotif from "./EachNotif";

function AllNotifications() {
  const { currentUser, setNotificationAlert } = useAuthContext();
  const [notifications, setNotifications] = useState([]);

  // fetch engagers profile

  async function fetchEngager(enagerID) {
    const fetcher = await getDoc(doc(db, "users", enagerID));
    const enager = fetcher.data();
    console.log(enager?.fName);
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
    <div>
      {notifications.map((each, index) => {
        return <EachNotif notifDetails={each} key={index} />;
      })}
    </div>
  );
}

export default AllNotifications;
