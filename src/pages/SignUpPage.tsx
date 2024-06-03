import { fetchSignInMethodsForEmail } from "firebase/auth";
import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";
import LoginSignUpTab from "../components/LoginSignUpTab";
import { useAuthContext } from "../components/contexts/AuthContext";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import SignUpPortals from "../components/SignUpPortals";

function SignUpPage() {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const navigate = useNavigate();
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const [fNameError, setfNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  const {
    email,
    setEmail,
    password,
    setPassword,
    fName,
    setFName,
    lName,
    setLName,
    category,
    setCategory,
    confirmPassword,
    setConfirmPassword,
    errorMessageSignUp,
    setErrorMessageSignUp,
    oTP,
    generateOTP,
  } = useAuthContext();

  useEffect(() => {
    generateOTP();
    console.log(oTP);
  }, []);
  // console.log(oTP);

  function handleSignUp(e: React.FormEvent<HTMLElement>): void {
    e.preventDefault();

    if (fName.trim().length < 3) {
      setfNameError("At least 3 characters");
    } else {
      setfNameError("");
    }
    if (lName.trim().length < 3) {
      setLNameError("At least 3 characters");
    } else {
      setLNameError("");
    }
    if (password.length < 6) {
      setconfirmPasswordError("Password must be at least than 6 characters");
      return;
    } else if (!passwordPattern.test(password)) {
      setconfirmPasswordError("Pastword must match given pattern");
    } else if (confirmPassword === password) {
      setconfirmPasswordError("");

      fetchSignInMethodsForEmail(auth, email)
        .then((SignInMethod) => {
          if (SignInMethod && SignInMethod.length > 0) {
            console.log("user exist");
            setErrorMessageSignUp(true);
            setTimeout(() => {
              navigate("/signin");
            }, 3000);
          } else {
            setErrorMessageSignUp(false);
            emailjs
              .sendForm(
                "service_y2gkibt",
                "template_ojzoraj",
                e.target as HTMLFormElement,
                "3B4VcurV0Wevkm-hy"
              )
              .then(() => {
                navigate("/confirmation");
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));

      console.log("entered herre");
    } else {
      console.log("well");
      setconfirmPasswordError("Passwords do not match");
      return;
    }
  }

  return (
    <section className="flex flex-col md:flex-row w-full items-center justify-between ">
      <AuthSidebar />

      <aside className="signin-side w-full px-4 lg:px-0 py-6 md:py-0 flex flex-col justify-center items-center gap-6 ">
        <LoginSignUpTab />

        <h1 className="text-2xl lg:text-3xl font-medium ">
          Register as a Writer/Reader
        </h1>
        {errorMessageSignUp && (
          <h1 className="text-xl font-bold text-center text-danger ">
            User already exist, login instead
          </h1>
        )}
        <form
          onSubmit={handleSignUp}
          className="form-welcome flex flex-col justify-center w-full md:w-[85%] lg:w-[50%] gap-3"
        >
          <div className="name-fields flex flex-col md:flex-row gap-3">
            <div className="first-name flex flex-col gap-3 md:w-[50%]">
              <label
                htmlFor="fName"
                className={`${fNameError ? "text-danger" : "text-[#3B3B3B]"}`}
              >
                {fNameError || " Last name"}
              </label>
              <input
                type="text"
                id="fName"
                name="name"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                placeholder="e.g: John"
                className={`h-[56px] py-[10px] px-[16px] border ${
                  fNameError === "At least 3 characters"
                    ? "border-danger"
                    : "borde-[#CED4DA]"
                } shadow-md rounded-lg hover:shadow-xl focus:outline-blue`}
              />
            </div>
            <div className="last-name flex flex-col gap-3 md:w-[50%]">
              <label
                htmlFor="lName"
                className={`${lNameError ? "text-danger" : "text-[#3B3B3B]"}`}
              >
                {lNameError || " Last name"}
              </label>
              <input
                type="text"
                id="lName"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                placeholder="e.g: Doe"
                className={`h-[56px] py-[10px] px-[16px] border ${
                  lNameError === "At least 3 characters"
                    ? "border-danger"
                    : "borde-[#CED4DA]"
                } shadow-md rounded-lg hover:shadow-xl focus:outline-blue`}
              />
            </div>
          </div>
          <div className="title-field flex flex-col gap-3">
            <label htmlFor="title" className="text-[#3B3B3B]">
              You are joining as?
            </label>
            <div className="title-select h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex items-center justify-center ">
              <select
                name="title"
                id="title"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full focus:outline-0 active:outline-0 "
              >
                <option value="Writer">Writer</option>
                <option value="Reader">Reader</option>
              </select>
            </div>
          </div>
          <div className="email-field flex flex-col gap-3">
            <label htmlFor="email" className="text-[#3B3B3B]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g: Johndoe@gmail.com"
              className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg hover:shadow-xl focus:outline-blue"
            />
          </div>
          <div className="password-field flex flex-col gap-3 relative">
            <label
              htmlFor="password"
              className={`${
                confirmPasswordError.length > 0
                  ? "text-danger"
                  : " text-[#3B3B3B]"
              }`}
            >
              {confirmPasswordError || "Password"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="at least 6 with one of A-Z-a-z1-0-"
              className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg hover:shadow-xl focus:outline-blue"
            />
            <img
              src="./src/assets/eyeIcon.png"
              alt="eye icon"
              className="w-[5%] absolute inset-y-[50%] right-5 "
            />
          </div>
          <div className="confirm-password-field flex flex-col gap-3 relative">
            <label
              htmlFor="confirmPassword"
              className={`${
                confirmPasswordError ? "text-danger" : " text-[#3B3B3B]"
              }`}
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="must match with the password"
              className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg hover:shadow-xl focus:outline-blue"
            />
            <img
              src="./src/assets/eyeClosed.png"
              alt="eye icon"
              className="w-[5%] absolute inset-y-[50%] right-5 "
            />
          </div>
          <input type="hidden" name="otp" value={oTP.join("")} />

          <Button type="primary" name="Create account" width="w-full" />
        </form>

        <SignUpPortals />
      </aside>
    </section>
  );
}

export default SignUpPage;
