import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "./Button";
import { useAuthContext } from "./contexts/AuthContext";
import { db, storageRef } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function PublishScreen() {
  const { currentUser, setNewPost, setScreenToShow } = useAuthContext();
  const [screenTwo, setScreenTwo] = useState(false);
  const [screenOne, setScreenOne] = useState(true);
  const [post, setPost] = useState(true);
  const [screenThree, setScreenThree] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefImg = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState(null);

  const [imgUrl, setimgUrl] = useState("");
  const [vidUrl, setvidUrl] = useState("");
  const [postText, setPostText] = useState("");

  useEffect(() => {
    const run = function () {
      if (postText.trim() && attachment && currentUser) {
        setPost(false);
      }
    };

    run();
  }, [attachment, currentUser, postText]);

  const handleNewPost = () => {
    if (postText && attachment && currentUser) {
      setPost(true);
      const userID = currentUser?.userDocRef;
      const postDB = collection(db, "posts");


      const keywords = postText.split(/[\W_]+/);
      const newPost = {
        attachment,
        postText,
        likes: 0,
        bookmark: false,
        userID,
        keywords,
      };
      console.log(attachment);

      // for attachment uploads first, then we can attach the file's url to the newPost details
      const randomFileName = [];
      for (let i = 0; i < 6; i++) {
        randomFileName.push(Math.floor(Math.random() * 10));
      }

      const usersPostImages = ref(
        storageRef,
        `users/postImages/${attachment.name + randomFileName.join("")}`
      );

      uploadBytes(usersPostImages, attachment)
        .then((snapshot) => {
          console.log("uploade !", snapshot);
          return getDownloadURL(usersPostImages);
        })
        .then((downloadURL) => {
          console.log({
            ...newPost,
            attachment: downloadURL,
            datePublished: serverTimestamp(),
          });

          return addDoc(postDB, {
            ...newPost,
            attachment: downloadURL,
            datePublished: serverTimestamp(),
          });
        })
        .then((docRef) => {
          const postRef = doc(db, "posts", docRef.id);
          const updates = { postID: docRef.id };
          return updateDoc(postRef, updates);
        })
        .then((ref) => {
          setNewPost(true);
          setScreenToShow("feed");
          setPost(false);
        })
        .catch((err) => console.log("error adding doc", err));
    }
  };

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

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const attachment = e.target.files;
    if (attachment && attachment.length > 0) {
      setScreenTwo(false);
      setScreenThree(true);
      setAttachment(attachment[0]);
      setimgUrl(URL.createObjectURL(attachment[0]));
    }
  };

  const handleChangeVid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const attachment = e.target.files;
    if (attachment && attachment.length > 0) {
      console.log(attachment);
      setScreenTwo(false);
      setScreenThree(true);
      setAttachment(attachment[0]);
      setvidUrl(URL.createObjectURL(attachment[0]));
    }
  };
  return (
    <section className="w-[80dvw] h-[90%] border border-borderGrey rounded-lg flex flex-col py-12 mx-1 px-16 gap-16 mt-5 overflow-hidden">
      <div className="publish-buttn-div w-full justify-end self-end flex gap-6">
        <div
          className="back-arrow top-10 flex items-center gap-3 cursor-pointer"
          onClick={() => setScreenToShow("feed")}
        >
          <img src="/arrowcircleleft.png" alt="arrow circle" />
          <p className="text-[#55524F] text-sm">Back</p>
        </div>
        <Button
          disabled={post}
          type="primary"
          name="Publish"
          onClick={() => handleNewPost()}
        />
      </div>

      <div className="input-div w-full flex items-center gap-2 ">
        {/* publish screen 1 */}

        {screenOne && (
          <div
            className={`publish-screen-one w-full h-full flex flex-col items-start gap-5 hid  ${
              screenTwo ? "hidden" : "visible"
            }`}
          >
            <img
              src="/publishIcon.png"
              alt="plus icon"
              className="cursor-pointer"
              onClick={() => setScreenTwo(true)}
            />

            <div className="input-Text w-full flex flex-col gap-2">
              <ReactQuill
                className="text-editor"
                theme="snow"
                placeholder="Write a post"
                value={postText}
                onChange={setPostText}
              />
            </div>
          </div>
        )}

        {/* publish screen 2 */}

        {screenTwo && (
          <>
            <div className="h-[120px] close-div pr-3 border-r border-b-grey flex justify-center items-center ">
              <div className="">
                <img
                  src="/closeIcon.png"
                  alt="close icon"
                  className="cursor-pointer"
                  onClick={() => {
                    setScreenOne(true);
                    setScreenTwo(false);
                  }}
                />
              </div>
            </div>
            <div className="attachment-icons flex pl-3 gap-3">
              <img
                src="/imgIcon.png"
                alt="an image icon"
                className="cursor-pointer"
                onClick={() => openFileInputImg()}
              />
              <img
                src="/vidIcon.png"
                alt="a video icon"
                className="cursor-pointer"
                onClick={() => openFileInputVid()}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleChangeVid(e)}
              accept="video/*"
            />
            <input
              type="file"
              ref={fileInputRefImg}
              className="hidden"
              onChange={(e) => handleChangeImg(e)}
              accept="image/*"
            />
          </>
        )}

        {/* publish screen three */}
        {screenThree && (
          <div className="publish-screen-three w-full h-full flex flex-col items-start gap-5 ">
            {imgUrl && (
              <img src={imgUrl} alt="an attached image" className="w-[15%] " />
            )}
            {vidUrl && <video src={vidUrl} controls className="h-[35%]" />}
            {/* <textarea
              placeholder="Write a post......"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full h-full focus:outline-0 text-lg font-medium"
            /> */}

            <ReactQuill
              className="text-editor"
              theme="snow"
              value={postText}
              onChange={setPostText}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default PublishScreen;
