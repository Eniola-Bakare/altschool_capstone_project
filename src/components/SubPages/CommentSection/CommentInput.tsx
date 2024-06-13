import Button from "../../Button";
import { useAuthContext } from "../../contexts/AuthContext";

function CommentInput() {
  const { currentUser } = useAuthContext();
  return (
    <div className="flex items-center justify-between w-full gap-1 relative">
      <img
        src={currentUser?.photoURL}
        alt="current user"
        className="rounded-full w-8"
      />
      <input
        type="text"
        placeholder="type a comment"
        className="border-2 rounded-xl p-1 pl-2 h-[56px] w-[95%]"
      />
      <div className=" absolute right-0">
        <Button
          type="primary"
          name=">"
          width="w"
          onClick={() => console.log("posting")}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default CommentInput;
