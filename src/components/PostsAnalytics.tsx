import PostAnalysis from "./PostAnalysis";
import PostAnlySummary from "./PostAnlySummary";

function PostsAnalytics() {
  return (
    <section className="w-[80%] flex flex-col gap-3 self-start pl-14 ">
      <p className="font-bold text-3xl">Posts analytics</p>

      <div className="post-date-details">
        <p className="font-bold text-xl border-b-2 border-blue pb-3">
          May 2023, <span className="text-base text-grey">25 days so far</span>
        </p>

        <p className="font-bold text-xl pt-2">
        <p className="font-bold text-xl pb-3">Posts highlights</p>
          Top posts{" "}
          <span className="text-base text-grey font-normal">earned 2980 impressions</span>
        </p>
      </div>

      <PostAnalysis />

      <PostAnlySummary />
    </section>
  );
}

export default PostsAnalytics;
