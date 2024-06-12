import {
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
  getAuth,
  linkWithPopup,
} from "firebase/auth";

import { auth, db } from "../firebase/config";
import { useAuthContext } from "./contexts/AuthContext";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./actions/LocalStorage";

function SignUpPortals() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuthContext();
  const { setUserLocalStorage } = useLocalStorage("currentUser");

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      if (user) {
        // console.log(user);
        const userRef = collection(db, "users");

        const { displayName, photoURL: photoUrl, tenantId, uid, email } = user;
        const names = displayName?.split(" ") || [];
        const fName = names[0] || "";
        const lName = names[1]?.toLowerCase() || "";

        const newUser = {
          displayName,
          photoURL: photoUrl,
          tenantId,
          email,
          uid,
        };

        //   // this should be the correct, once you have read access
        getDocs(query(collection(db, "users"), where("uid", "==", user?.uid)))
          .then((resp) => {
            if (resp.docs.length === 0) {
              return addDoc(userRef, {
                ...newUser,
                category: "Reader",
                likedItems: [],
                fName,
                lName,
                bookmarkedItems: [],
              })
                .then((res) => {
                  // res is the user document id that was just created
                  getDoc(doc(db, "users", res.id))
                    .then(() => {
                      const currentUser = {
                        ...newUser,
                        userDocRef: res.id,
                      };
                      setCurrentUser({ ...currentUser });
                      setUserLocalStorage({ ...currentUser });
                    })
                    .catch((err) => console.log("now, this errorr", err));
                })
                .catch((err) => {
                  console.log(err, "unsuccessfulll");
                });
            } else {
              const oldUser = resp.docs[0].data();
              const oldUserId = resp.docs[0].id;
              console.log(oldUser);
              const {
                fName,
                category,
                lName,
                likedItems,
                photoURL,
                email,
                bookmarkedItems,
                uid,
                displayName,
                tenantId,
              } = oldUser;

              const currentUser = { ...oldUser, userDocRef: oldUserId };
              console.log(currentUser);
              setCurrentUser({ ...currentUser });
              setUserLocalStorage({ ...currentUser });
            }
          })
          .catch((err) => console.log(err));
      }
      navigate(`/app/feed/:${user?.uid}`);
    });
    return () => {
      listen();
    };
  }, [setCurrentUser, currentUser, navigate]);

  function handleGoogleSDK() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credential);
        // const token = credential?.accessToken;
        const user = result.user;
        return user;
      })
      .then((user) => {
        if (
          user.providerData[0]?.providerId == "twitter.com" ||
          user.providerData[2]?.providerId == "twitter.com" ||
          user.providerData[1]?.providerId == "twitter.com"
        )
          return;
        // Prompt to link with Twitter
        const twitterProvider = new TwitterAuthProvider();
        linkWithPopup(user, twitterProvider)
          .then((result) => {
            // console.log(user);
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const linkedUser = result.user;
            // console.log("Account linked with Twitter!");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;

        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function handleTwitter() {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        // IdP data available using getAdditionalUserInfo(result)
        const user = result.user;
        // console.log(user);
        return user;
      })
      .then((user) => {
        // Prompt to link with Twitter
        if (user.emailVerified) return;
        const googleProvider = new GoogleAuthProvider();
        linkWithPopup(user, googleProvider)
          .then((result) => {
            // console.log(user);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const linkedUser = result.user;
            // console.log("Account linked with Google!!!!!!!");
            console.log(linkedUser);
            return linkedUser;
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
      });
  }

  return (
    <div className="w-full flex flex-col items-center gap-5 ">
      <div
        className="google-auth flex w-full md:w-[85%] lg:w-[50%]  justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA] cursor-pointer"
        onClick={handleGoogleSDK}
      >
        <img src="/google.png" alt="google logo" />
        <p>Sign in with Google</p>
      </div>
      <div
        className="linked-auth flex w-full md:w-[85%] lg:w-[50%] justify-center items-center gap-11 rounded-lg py-2 px-4 shadow-md border border-[#CED4DA] cursor-pointer"
        onClick={handleTwitter}
      >
        <img src="/twitterLogo.avif" alt="twitter logo" className="w-[6%]" />
        <p>Sign in with Twitter</p>
      </div>
    </div>
  );
}

export default SignUpPortals;
