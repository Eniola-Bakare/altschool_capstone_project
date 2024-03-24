import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Button from "./Button";
import LogoText from "./LogoText";
import { useState } from "react";
function Header() {
    const [openBurger, setOpenBurger] = useState(false);
    function handleScroll() {
        const section = document.getElementById("about");
        section.scrollIntoView({ behavior: "smooth" });
    }
    return (_jsxs("nav", { className: "w-full bg-white flex justify-between items-center py-4 px-4 md:px-8 lg:px-10 xl:px-20 relative", children: [_jsx(Link, { to: "/", children: _jsx(LogoText, {}) }), _jsxs(_Fragment, { children: [_jsxs("ul", { className: "navLinks gap-4 hidden lg:flex", children: [_jsx("li", { className: "text-black font-bold cursor-pointer ", children: "Home" }), _jsx("li", { className: "text-black font-bold cursor-pointer ", onClick: () => handleScroll(), children: "About us" }), _jsx("li", { className: "text-black font-bold cursor-pointer ", children: "Contact" }), _jsx("li", { className: "text-black font-bold cursor-pointer ", children: "Blogs" })] }), _jsx("img", { src: "/hamburger.png", alt: "an hamburger icon", className: "flex w-[45px] lg:hidden cursor-pointer", onClick: () => setOpenBurger(true) }), _jsxs("span", { className: "buttons gap-2 hidden lg:flex", children: [_jsx(Link, { to: "/signin", children: _jsx(Button, { name: "Log in", type: "secondary" }) }), _jsx(Link, { to: "/signup", children: _jsx(Button, { name: "Sign up", type: "primary", onClick: () => console.log("second") }) })] })] }), openBurger && (_jsxs("span", { className: "absolute flex flex-col justify-center items-center gap-12 w-[45%] h-screen right-0 top-0 bg-white/90 rounded-lg px-10 ", children: [_jsx("img", { src: "/hamburger.png", alt: "an hamburger icon", onClick: () => setOpenBurger(false), className: "flex w-[45px] self-end cursor-pointer" }), _jsxs("ul", { className: "navLinks gap-4 flex flex-col justify-center items-center ", children: [_jsx("li", { className: "text-black text-2xl font-bold cursor-pointer  ", children: "Home" }), _jsx("li", { className: "text-black text-2xl font-bold cursor-pointer  ", onClick: () => handleScroll(), children: "About us" }), _jsx("li", { className: "text-black text-2xl font-bold cursor-pointer  ", children: "Contact" }), _jsx("li", { className: "text-black text-2xl font-bold cursor-pointer  ", children: "Blogs" })] }), _jsxs("span", { className: "buttons flex flex-col gap-2 lg:flex", children: [_jsx(Link, { to: "/signin", children: _jsx(Button, { name: "Log in", type: "secondary" }) }), _jsx(Link, { to: "/signup", children: _jsx(Button, { name: "Sign up", type: "primary", onClick: () => console.log("second") }) })] })] }))] }));
}
export default Header;
