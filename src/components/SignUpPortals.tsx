import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../components/firebase/config";

const provider = new GoogleAuthProvider();
function SignUpPortals() {
  function handleGoogleSDK() {
    console.log("im up and running");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("entered here");
        console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        console.log("or heree");
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div
        className="google-auth flex w-[50%] justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA] cursor-pointer"
        onClick={handleGoogleSDK}
      >
        <img src="./src/assets/google.png" alt="google logo" />
        <p>Sign in with Google</p>
      </div>
      <div className="linked-auth flex w-[50%] justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA]">
        <img
          src="./src/assets/facebook.png"
          alt="facebook logo"
          className="w-[4%]"
        />
        <p>Sign in with Facebook</p>
      </div>
    </div>
  );
}

export default SignUpPortals;
