import {
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
  getAuth,
  EmailAuthProvider,
  linkWithCredential,
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

function SignUpPortals() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuthContext();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      if (user) {
        console.log(user);
        const userRef = collection(db, "users");

        //   // this should be the correct, once you have read access
        getDocs(query(collection(db, "users"), where("uid", "==", user?.uid)))
          .then((resp) => {
            console.log(resp);
            if (resp.docs.length === 0) {
              const credential = EmailAuthProvider.credential(
                window.prompt("Your email"),
                window.prompt("Your password")
              );

              linkWithCredential(auth.currentUser, credential).then(
                (usercred) => {
                  const user = usercred.user;
                  const {
                    displayName,
                    photoURL: photoUrl,
                    tenantId,
                    uid,
                    email,
                  } = user;
                  const newUser = {
                    displayName,
                    photoURL: photoUrl,
                    tenantId,
                    email,
                    uid,
                  };
                  const names = displayName?.split(" ") || [];
                  const fName = names[0] || "";
                  const lName = names[1].toLocaleUpperCase() || "";

                  return addDoc(userRef, {
                    ...newUser,
                    category: "Reader",
                    likedItems: [],
                    fName,
                    lName,
                  })
                    .then((res) => {
                      // res is the user document id that was just created
                      getDoc(doc(db, "users", res.id))
                        .then(() => {
                          setCurrentUser({ ...newUser, userDocRef: res.id });
                        })
                        .catch((err) => console.log("now, this errorr", err));
                    })
                    .catch((err) => {
                      console.log(err, "unsuccessfulll");
                    });
                }
              );
            } else {
              console.log("old user");

              const oldUser = resp.docs[0].data();
              const oldUserId = resp.docs[0].id;
              const {
                fName,
                category,
                lName,
                likedItems,
                otp,
                displayName,
                photoURL: photoUrl,
                tenantId,
                email,
                uid,
              } = oldUser;
              console.log(otp);

              const oldUserObj = {
                displayName,
                photoURL: photoUrl,
                tenantId,
                email,
                uid,
                category,
                likedItems,
                fName,
                lName,
              };
              setCurrentUser({ ...oldUserObj, userDocRef: oldUserId });
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
        console.log(result);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // const token = credential?.accessToken;
        // const user = result.user;
      })
      .catch((error) => {
        console.log(error);
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
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        // IdP data available using getAdditionalUserInfo(result)
        const user = result.user;
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

        // ...
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
        onClick={handleFBSDK}
      >
        <img src="/twitterLogo.avif" alt="twitter logo" className="w-[6%]" />
        <p>Sign in with Twitter</p>
      </div>
    </div>
  );
}

export default SignUpPortals;
