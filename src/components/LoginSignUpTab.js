import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
function LoginSignUpTab() {
    return (_jsxs("section", { className: "authTab flex w-full px-4 lg:px-0 lg:w-[50%] justify-between", children: [_jsx("p", { className: "font-bold  text-xl md:text-base border-b-2 border-grey pb-2 lg:pb-6 w-[50%] hover:border-blue hover:border-b-4 ", children: _jsx(Link, { to: "/signup", children: "REGISTER" }) }), _jsx("p", { className: "font-bold text-xl md:text-base  border-b-2 border-grey hover:border-blue hover:border-b-4 pb-2 lg:pb-6 w-[50%] text-right ", children: _jsx(Link, { to: "/signin", children: "LOG IN" }) })] }));
}
export default LoginSignUpTab;
