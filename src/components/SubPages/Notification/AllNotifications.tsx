import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../contexts/AuthContext";
import { db } from "../../../firebase/config";
import { useEffect, useState } from "react";
import EachNotif from "./EachNotif";
import { useLocalStorage } from "../../actions/LocalStorage";

function AllNotifications() {
  const {
    currentUser,
    setCurrentUser,
    setNotificationAlert,
    showNotification,
    notifRef,
    setShowNotification,
    recentNotifications,
    setRecentNotifications,
    olderNotifications,
    setOlderNotifications,
  } = useAuthContext();

  const { setUserLocalStorage } = useLocalStorage("currentUser");
  setOlderNotifications(currentUser?.olderNotification);

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
                message: "bookmarked your post",
                engagerPhotoURL: engager?.photoURL,
              };
            } else if (eachNotif.type == "like") {
              return {
                ...eachNotif,
                engagerFName: engager?.fName,
                message: "liked your post",
                engagerPhotoURL: engager?.photoURL,
              };
            }
            return eachNotif;
          })
        );
        setRecentNotifications(updatedNotifications);
      }
    };

    fetchNotifications();
  }, [currentUser, setNotificationAlert, olderNotifications]);

  function handleRecentOld() {
    setShowNotification(false);
    const currentUserDocRef = currentUser?.userDocRef;
    if (recentNotifications.length > 0) {
      getDoc(doc(db, "users", currentUserDocRef))
        .then((userDoc) => {
          const olderDoc = userDoc.data();
          return updateDoc(doc(db, "users", currentUserDocRef), {
            olderNotification:
              olderNotifications?.length > 0
                ? [...olderDoc?.olderNotification, ...recentNotifications]
                : [...recentNotifications],
            recentNotification: [],
          });
        })
        .then((ref) => {
          setRecentNotifications([]);
          setNotificationAlert(false);
          return onSnapshot(doc(db, "users", currentUserDocRef), (doc) => {
            const currentUser = doc?.data();
            setCurrentUser({ ...currentUser, userDocRef: doc?.id });
            setUserLocalStorage({ ...currentUser, userDocRef: doc?.id });
          });
        });
    }
  }
  return (
    <div
      ref={notifRef}
      className={`${
        showNotification ? "visible" : "hidden"
      }  bg-slate-200 p-12 w-4/12 h-full absolute right-0 top-0 flex flex-col z-50 `}
    >
      <p
        className=" font-extrabold text-4xl text-blue text-right mb-5 w-fit self-end cursor-pointer"
        onClick={() => handleRecentOld()}
      >
        X
      </p>
      <div className="">
        {recentNotifications?.length > 0 ? (
          <p className=" pb-4 font-bold">Recent notifications</p>
        ) : recentNotifications?.length < 1 &&
          olderNotifications?.length < 1 ? (
          <p className=" pb-4 font-bold">No notification yet</p>
        ) : (
          <p className=" pb-4 font-bold">All notifications</p>
        )}
        {recentNotifications?.map((each, index) => {
          return <EachNotif notifDetails={each} key={index} />;
        })}
        {recentNotifications?.length > 0 && olderNotifications?.length > 0 && (
          <p className=" pb-4 font-bold">Older notifications</p>
        )}
        {olderNotifications
          ?.map((each, index) => {
            return <EachNotif notifDetails={each} key={index} />;
          })
          .reverse()}
      </div>
    </div>
  );
}

export default AllNotifications;
