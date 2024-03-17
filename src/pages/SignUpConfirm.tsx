import { useNavigate } from "react-router-dom";
import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../components/contexts/AuthContext";
import { auth, db, storageRef } from "../firebase/config";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import swal from "sweetalert";
import { CreateNewUseronDB } from "../firebase/fireStoreActions";
import { set } from "firebase/database";
import { getDownloadURL, ref } from "firebase/storage";

function SignUpConfirm() {
  const {
    email,
    password,
    oTP,
    authUser,
    setAuthUser,
    newUser,
    fName,
    lName,
    category,
    setCurrentUser,
  } = useAuthContext();
  const navigate = useNavigate();

  const [oTP1, setOTP1] = useState("");
  const [oTP2, setOTP2] = useState("");
  const [oTP3, setOTP3] = useState("");
  const [oTP4, setOTP4] = useState("");
  const [otpLocal, setOtpLocal] = useState<number[]>([]);
  const [otpError, setOtpError] = useState<boolean>(false);
  console.log(oTP);
  console.log(otpLocal);

  const userRef = collection(db, "users");
  
  async function newUserFunc(user) {
    const profileURL = await getDownloadURL(
      ref(storageRef, "users/profileImages/profileImage.jpg")
    )
      .then((downloadURL) => {
        return downloadURL;
      })
      .catch((error) => console.log(error));
    // creates a new user first,
    // then adds new user to firestore db - collection (users)
    const { displayName, tenantId, uid } = user;
    const newUser = {
      displayName,
      photoURL: profileURL,
      tenantId,
      fName,
      lName,
      email,
      category,
      uid,
      otp: otpLocal.join(""),
    };
    // eebakare@gmail.com
    // ebakare343@stu.ui.edu.org
    addDoc(userRef, { ...newUser })
      .then((res) => {
        console.log(res, "user created successfully");
        console.log(res.id);
        navigate(`/app/feed/:${newUser.uid}`);
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
  }
  useEffect(() => {
    setOtpLocal(oTP);
  }, []);

  function handleConfirm(e: React.FormEvent<HTMLElement>): void {
    e.preventDefault();
    console.log(otpLocal);
    if (otpLocal.join("") == [oTP1, oTP2, oTP3, oTP4].join("")) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials.user);
          // setAuthUser(userCredentials.user);
          // navigate(`/app/feed/:${userCredentials.user.uid}`);
          newUserFunc(userCredentials.user);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log(error.code);
          } else {
            console.log(error);
            console.log("what error?");
          }
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        });
    } else {
      setOtpError(true);
    }
  }

  const handleBack: MouseEventHandler<HTMLParagraphElement> = () => {
    navigate("/signUp");
  };

  function handleEachOTP(
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) {
    const newVal = e.target.value.slice(0, 1);
    setValue(newVal);
  }
  return (
    <section className="flex justify-between w-full items-center relative">
      <AuthSidebar />
      <aside className="signin-side w-[70%] flex flex-col justify-between items-center gap-5 ">
        <div
          className="back-arrow absolute top-10 left-[35%] flex items-center gap-3 cursor-pointer"
          onClick={handleBack}
        >
          <img src="./src/assets/arrowcircleleft.png" alt="arrow circle" />
          <p className="text-[#55524F] text-sm">Back</p>
        </div>

        <h1 className="text-4xl font-medium ">Enter confirmation code</h1>
        <p
          className={
            otpError ? "text-danger font-bold text-lg" : "text-[#626262]"
          }
        >
          {otpError
            ? "Invalid otp"
            : " We emailed you a code. Please input the code here for account          verification"}
        </p>
        <form
          onSubmit={handleConfirm}
          className="form-welcome flex flex-col justify-center w-[50%] gap-3"
        >
          <div className="name-fields flex gap-10 justify-center items-center my-10">
            <input
              type="number"
              maxLength={1}
              value={oTP1}
              onChange={(e) => handleEachOTP(e, setOTP1)}
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
            <input
              type="number"
              maxLength={1}
              value={oTP2}
              onChange={(e) => handleEachOTP(e, setOTP2)}
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
            <input
              type="number"
              maxLength={1}
              value={oTP3}
              onChange={(e) => handleEachOTP(e, setOTP3)}
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
            <input
              type="number"
              maxLength={1}
              value={oTP4}
              onChange={(e) => {
                handleEachOTP(e, setOTP4);
              }}
              className="h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue"
            />
          </div>

          <Button type="primary" name="Create account" width="w-full" />
        </form>
      </aside>
    </section>
  );
}

export default SignUpConfirm;
