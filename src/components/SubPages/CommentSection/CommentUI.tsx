import { useId } from "react";
import CommentInput from "./CommentInput";
import { useCommentContext } from "./CommentsContext";
import EachComment from "./EachComment";

function CommentUI() {
  const { setShowComments, earlierComments, currentPost } = useCommentContext();
  const { postText, attachment, fName, photoURL, lName } = currentPost;
  return (
    <div className="comments w-[100%] mt-10 h-full flex flex-col overflow-scroll ">
      <div className="currentPost">
        <div className="postOwner flex items-center gap-4 mb-5">
          <div className="profile-image w-[70px]">
            <img
              src={photoURL}
              alt="a profile picture"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-2xl">
              {fName} {lName}
            </p>
          </div>
        </div>

        <img src={attachment} alt="img"/>
        <p
          className="mt-10 bg-blue/10 p-4 rounded-lg"
          dangerouslySetInnerHTML={{ __html: postText }}
        />
      </div>
      <div
        className="back-arrow top-10 flex items-center gap-3 cursor-pointer w-fit p-2 rounded-lg mt-10 bg-blue"
        onClick={() => setShowComments((prev) => !prev)}
      >
        <img src="/arrowcircleleft.png" alt="arrow circle" />
        <p className="text-white text-sm pr-3 font-semibold">Back</p>
      </div>
      <div className="comments pb-40 relative">
        {earlierComments?.length > 0 ? (
          earlierComments.map((eachComment) => (
            <EachComment commentDetails={eachComment} />
          ))
        ) : (
          <p className="mt-5">Be the first to comment !</p>
        )}
      </div>
      <div className=" absolute bottom-0 w-[60%]">
        <CommentInput />
      </div>
    </div>
  );
}

export default CommentUI;
