import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCommentContext } from "./CommentsContext";
import { update } from "firebase/database";

function EachComment({ commentDetails, userID }) {
  const { commentText, commenterRef, datePublished } = commentDetails;
  const { currentUser } = useAuthContext();
  const { currentPost, earlierComments, setEarlierComments } =
    useCommentContext();
  const [commenterDetails, setcommenterDetails] = useState({});
  const { photoURL, fName } = commenterDetails;

  function getCommenterDetails() {
    getDoc(doc(db, "users", commenterRef))
      .then((commenter) => setcommenterDetails(commenter.data()))
      .catch((err) => console.error(err, "unable to load"));
  }

  const date = new Date(datePublished);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  getCommenterDetails();

  async function handleCommentDelete(commentDetails) {
    if (confirm("Do you want to delete your comment?")) {
      const recentNotif1 = await getDoc(
        doc(db, "users", currentPost?.userDocRef)
      );
      const recentNotif = recentNotif1?.data().recentNotification;

      updateDoc(doc(db, "users", currentPost?.userDocRef), {
        recentNotification: recentNotif.filter(
          (comment) => comment.commentID !== commentDetails?.commentID
        ),
      });

      setEarlierComments((prev) => {
        const updated = prev.filter(
          (each) => each.commentID !== commentDetails?.commentID
        );
        updateDoc(doc(db, "posts", currentPost?.postID), {
          comments: updated,
        });
        return updated;
      });
    }
  }

  return (
    <div className=" mt-10">
      {/* EachComment */}

      <div className="commenter-details bg-borderGrey/10 p-5 rounded-lg flex justify-between items-center gap-1 w-full">
        <div className=" flex gap-3">
          <img
            src={photoURL}
            alt="commenter picture"
            className=" rounded-full w-7"
          />
          <p className=" font-semibold text-lg">
            {fName} |{" "}
            <span className=" text-grey/50 font-medium">
              {formattedDate} [{formattedTime}]{" "}
            </span>
          </p>
        </div>
        {currentUser?.userDocRef == commenterRef && (
          <p onClick={() => handleCommentDelete(commentDetails)}>DELETE</p>
        )}
      </div>
      <p className="  p-4 rounded-sm">{commentText}</p>
    </div>
  );
}

export default EachComment;
