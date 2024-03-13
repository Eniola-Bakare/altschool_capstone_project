import Button from "./Button";
import LogoText from "./LogoText";

function Header() {
  return (
    <header className="w-full bg-white flex justify-between items-center py-4 px-20">
      <LogoText />
      <ul className="navLinks flex gap-4">
        <li className="text-black font-bold ">Home</li>
        <li className="text-black font-bold ">About us</li>
        <li className="text-black font-bold ">Contact</li>
        <li className="text-black font-bold ">Blogs</li>
      </ul>

      <span className="buttons flex gap-2">
        <Button
          name="Log in"
          type="secondary"
          onClick={() => console.log("first")}
        />
        <Button
          name="Sign up"
          type="primary"
          onClick={() => console.log("second")}
        />
      </span>
    </header>
  );
}

export default Header;
