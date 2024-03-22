import React, { useEffect } from "react";
import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";
import LoginSignUpTab from "../components/LoginSignUpTab";
import { useAuthContext } from "../components/contexts/AuthContext";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignUpPortals from "../components/SignUpPortals";
import { collection, getDocs, query, where } from "firebase/firestore";

function SignInPage() {
  const navigate = useNavigate();
  const {
    email,
    password,
    setEmail,
    fName,
    lName,
    category,
    setPassword,
    authUser,
    setCurrentUser,
    errorMessageSignIn,
    setErrorMessageSignIn,
    currentUser,
  } = useAuthContext();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      if (user) {
        console.log(user);
        getDocs(query(collection(db, "users"), where("uid", "==", user.uid)))
          .then((resp) =>
            resp.forEach((currentUser) => {
              // console.log(user);
              console.log("current user");
              const likedItems = currentUser.data()?.likedItems;
              const { displayName, photoURL: photoUrl, tenantId, uid } = user;
              const newUser = {
                displayName,
                photoURL: currentUser.data().photoURL || photoUrl,
                likedItems: likedItems,
                tenantId,
                fName,
                lName,
                email,
                category,
                uid,
              };
              console.log(currentUser.data());
              console.log(likedItems);
              setCurrentUser({ ...newUser, userDocRef: currentUser.id });
            })
          )
          .catch((err) => console.log(err));

        navigate(`/app/feed/:${user.uid}`);
      }
    });
    return () => {
      listen();
    };
  }, [authUser, setCurrentUser, currentUser, navigate]);
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setErrorMessageSignIn("");
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/user-not-found") {
          setErrorMessageSignIn("User not found");
          setTimeout(() => {
            navigate("/signup");
          }, 2000);
        }
      });
  };
  return (
    <section className="flex flex-col md:flex-row w-full items-center justify-between">
      <AuthSidebar />

      <aside className="signin-side w-full px-4 py-10 lg:py-0 lg:px-0 flex flex-col justify-center items-center gap-14">
        <LoginSignUpTab />

        <h1 className="text-4xl font-medium ">Welcome back</h1>
        <form
          onSubmit={handleSignIn}
          className="form-welcome w-full flex flex-col lg:px-0 justify-center lg:w-[50%] gap-6"
        >
          <div className="email-field  flex flex-col gap-3">
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
          {errorMessageSignIn.trim() && (
            <h1 className="text-xl font-bold text-center text-danger ">
              {errorMessageSignIn}
            </h1>
          )}
        </form>

        <SignUpPortals />
      </aside>
    </section>
  );
}

export default SignInPage;
