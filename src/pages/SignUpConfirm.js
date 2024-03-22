import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import AuthSidebar from "../components/AuthSidebar";
import Button from "../components/Button";
import { useEffect, useState, } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../components/contexts/AuthContext";
import { auth, db, storageRef } from "../firebase/config";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
function SignUpConfirm() {
    const { email, password, oTP, authUser, setAuthUser, newUser, fName, lName, category, setCurrentUser, } = useAuthContext();
    const navigate = useNavigate();
    const [oTP1, setOTP1] = useState("");
    const [oTP2, setOTP2] = useState("");
    const [oTP3, setOTP3] = useState("");
    const [oTP4, setOTP4] = useState("");
    const [otpLocal, setOtpLocal] = useState([]);
    const [otpError, setOtpError] = useState(false);
    console.log(oTP);
    console.log(otpLocal);
    const userRef = collection(db, "users");
    async function newUserFunc(user) {
        const profileURL = await getDownloadURL(ref(storageRef, "users/profileImages/profileImage.jpg"))
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
            likedItems: [],
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
    function handleConfirm(e) {
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
                }
                else {
                    console.log(error);
                    console.log("what error?");
                }
                setTimeout(() => {
                    navigate("/signin");
                }, 2000);
            });
        }
        else {
            setOtpError(true);
        }
    }
    const handleBack = () => {
        navigate("/signUp");
    };
    function handleEachOTP(e, setValue) {
        const newVal = e.target.value.slice(0, 1);
        setValue(newVal);
    }
    return (_jsxs("section", { className: "flex justify-between w-full items-center relative", children: [_jsx(AuthSidebar, {}), _jsxs("aside", { className: "signin-side w-[70%] flex flex-col justify-between items-center gap-5 ", children: [_jsxs("div", { className: "back-arrow absolute top-10 left-[35%] flex items-center gap-3 cursor-pointer", onClick: handleBack, children: [_jsx("img", { src: "./src/assets/arrowcircleleft.png", alt: "arrow circle" }), _jsx("p", { className: "text-[#55524F] text-sm", children: "Back" })] }), _jsx("h1", { className: "text-4xl font-medium ", children: "Enter confirmation code" }), _jsx("p", { className: otpError ? "text-danger font-bold text-lg" : "text-[#626262]", children: otpError
                            ? "Invalid otp"
                            : " We emailed you a code. Please input the code here for account          verification" }), _jsxs("form", { onSubmit: handleConfirm, className: "form-welcome flex flex-col justify-center w-[50%] gap-3", children: [_jsxs("div", { className: "name-fields flex gap-10 justify-center items-center my-10", children: [_jsx("input", { type: "number", maxLength: 1, value: oTP1, onChange: (e) => handleEachOTP(e, setOTP1), className: "h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue" }), _jsx("input", { type: "number", maxLength: 1, value: oTP2, onChange: (e) => handleEachOTP(e, setOTP2), className: "h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue" }), _jsx("input", { type: "number", maxLength: 1, value: oTP3, onChange: (e) => handleEachOTP(e, setOTP3), className: "h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue" }), _jsx("input", { type: "number", maxLength: 1, value: oTP4, onChange: (e) => {
                                            handleEachOTP(e, setOTP4);
                                        }, className: "h-[80px] w-[106px] py-[10px] pr-[12px] pl-[16px] border borde-[#CED4DA] shadow-md rounded-lg flex justify-center items-center text-center font-bold text-3xl hover:shadow-xl focus:outline-blue" })] }), _jsx(Button, { type: "primary", name: "Create account", width: "w-full" })] })] })] }));
}
export default SignUpConfirm;
