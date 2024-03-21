import { Link } from "react-router-dom";

function LoginSignUpTab() {
  return (
    <section className="authTab flex w-full px-4 lg:px-0 lg:w-[50%] justify-between">
      <p className="font-bold  text-xl md:text-base border-b-2 border-grey pb-2 lg:pb-6 w-[50%] hover:border-blue hover:border-b-4 ">
        <Link to="/signup">REGISTER</Link>
      </p>
      <p className="font-bold text-xl md:text-base  border-b-2 border-grey hover:border-blue hover:border-b-4 pb-2 lg:pb-6 w-[50%] text-right ">
        <Link to="/signin">LOG IN</Link>
      </p>
    </section>
  );
}

export default LoginSignUpTab;
