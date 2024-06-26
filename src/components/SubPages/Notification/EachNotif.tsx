import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCommentContext } from "../CommentSection/CommentsContext";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useLocalStorage } from "../../actions/LocalStorage";

function EachNotif({ notifDetails }) {
  const {
    engagerFName,
    engagerPhotoURL,
    engagerRef,
    message,
    postDocRef,
    type,
  } = notifDetails;
  const {
    setScreenToShow,
    setShowNotification,
    currentUser,
    showNotification,
    recentNotifications,
    setRecentNotifications,
    setNotificationAlert,
    setCurrentUser,
    olderNotifications,
  } = useAuthContext();
  const {
    setShowComments,
    setCurrentPostID,
    setEarlierComments,
    setCurrentPost,
  } = useCommentContext();
  const { setUserLocalStorage } = useLocalStorage("currentUser");

  async function handleEachNotif(notifDetails) {
    if (showNotification) setShowNotification(false);
    // if() check if the recent notification.lenght > 0 and handle into recent old transaction
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
    const postUserData = await getDoc(
      doc(db, "posts", notifDetails?.postDocRef)
    ).then((postData) => {
      postData;

      return getDoc(doc(db, "users", notifDetails?.poster)).then(
        (commenter) => ({
          ...postData.data(),
          postDataID: postData.id,
          ...commenter.data(),
          commenterID: commenter.id,
        })
      );
    });

    setScreenToShow("feed");
    setShowComments("comments");
    setCurrentPostID(postUserData?.postDataID);

    setEarlierComments(postUserData?.comments);
    setCurrentPost({ ...postUserData });
  }

  return (
    <div
      className="flex gap-3 pb-3 cursor-pointer"
      onClick={() => handleEachNotif(notifDetails)}
    >
      <img src={engagerPhotoURL} className="w-7" />
      <p className="text-lg">
        {engagerFName} {message}
      </p>
    </div>
  );
}

export default EachNotif;
