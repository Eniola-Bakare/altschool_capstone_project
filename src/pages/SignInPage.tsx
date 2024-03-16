import React, { useEffect, useState } from "react";
import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";
import LoginSignUpTab from "../components/LoginSignUpTab";
import { useAuthContext } from "../components/contexts/AuthContext";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignUpPortals from "../components/SignUpPortals";

function SignInPage() {
  const navigate = useNavigate();
  const {
    email,
    password,
    setEmail,
    setPassword,
    authUser,
    setCurrentUser,
    errorMessageSignIn,
    setErrorMessageSignIn,
  } = useAuthContext();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(typeof user);
        console.log(user)
        setCurrentUser(user);
        navigate(`/app/feed/:${user.uid}`);
      } else {
        console.log("user signed out");
      }
    });
    return () => {
      listen();
    };
  }, [authUser, setCurrentUser, navigate]);
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setErrorMessageSignIn(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessageSignIn(true);
      });
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
              className={`h-[56px] py-[10px] px-[16px] border ${
                errorMessageSignIn
                  ? "border-danger outline-danger"
                  : "outline-[#CED4DA] border-[#CED4DA"
              } shadow-md rounded-lg`}
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
              className={`h-[56px] py-[10px] px-[16px] border ${
                errorMessageSignIn
                  ? "border-danger outline-danger"
                  : "outline-[#CED4DA] border-[#CED4DA"
              } shadow-md rounded-lg`}
            />
            <img
              src="eyeIcon.png"
              alt="eye icon"
              className="w-[5%] absolute inset-y-[50%] right-5 "
            />
          </div>

          <Button type="primary" name="Log in" width="w-full" />
          {errorMessageSignIn && (
            <h1 className="text-xl font-bold text-center text-danger ">
              Invalid credentials, please try again
            </h1>
          )}
        </form>

        <SignUpPortals />
      </aside>
    </section>
  );
}

export default SignInPage;
