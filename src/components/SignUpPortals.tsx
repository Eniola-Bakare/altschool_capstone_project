import {
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  onAuthStateChanged,
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
        const { displayName, photoURL: photoUrl, tenantId, uid, email } = user;
        const names = displayName?.split(" ") || [];
        const fName = names[0] || "";
        const lName = names[1].toLocaleUpperCase() || "";

        const newUser = {
          displayName,
          photoURL: photoUrl,
          likedItems: [],
          tenantId,
          fName,
          lName,
          email,
          category: "Reader",
          uid,
        };
        setCurrentUser({ ...newUser, userDocRef: user?.id });
        navigate(`/app/feed/:${user.uid}`);

        // to add a firestore data for the user(i'll have to make it dependent on no one existing before)
        const userRef = collection(db, "users");
        addDoc(userRef, { ...newUser })
          .then((res) => {
            console.log(res, "user created successfully");
            console.log(res.id);
            getDoc(doc(db, "users", res.id))
              .then((resp) => {
                console.log("in this block now", resp);
                setCurrentUser({ ...newUser, userDocRef: res.id });
              })
              .catch((err) => console.log("now, this errorr", err));
          })
          .catch((err) => {
            console.log(err, "unsuccessfulll");
          });
        return newUser;

      //   // this should be the correct, once you have read access
      //   // getDocs(query(collection(db, "users"), where("uid", "==", user?.uid)))
      //   //   .then((resp) =>
      //   //     resp.forEach((currentUser) => {
      //   //       console.log(resp.docs.length);
      //   //       console.log(user);
      //   //       console.log("current user");

      //   //       const likedItems = currentUser.data()?.likedItems;
      //   //       const {
      //   //         displayName,
      //   //         photoURL: photoUrl,
      //   //         tenantId,
      //   //         uid,
      //   //         email,
      //   //       } = user;
      //   //       const names = displayName?.split(" ") || [];
      //   //       const fName = names[0] || "";
      //   //       const lName = names[1].toLocaleUpperCase() || "";

      //   //       const newUser = {
      //   //         displayName,
      //   //         photoURL: currentUser.data().photoURL || photoUrl,
      //   //         likedItems: likedItems,
      //   //         tenantId,
      //   //         fName,
      //   //         lName,
      //   //         email,
      //   //         category: "Reader",
      //   //         uid,
      //   //       };
      //   //       console.log(currentUser.data());
      //   //       console.log(likedItems);

      //   //       if (resp.docs.length > 0) {
      //   //         return addDoc(userRef, { ...newUser })
      //   //           .then((res) => {
      //   //             console.log(res, "user created successfully");
      //   //             console.log(res.id);
      //   //             getDoc(doc(db, "users", res.id))
      //   //               .then((resp) => {
      //   //                 console.log("in this block now", resp);
      //   //                 setCurrentUser({ ...newUser, userDocRef: res.id });
      //   //               })
      //   //               .catch((err) => console.log("now, this errorr", err));
      //   //           })
      //   //           .catch((err) => {
      //   //             console.log(err, "unsuccessfulll");
      //   //           });
      //   //       } else {
      //   //         setCurrentUser({ ...newUser, userDocRef: currentUser.id });
      //   //       }

      //   //       return navigate(`/app/feed/:${user?.uid}`);
      //   //     })
      //   //   )
      //   //   .catch((err) => console.log(err));
      }
    });
    return () => {
      listen();
    };
  }, [setCurrentUser, currentUser, navigate]);

  function handleGoogleSDK() {
    const provider = new GoogleAuthProvider();
    console.log("im up and running");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("entered here");
        console.log(result.user);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        console.log(error.code);
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
