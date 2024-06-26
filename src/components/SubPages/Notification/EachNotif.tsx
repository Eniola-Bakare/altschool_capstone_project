import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCommentContext } from "../CommentSection/CommentsContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

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
  } = useAuthContext();
  const {
    setShowComments,
    setCurrentPostID,
    setEarlierComments,
    setCurrentPost,
  } = useCommentContext();

  async function handleEachNotif(notifDetails) {
    if (showNotification) setShowNotification(false);
    // if() check if the recent notification.lenght > 0 and handle into recent old transaction
    console.log(notifDetails);

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
    console.log(postUserData);
    console.log(currentUser);
    setScreenToShow("feed");
    setShowComments("comments");
    setCurrentPostID(postUserData?.postDataID);

    setEarlierComments(postUserData?.comments);
    setCurrentPost({ ...postUserData });
  }

  return (
    <div
      className="flex gap-3 pb-3 cursor-pointer"
      onClick={(e) => handleEachNotif(notifDetails)}
    >
      <img src={engagerPhotoURL} className="w-7" />
      <p className="text-lg">
        {engagerFName} {message}
      </p>
    </div>
  );
}

export default EachNotif;
