import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import Button from "./Button";
import { useAuthContext } from "./contexts/AuthContext";
import { db, storageRef } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
function PublishScreen({ closePublish }) {
    const { currentUser } = useAuthContext();
    const [screenTwo, setScreenTwo] = useState(false);
    const [screenOne, setScreenOne] = useState(true);
    const [screenThree, setScreenThree] = useState(false);
    const fileInputRef = useRef(null);
    const fileInputRefImg = useRef(null);
    const [attachment, setAttachment] = useState(null);
    const [imgUrl, setimgUrl] = useState("");
    const [vidUrl, setvidUrl] = useState("");
    const [postText, setPostText] = useState("");
    const handleNewPost = () => {
        console.log(currentUser);
        console.log(attachment);
        if (postText.trim() && attachment && currentUser) {
            const userIDRef = currentUser;
            const userID = userIDRef.userDocRef;
            const userRef = collection(db, "users", userID, "posts");
            console.log(attachment);
            const newPost = { attachment, postText, likes: 0, bookmark: false };
            console.log(attachment);
            // for attachment uploads first, then we can attach the file's url to the newPost details
            const randomFileName = [];
            for (let i = 0; i < 6; i++) {
                randomFileName.push(Math.floor(Math.random() * 10));
            }
            const usersPostImages = ref(storageRef, `users/postImages/${attachment.name + randomFileName.join("")}`);
            uploadBytes(usersPostImages, attachment)
                .then((snapshot) => {
                console.log("uploade !", snapshot);
                return getDownloadURL(usersPostImages);
            })
                .then((downloadURL) => {
                return addDoc(userRef, {
                    ...newPost,
                    attachment: downloadURL,
                    datePublished: serverTimestamp(),
                });
            })
                .then(() => {
                closePublish();
            })
                .catch((err) => console.log("error adding doc", err));
        }
    };
    // const openScreenOne = (e: React.MouseEvent<HTMLElement>) => {
    //   // e.stopPropagation();
    //   setScreenOne(true);
    //   setScreenTwo(false);
    //   setScreenThree(false);
    // };
    const openFileInputImg = () => {
        console.log("here now");
        if (fileInputRefImg.current) {
            fileInputRefImg.current.click();
            setScreenOne(false);
        }
    };
    const openFileInputVid = () => {
        console.log("here now");
        if (fileInputRef.current) {
            fileInputRef.current.click();
            setScreenOne(false);
        }
    };
    const handleChangeImg = (e) => {
        const attachment = e.target.files;
        if (attachment && attachment.length > 0) {
            setScreenTwo(false);
            setScreenThree(true);
            setAttachment(attachment[0]);
            setimgUrl(URL.createObjectURL(attachment[0]));
        }
    };
    const handleChangeVid = (e) => {
        const attachment = e.target.files;
        if (attachment && attachment.length > 0) {
            console.log(attachment);
            setScreenTwo(false);
            setScreenThree(true);
            setAttachment(attachment[0]);
            setvidUrl(URL.createObjectURL(attachment[0]));
        }
    };
    return (_jsxs("section", { className: "w-[90%] h-[80%] border border-borderGrey rounded-lg flex flex-col py-14 px-16 gap-12 overflow-hidden", children: [_jsxs("div", { className: "publish-buttn-div self-end flex gap-6", children: [_jsxs("div", { className: "back-arrow top-10 flex items-center gap-3 cursor-pointer", onClick: closePublish, children: [_jsx("img", { src: "/arrowcircleleft.png", alt: "arrow circle" }), _jsx("p", { className: "text-[#55524F] text-sm", children: "Back" })] }), _jsx(Button, { type: "primary", name: "Publish", onClick: () => handleNewPost() })] }), _jsxs("div", { className: "input-div h-full flex items-center gap-2", children: [screenOne && (_jsxs("div", { className: `publish-screen-one w-full h-full flex flex-col items-start gap-5 hid  ${screenTwo ? "hidden" : "visible"}`, children: [_jsx("img", { src: "/publishIcon.png", alt: "plus icon", className: "cursor-pointer", onClick: () => setScreenTwo(true) }), _jsxs("div", { className: "input-Text flex flex-col gap-2", children: [_jsx("input", { type: "text", placeholder: "Title", className: "focus:outline-0 px-3 text-5xl font-semibold opacity-50" }), _jsx("input", { type: "text", placeholder: "Write a post...................", className: "focus:outline-0 px-3 text-3xl font-normal opacity-50" })] })] })), screenTwo && (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-[120px] close-div pr-3 border-r border-b-grey flex justify-center items-center ", children: _jsx("div", { className: "", children: _jsx("img", { src: "/closeIcon.png", alt: "close icon", className: "cursor-pointer", onClick: () => {
                                            setScreenOne(true);
                                            setScreenTwo(false);
                                        } }) }) }), _jsxs("div", { className: "attachment-icons flex pl-3 gap-3", children: [_jsx("img", { src: "/imgIcon.png", alt: "an image icon", className: "cursor-pointer", onClick: () => openFileInputImg() }), _jsx("img", { src: "/vidIcon.png", alt: "a video icon", className: "cursor-pointer", onClick: () => openFileInputVid() })] }), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", onChange: (e) => handleChangeVid(e), accept: "video/*" }), _jsx("input", { type: "file", ref: fileInputRefImg, className: "hidden", onChange: (e) => handleChangeImg(e), accept: "image/*" })] })), screenThree && (_jsxs("div", { className: "publish-screen-three w-full h-full flex flex-col items-start gap-5 ", children: [imgUrl && (_jsx("img", { src: imgUrl, alt: "an attached image", className: "w-[15%]" })), vidUrl && _jsx("video", { src: vidUrl, controls: true, className: "h-[35%]" }), _jsx("textarea", { placeholder: "Write a post......", value: postText, onChange: (e) => setPostText(e.target.value), className: "w-full h-full focus:outline-0 text-lg font-medium" })] }))] })] }));
}
export default PublishScreen;
