import CommentInput from "./CommentInput";
import { useCommentContext } from "./CommentsContext";

function CommentUI() {
  const { setShowComments } = useCommentContext();
  return (
    <div className="w-full mt-5 h-full flex flex-col justify-between">
      <div
        className="back-arrow top-10 flex items-center gap-3 cursor-pointer w-full"
        onClick={() => setShowComments((prev) => !prev)}
      >
        <img src="/arrowcircleleft.png" alt="arrow circle" />
        <p className="text-[#55524F] text-sm">Back</p>
      </div>

      <CommentInput />
    </div>
  );
}

export default CommentUI;
