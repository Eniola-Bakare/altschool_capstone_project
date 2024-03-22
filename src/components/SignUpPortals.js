import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, } from "firebase/auth";
import { auth } from "../firebase/config";
function SignUpPortals() {
    function handleGoogleSDK() {
        const provider = new GoogleAuthProvider();
        console.log("im up and running");
        signInWithPopup(auth, provider)
            .then((result) => {
            console.log("entered here");
            console.log(result);
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential?.accessToken;
            // const user = result.user;
        })
            .catch((error) => {
            console.log("or heree");
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // const email = error.customData.email;
            // const credential = GoogleAuthProvider.credentialFromError(error);
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
    return (_jsxs("div", { className: "w-full flex flex-col items-center gap-5 ", children: [_jsxs("div", { className: "google-auth flex w-full md:w-[85%] lg:w-[50%]  justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA] cursor-pointer", onClick: handleGoogleSDK, children: [_jsx("img", { src: "/google.png", alt: "google logo" }), _jsx("p", { children: "Sign in with Google" })] }), _jsxs("div", { className: "linked-auth flex w-full md:w-[85%] lg:w-[50%] justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA] cursor-pointer", onClick: handleFBSDK, children: [_jsx("img", { src: "/twitterLogo.avif", alt: "twitter logo", className: "w-[6%]" }), _jsx("p", { children: "Sign in with Twitter" })] })] }));
}
export default SignUpPortals;
