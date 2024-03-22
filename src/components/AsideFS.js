import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("section", { className: "w-full h-screen flex flex-col items-center gap-10  ", children: [_jsx(HeaderFS, {}), !makeAPostBtn && _jsx(TimelineFS, { setMakeAPostBtn: setMakeAPostBtn }), makeAPostBtn && _jsx(PublishScreen, { closePublish: closePublish })] }));
}
export default AsideFS;
