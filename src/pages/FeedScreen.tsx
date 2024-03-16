import AsideFS from "../components/AsideFS";
import SidebarFS from "../components/SidebarFS";
import { useAuthContext } from "../components/contexts/AuthContext";

function FeedScreen() {
  const { authUser } = useAuthContext();
  return (
    <section className="w-full flex  ">
      <SidebarFS />
      <AsideFS  />
    </section>
  );
}

export default FeedScreen;
