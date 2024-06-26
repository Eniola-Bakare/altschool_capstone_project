import { useState } from "react";
import HeaderFS from "./HeaderFS";
import PostsAnalytics from "./PostsAnalytics";
import PublishScreen from "./PublishScreen";
import TimelineFS from "./TimelineFS";
import CommentContextProvider from "./SubPages/CommentSection/CommentsContext";
import { useAuthContext } from "./contexts/AuthContext";
import AllBookmarks from "./AllBookmarks";
import AccountSetting from "./AccountSetting";

function AsideFS() {
  const [makeAPostBtn, setMakeAPostBtn] = useState(false);
  const { showAnalytics, showFeed, setShowFeed, screenToShow } =
    useAuthContext();

  return (
    <section className="w-full h-screen flex flex-col items-center gap-10  ">
      <HeaderFS />
      <CommentContextProvider>
        {screenToShow == "feed" && <TimelineFS />}
        {screenToShow == "analytics" && <PostsAnalytics />}
        {screenToShow == "bookmarks" && <AllBookmarks />}
        {screenToShow == "publish" && <PublishScreen />}
        {screenToShow == "setting" && <AccountSetting />}
      </CommentContextProvider>
    </section>
  );
}

export default AsideFS;
