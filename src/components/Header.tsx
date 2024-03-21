import { Link } from "react-router-dom";
import Button from "./Button";
import LogoText from "./LogoText";

function Header() {
  function handleScroll() {
    const section: any = document.getElementById("about");
    section.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <nav className="w-full bg-white flex justify-between items-center py-4 lg:px-10 xl:px-20">
      <Link to="/">
        <LogoText />
      </Link>
      <ul className="navLinks flex gap-4">
        <li className="text-black font-bold ">Home</li>
        <li className="text-black font-bold " onClick={() => handleScroll()}>
          About us
        </li>
        <li className="text-black font-bold ">Contact</li>
        <li className="text-black font-bold ">Blogs</li>
      </ul>

      <span className="buttons flex gap-2">
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
    </nav>
  );
}

export default Header;
