import { useState } from "react";
import Button from "../../Button";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCommentContext } from "./CommentsContext";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { v4 as uuidv4 } from "uuid";

function CommentInput() {
  const { currentUser } = useAuthContext();
  const { currentPostID, setEarlierComments, currentPost } =
    useCommentContext();
  const [commentText, setCommentText] = useState("");

  async function handleComment() {
    if (commentText.trim() && currentUser) {
      const ID = uuidv4();
      const recentNotif1 = await getDoc(
        doc(db, "users", currentPost?.userDocRef)
      );
      const recentNotif = recentNotif1?.data().recentNotification;
      updateDoc(doc(db, "users", currentPost?.userDocRef), {
        recentNotification: [
          ...(recentNotif || []),
          {
            postDocRef: currentPostID,
            poster: currentPost?.userDocRef,
            commenterRef: currentUser?.userDocRef,
            type: "comment",
            commentID: ID,
          },
        ],
      }).then(() => {
        getDoc(doc(db, "posts", currentPostID))
          .then((post) => {
            const commentsArr = post?.data().comments || [];
            const timeStamp = Date.now();

            return updateDoc(doc(db, "posts", currentPostID), {
              comments: [
                ...commentsArr,
                {
                  commentText: commentText,
                  commenterRef: currentUser?.userDocRef,
                  datePublished: timeStamp,
                  commentID: ID,
                },
              ],
            });
          })
          .then((resp) =>
            onSnapshot(doc(db, "posts", currentPostID), (doc) => {
              setEarlierComments(doc?.data().comments);
            })
          )
          .catch((err) => console.error(err, "An error occured, try again !"));
      });
    }
    setCommentText("");
  }

  return (
    <div className="flex items-center justify-between w-full gap-1 relative">
      <img
        src={currentUser?.photoURL}
        alt="current user"
        className="rounded-full w-8"
      />
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="type a comment"
        className="border-2 rounded-xl p-1 pl-2 h-[56px] w-[95%] outline-blue"
      />
      <div className=" absolute right-0">
        <Button
          type="primary"
          name=">"
          width="w"
          onClick={handleComment}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default CommentInput;
