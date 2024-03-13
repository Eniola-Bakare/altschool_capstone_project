import Feed from "../components/Feed";
import SidebarFS from "../components/SidebarFS";

function FeedScreen() {
  return (
    <section className="w-full flex  ">
      <SidebarFS />
      <Feed />
    </section>
  );
}

export default FeedScreen;
