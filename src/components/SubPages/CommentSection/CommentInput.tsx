import { useState } from "react";
import Button from "../../Button";
import { useAuthContext } from "../../contexts/AuthContext";
import { useCommentContext } from "./CommentsContext";

function CommentInput() {
  const { currentUser } = useAuthContext();
  const [commentText, setCommentText] = useState("");

  function handleComment() {
    console.log(commentText);

    // handle coment upload

    // clear comment input field
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
