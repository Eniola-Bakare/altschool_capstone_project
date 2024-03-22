import { Link } from "react-router-dom";
import Button from "./Button";
import LogoText from "./LogoText";
import { useState } from "react";

function Header() {
  const [openBurger, setOpenBurger] = useState(false);

  function handleScroll() {
    const section: any = document.getElementById("about");
    section.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <nav className="w-full bg-white flex justify-between items-center py-4 px-4 md:px-8 lg:px-10 xl:px-20 relative">
      <Link to="/">
        <LogoText />
      </Link>

      <>
        <ul className="navLinks gap-4 hidden lg:flex">
          <li className="text-black font-bold cursor-pointer ">Home</li>
          <li
            className="text-black font-bold cursor-pointer "
            onClick={() => handleScroll()}
          >
            About us
          </li>
          <li className="text-black font-bold cursor-pointer ">Contact</li>
          <li className="text-black font-bold cursor-pointer ">Blogs</li>
        </ul>
        <img
          src="/hamburger.png"
          alt="an hamburger icon"
          className="flex w-[45px] lg:hidden cursor-pointer"
          onClick={() => setOpenBurger(true)}
        />
        <span className="buttons gap-2 hidden lg:flex">
          <Link to="/signin">
            <Button name="Log in" type="secondary" />
          </Link>
          <Link to="/signup">
            <Button
              name="Sign up"
              type="primary"
              onClick={() => console.log("second")}
            />
          </Link>
        </span>
      </>

      {openBurger && (
        <span className="absolute flex flex-col justify-center items-center gap-12 w-[45%] h-screen right-0 top-0 bg-white/90 rounded-lg px-10 ">
          <img
            src="/hamburger.png"
            alt="an hamburger icon"
            onClick={() => setOpenBurger(false)}
            className="flex w-[45px] self-end cursor-pointer"
          />
          <ul className="navLinks gap-4 flex flex-col justify-center items-center ">
            <li className="text-black text-2xl font-bold cursor-pointer  ">
              Home
            </li>
            <li
              className="text-black text-2xl font-bold cursor-pointer  "
              onClick={() => handleScroll()}
            >
              About us
            </li>
            <li className="text-black text-2xl font-bold cursor-pointer  ">
              Contact
            </li>
            <li className="text-black text-2xl font-bold cursor-pointer  ">
              Blogs
            </li>
          </ul>
          <span className="buttons flex flex-col gap-2 lg:flex">
            <Link to="/signin">
              <Button name="Log in" type="secondary" />
            </Link>
            <Link to="/signup">
              <Button
                name="Sign up"
                type="primary"
                onClick={() => console.log("second")}
              />
            </Link>
          </span>
        </span>
      )}
    </nav>
  );
}

export default Header;
