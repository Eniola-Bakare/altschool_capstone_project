import AsideFS from "../components/AsideFS";
import SidebarFS from "../components/SidebarFS";

function FeedScreen() {
  return (
    <section className="w-full flex overflow-hidden  ">
      <SidebarFS />
      <AsideFS />
    </section>
  );
}

export default FeedScreen;
