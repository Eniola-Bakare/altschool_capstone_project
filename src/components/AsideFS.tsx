import HeaderFS from "./HeaderFS";
import PostsAnalytics from "./PostsAnalytics";
import TimelineFS from "./TimelineFS";

function AsideFS() {
  return (
    <section className="w-full h-screen flex flex-col items-center gap-10 ">
      <HeaderFS />
      {/* <TimelineFS /> */}
      <PostsAnalytics />
    </section>
  );
}

export default AsideFS;
