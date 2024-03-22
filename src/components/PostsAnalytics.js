import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PostAnalysis from "./PostAnalysis";
import PostAnlySummary from "./PostAnlySummary";
function PostsAnalytics() {
    return (_jsxs("section", { className: "w-[80%] flex flex-col gap-3 self-start pl-14 ", children: [_jsx("p", { className: "font-bold text-3xl", children: "Posts analytics" }), _jsxs("div", { className: "post-date-details", children: [_jsxs("p", { className: "font-bold text-xl border-b-2 border-blue pb-3", children: ["May 2023, ", _jsx("span", { className: "text-base text-grey", children: "25 days so far" })] }), _jsxs("p", { className: "font-bold text-xl pt-2", children: [_jsx("p", { className: "font-bold text-xl pb-3", children: "Posts highlights" }), "Top posts", " ", _jsx("span", { className: "text-base text-grey font-normal", children: "earned 2980 impressions" })] })] }), _jsx(PostAnalysis, {}), _jsx(PostAnlySummary, {})] }));
}
export default PostsAnalytics;
