import HeaderFS from "./HeaderFS";
import TimelineFS from "./TimelineFS";

function Feed() {
  return (
    <section className="w-[80%] flex flex-col items-center gap-12">
      <HeaderFS />
      <TimelineFS />
    </section>
  );
}

export default Feed;
