import { useState } from "react";
import HeaderFS from "./HeaderFS";
import PostsAnalytics from "./PostsAnalytics";
import PublishScreen from "./PublishScreen";
import TimelineFS from "./TimelineFS";
import CommentContextProvider from "./SubPages/CommentSection/CommentsContext";
import { useAuthContext } from "./contexts/AuthContext";

function AsideFS() {
  const [makeAPostBtn, setMakeAPostBtn] = useState(false);
  const { showAnalytics, showFeed, setShowFeed } = useAuthContext();

  const closePublish = () => {
    setShowFeed(true);
  };
  return (
    <section className="w-full h-screen flex flex-col items-center gap-10  ">
      <HeaderFS />
      <CommentContextProvider>
        {showFeed && <TimelineFS />}
        {showAnalytics && !showFeed && <PostsAnalytics />}
        {!showFeed && !showAnalytics && <PublishScreen closePublish={closePublish} />}
      </CommentContextProvider>
    </section>
  );
}

export default AsideFS;
