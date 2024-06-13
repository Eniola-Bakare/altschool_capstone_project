import { useId } from "react";
import CommentInput from "./CommentInput";
import { useCommentContext } from "./CommentsContext";
import EachComment from "./EachComment";

function CommentUI() {
  const { setShowComments, earlierComments } = useCommentContext();
  return (
    <div className="w-full mt-5 h-full flex flex-col justify-between">
      <div
        className="back-arrow top-10 flex items-center gap-3 cursor-pointer w-full"
        onClick={() => setShowComments((prev) => !prev)}
      >
        <img src="/arrowcircleleft.png" alt="arrow circle" />
        <p className="text-[#55524F] text-sm">Back</p>
      </div>
      {earlierComments?.length > 0
        ? earlierComments.map((eachComment) => (
            <EachComment commentDetails={eachComment} />
          ))
        : "Be the first to comment !"}

      <CommentInput />
    </div>
  );
}

export default CommentUI;
