import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";
import LoginSignUpTab from "../components/LoginSignUpTab";
import { useAuthContext } from "../components/contexts/AuthContext";
import { auth } from "../components/firebase/config";

function SignUpPage() {
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
  } = useAuthContext();

  function handleSignUp(e: React.FormEvent<HTMLElement>): void {
    e.preventDefault();
    console.log(email, password, fName, lName, category, confirmPassword);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => console.log(userCredentials.user))
      .catch((error) => console.log(error.code));
  }

  return (
    <section className="flex w-full items-center justify-between">
      <AuthSidebar />

      <aside className="signin-side w-[70%] flex flex-col justify-center items-center gap-6">
        <LoginSignUpTab />

        <h1 className="text-4xl font-medium ">Register as a Writer/Reader</h1>
        <form
          onSubmit={handleSignUp}
          className="form-welcome flex flex-col justify-center w-[50%] gap-3"
        >
          <div className="name-fields flex gap-3">
            <div className="first-name flex flex-col gap-3 w-[50%]">
              <label htmlFor="fName" className="text-[#3B3B3B]">
                First name
              </label>
              <input
                type="text"
                id="fName"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                placeholder="e.g: John"
                className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg hover:shadow-xl focus:outline-blue"
              />
            </div>
            <div className="last-name flex flex-col gap-3 w-[50%]">
              <label htmlFor="lName" className="text-[#3B3B3B]">
                Last name
              </label>
              <input
                type="text"
                id="lName"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                placeholder="e.g: Doe"
                className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg hover:shadow-xl focus:outline-blue"
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
                <option value="writer">Writer</option>
                <option value="reader">Reader</option>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g: Johndoe@gmail.com"
              className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg hover:shadow-xl focus:outline-blue"
            />
          </div>
          <div className="password-field flex flex-col gap-3 relative">
            <label htmlFor="password" className="text-[#3B3B3B]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min 8 characters of alphanumerics"
              className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg hover:shadow-xl focus:outline-blue"
            />
            <img
              src="./src/assets/eyeIcon.png"
              alt="eye icon"
              className="w-[5%] absolute inset-y-[50%] right-5 "
            />
          </div>
          <div className="confirm-password-field flex flex-col gap-3 relative">
            <label htmlFor="confirmPassword" className="text-[#3B3B3B]">
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

          <Button type="primary" name="Create account" width="w-full" />
        </form>

        <div className="google-auth flex w-[50%] justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA]">
          <img src="./src/assets/google.png" alt="google logo" />
          <p>Sign up with Google</p>
        </div>
        <div className="linked-auth flex w-[50%] justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA]">
          <img src="./src/assets/linkedin.png" alt="google logo" />
          <p>Sign up with Linkedin</p>
        </div>
      </aside>
    </section>
  );
}

export default SignUpPage;
