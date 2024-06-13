import Button from "../../Button";
import { useAuthContext } from "../../contexts/AuthContext";

function CommentInput() {
  const { currentUser } = useAuthContext();
  return (
    <div className="flex items-center justify-start w-full">
      <img
        src={currentUser?.photoURL}
        alt="current user"
        className="rounded-full w-7"
      />
      <input
        type="text"
        placeholder="type a comment"
        className="border-2 rounded-xl p-1 pl-2 h-[56px]"
      />
      <Button
        type="secondary"
        name=">"
        width="w"
        onClick={() => console.log("posting")}
        disabled
      />
    </div>
  );
}

export default CommentInput;
