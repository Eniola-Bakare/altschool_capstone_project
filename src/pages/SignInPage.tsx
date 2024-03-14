import React from "react";
import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";
import LoginSignUpTab from "../components/LoginSignUpTab";
import { useAuthContext } from "../components/contexts/AuthContext";
import { auth } from "../components/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignInPage() {
  const { email, password, setEmail, setPassword } = useAuthContext();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => console.log(error.message));
    // console.log(email, password);
  };
  return (
    <section className="flex w-full items-center justify-between">
      <AuthSidebar />

      <aside className="signin-side w-[70%] flex flex-col justify-center items-center gap-14">
        <LoginSignUpTab />

        <h1 className="text-4xl font-medium ">Welcome back</h1>
        <form
          onSubmit={handleSignIn}
          className="form-welcome flex flex-col justify-center w-[50%] gap-6"
        >
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
              className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg"
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
              placeholder="e.g: Johndoe@gmail.com"
              className="h-[56px] py-[10px] px-[16px] border borde-[#CED4DA] shadow-md rounded-lg"
            />
            <img
              src="./src/assets/eyeIcon.png"
              alt="eye icon"
              className="w-[5%] absolute inset-y-[50%] right-5 "
            />
          </div>

          <Button type="primary" name="Log in" width="w-full" />
        </form>
      </aside>
    </section>
  );
}

export default SignInPage;
