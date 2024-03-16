import {
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase/config";

function SignUpPortals() {
  function handleGoogleSDK() {
    const provider = new GoogleAuthProvider();
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

  function handleFBSDK() {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(" heree");

        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        // IdP data available using getAdditionalUserInfo(result)
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("or heree");
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);

        // ...
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
      <div
        className="linked-auth flex w-[50%] justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA] cursor-pointer"
        onClick={handleFBSDK}
      >
        <img
          src="./src/assets/twitterLogo.avif"
          alt="twitter logo"
          className="w-[6%]"
        />
        <p>Sign in with Twitter</p>
      </div>
    </div>
  );
}

export default SignUpPortals;
