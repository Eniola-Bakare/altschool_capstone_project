import { useState } from "react";
import HeaderFS from "./HeaderFS";
// import PostsAnalytics from "./PostsAnalytics";
import PublishScreen from "./PublishScreen";
import TimelineFS from "./TimelineFS";

function AsideFS() {
  const [makeAPostBtn, setMakeAPostBtn] = useState(false);

  const closePublish = () => {
    setMakeAPostBtn(false);
  };
  return (
    <section className="w-full h-screen flex flex-col items-center gap-10  ">
      <HeaderFS />
      {!makeAPostBtn && <TimelineFS setMakeAPostBtn={setMakeAPostBtn} />}
      {/* <PostsAnalytics /> */}
      {makeAPostBtn && <PublishScreen closePublish={closePublish} />}
    </section>
  );
}

export default AsideFS;
