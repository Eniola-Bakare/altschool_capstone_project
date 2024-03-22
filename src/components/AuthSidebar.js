import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AuthSidebar() {
    return (_jsx("aside", { style: {
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/authSidebar.png')",
        }, className: "bg-cover w-full lg:w-[35%] py-14  md:h-screen bg-right sm:bg-right-bottom md:bg-right lg:bg-center flex justify-center items-center sticky", children: _jsxs("div", { className: "auth-side-text flex flex-col items-center w-full sm:w-[90%]", children: [_jsx("h1", { className: "text-5xl font-bold text-white leading-[72px] text-center ", children: "Chatter" }), _jsx("p", { className: "text-white text-center w-[80%] md:w-[90%] md:text-center md:text-xl font-medium md:leading-[30px]", children: "Unleash the Power of Words, Connect with Like-minded Readers and Writers" })] }) }));
}
export default AuthSidebar;
