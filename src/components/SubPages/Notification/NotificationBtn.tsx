import { useEffect, useRef } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useLocalStorage } from "../../actions/LocalStorage";

function NotificationBtn() {
  const {
    notificationAlert,
    setNotificationAlert,
    setShowNotification,
    notifRef,
    olderNotifications,
    // setOlderNotifications,
    recentNotifications,
    setRecentNotifications,
    currentUser,
    setCurrentUser,
  } = useAuthContext();
  const { setUserLocalStorage, removeUserLocalStorage } =
    useLocalStorage("currentUser");
  const notifBtnRef = useRef(null);

  function handleShowNotification(e) {
    e.stopPropagation();
    setShowNotification(true);
    console.log(recentNotifications);
    console.log(olderNotifications);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notifBtnRef.current &&
        !notifBtnRef.current.contains(event.target)
        // notifRef.current &&
        // !notifRef.current.contains(event.target)
      ) {
        setShowNotification(false);

        const currentUserDocRef = currentUser?.userDocRef;
        // set recent notifs to older notifs
        if (recentNotifications.length > 0) {
          console.log(currentUser?.recentNotification);
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
              onSnapshot(doc(db, "users", currentUserDocRef), (doc) => {
                const currentUser = doc?.data();
                console.log(currentUser);
                console.log(doc.id);
                setCurrentUser({ ...currentUser, userDocRef: doc?.id });
                setUserLocalStorage({ ...currentUser, userDocRef: doc?.id });
              });
            });
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowNotification]);

  return (
    <>
      <svg
        ref={notifBtnRef}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="notif-btn fill-grey hover:fill-blue"
        onClick={handleShowNotification}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.9996 3C12.9996 2.73478 12.8943 2.48043 12.7067 2.29289C12.5192 2.10536 12.2648 2 11.9996 2C11.7344 2 11.48 2.10536 11.2925 2.29289C11.105 2.48043 10.9996 2.73478 10.9996 3V3.75H10.4426C9.37065 3.74993 8.33894 4.15839 7.55754 4.89224C6.77613 5.62608 6.30377 6.63014 6.23661 7.7L6.01561 11.234C5.93134 12.5814 5.47891 13.8799 4.70761 14.988C4.54825 15.2171 4.45087 15.4835 4.42496 15.7613C4.39904 16.0392 4.44547 16.319 4.55973 16.5736C4.67398 16.8281 4.85218 17.0488 5.07698 17.2142C5.30179 17.3795 5.56555 17.4838 5.84261 17.517L9.24961 17.925V19C9.24961 19.7293 9.53935 20.4288 10.0551 20.9445C10.5708 21.4603 11.2703 21.75 11.9996 21.75C12.729 21.75 13.4284 21.4603 13.9442 20.9445C14.4599 20.4288 14.7496 19.7293 14.7496 19V17.925L18.1566 17.516C18.4335 17.4827 18.6971 17.3784 18.9218 17.2131C19.1464 17.0478 19.3245 16.8273 19.4388 16.5729C19.553 16.3184 19.5995 16.0388 19.5737 15.7611C19.5479 15.4834 19.4507 15.2171 19.2916 14.988C18.5203 13.88 18.0678 12.5815 17.9836 11.234L17.7626 7.701C17.6957 6.63096 17.2234 5.62665 16.442 4.8926C15.6606 4.15855 14.6287 3.74995 13.5566 3.75H12.9996V3ZM10.4426 5.25C9.75219 5.24992 9.08769 5.51297 8.58439 5.98561C8.0811 6.45825 7.77686 7.10493 7.73361 7.794L7.51361 11.328C7.41196 12.949 6.86753 14.511 5.93961 15.844C5.92808 15.8606 5.92103 15.8798 5.91915 15.8999C5.91727 15.92 5.92062 15.9403 5.92887 15.9587C5.93712 15.9771 5.95 15.9931 5.96625 16.005C5.9825 16.017 6.00158 16.0246 6.02161 16.027L9.75861 16.476C11.2476 16.654 12.7516 16.654 14.2406 16.476L17.9776 16.027C17.9977 16.0246 18.0167 16.017 18.033 16.005C18.0492 15.9931 18.0621 15.9771 18.0704 15.9587C18.0786 15.9403 18.082 15.92 18.0801 15.8999C18.0782 15.8798 18.0711 15.8606 18.0596 15.844C17.1321 14.5109 16.588 12.9489 16.4866 11.328L16.2656 7.794C16.2224 7.10493 15.9181 6.45825 15.4148 5.98561C14.9115 5.51297 14.247 5.24992 13.5566 5.25H10.4426ZM11.9996 20.25C11.3096 20.25 10.7496 19.69 10.7496 19V18.25H13.2496V19C13.2496 19.69 12.6896 20.25 11.9996 20.25Z"
          fill={`${notificationAlert ? "red" : "black"}`}
        />
      </svg>
      {recentNotifications.length > 0 && (
        <p className={`${notificationAlert ? "red" : "black"}`}>
          {recentNotifications?.length}
        </p>
      )}
    </>
  );
}

export default NotificationBtn;
