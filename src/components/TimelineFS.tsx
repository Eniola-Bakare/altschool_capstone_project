import AllPosts from "./AllPosts";
import CommentUI from "./SubPages/CommentSection/CommentUI";
import { useCommentContext } from "./SubPages/CommentSection/CommentsContext";
import { useAuthContext } from "./contexts/AuthContext";

function TimelineFS() {
  const { currentUser, setScreenToShow } = useAuthContext();
  const { showComments } = useCommentContext();

  return (
    <section className="timeline w-[80dvw] h-screen overflow-hidden border-x border-y border-borderGrey flex justify-center  ">
      <div className="w-[85%] flex flex-col">
        <div className="feed+post flex justify-between items-center pt-12 pb-8 ">
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-medium">
              {" "}
              {currentUser
                ? `Welcome, ${
                    currentUser?.displayName?.split(" ")[0] ||
                    currentUser?.fName
                  } !`
                : "FEED"}
            </p>
            <p className="text-lg text-grey">
              Explore different content you love
            </p>
          </div>

          <button
            className=" h-[56px] py-2 px-4 bg-blue border-2 border-blue text-white rounded-lg font-bold flex gap-3 items-center justify-center"
            onClick={() => setScreenToShow("publish")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g clip-path="url(#clip0_419_208)">
                <path
                  d="M2.66211 22.2499H6.90461L22.4611 6.69343L18.2181 2.45093L2.66211 18.0074V22.2499Z"
                  stroke="white"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.9756 6.69336L18.2181 10.9359"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_419_208">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Post a content
          </button>
        </div>

        <div className="tab border border-borderGrey h-[58px] px-[50px] py-7 flex justify-between rounded-lg items-center ">
          <p className="font-semibold text-lg cursor-pointer hover:pb-[30px] hover:border-b-2 hover:border-blue">
            For you
          </p>
          <p className="font-semibold text-lg cursor-pointer hover:pb-[30px] hover:border-b-2 hover:border-blue">
            Featured
          </p>
          <p className="font-semibold text-lg cursor-pointer hover:pb-[30px] hover:border-b-2 hover:border-blue">
            Recent
          </p>
        </div>
        {showComments == "comments" && <CommentUI />}
        {showComments == "allPosts" && <AllPosts />}
      </div>
    </section>
  );
}

export default TimelineFS;
