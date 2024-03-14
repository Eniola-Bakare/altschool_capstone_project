import { Link } from "react-router-dom";

function LoginSignUpTab() {
  return (
    <section className="authTab flex w-[50%] justify-between">
      <p className="font-bold border-b-2 border-grey pb-6 w-[50%] hover:border-blue hover:border-b-4 pl-2">
        <Link to="/signup">REGISTER</Link>
      </p>
      <p className="font-bold border-b-2 border-grey hover:border-blue hover:border-b-4 pb-6 w-[50%] text-right pr-2">
        <Link to="/signin">LOG IN</Link>
      </p>
    </section>
  );
}

export default LoginSignUpTab;
