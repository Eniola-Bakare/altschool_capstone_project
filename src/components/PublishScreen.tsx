import { useRef, useState, ChangeEvent, useId } from "react";
import Button from "./Button";
import { useAuthContext } from "./contexts/AuthContext";
import { db, storageRef } from "../firebase/config";
import { addDoc, collection, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type PublishProps = {
  closePublish: () => void;
  // screenTwo: boolean;
  // setScreenTwo: (screenTwo: boolean) => void;
};

function PublishScreen({ closePublish }: PublishProps) {
  const { currentUser } = useAuthContext();
  const [screenTwo, setScreenTwo] = useState(false);
  const [screenOne, setScreenOne] = useState(true);
  const [screenThree, setScreenThree] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefImg = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState(null);

  const [imgUrl, setimgUrl] = useState("");
  const [vidUrl, setvidUrl] = useState("");
  const [postText, setPostText] = useState("");
  const handleNewPost = () => {
    console.log(currentUser);
    if (postText.trim() && attachment && currentUser) {
      const userID = currentUser?.userDocRef;
      const userRef = collection(db, "users", userID, "posts");
      const newPost = { attachment, postText, likes: 0, bookmark: false };

      // for attachment uploads first, then we can attach the file's url to the newPost details
      const randomFileName = [];
      for (let i = 0; i < 6; i++) {
        randomFileName.push(Math.floor(Math.random() * 10));
      }

      const usersPostImages = ref(
        storageRef,
        `users/postImages/${randomFileName}`
      );

      uploadBytes(usersPostImages, attachment)
        .then((snapshot) => {
          console.log("uploade !", snapshot);
          return getDownloadURL(usersPostImages);
        })
        .then((downloadURL) => {
          return addDoc(userRef, { ...newPost, attachment: downloadURL });
        })
        .then((docRef) => {
          console.log(docRef, "new postssssss created !!!!");
          closePublish();
        })
        .catch((err) => console.log("error adding doc", err));

      console.log("bbbbbb");
    }
  };

  const openScreenOne = (e: React.MouseEvent<HTMLElement>) => {
    // e.stopPropagation();
    setScreenOne(true);
    setScreenTwo(false);
    setScreenThree(false);
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
      setAttachment(attachment[0].name);
      setimgUrl(URL.createObjectURL(attachment[0]));
    }
  };

  const handleChangeVid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const attachment = e.target.files;
    if (attachment && attachment.length > 0) {
      console.log(attachment);
      setScreenTwo(false);
      setScreenThree(true);
      setAttachment(attachment[0].name);
      setvidUrl(URL.createObjectURL(attachment[0]));
    }
  };
  return (
    <section className="w-[90%] h-[80%] border border-borderGrey rounded-lg flex flex-col py-14 px-16 gap-12 overflow-hidden">
      <div className="publish-buttn-div self-end flex gap-6">
        <div
          className="back-arrow top-10 flex items-center gap-3 cursor-pointer"
          onClick={closePublish}
        >
          <img src="/arrowcircleleft.png" alt="arrow circle" />
          <p className="text-[#55524F] text-sm">Back</p>
        </div>
        <Button type="primary" name="Publish" onClick={() => handleNewPost()} />
      </div>

      <div className="input-div h-full flex items-center gap-2">
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

            <div className="input-Text flex flex-col gap-2">
              <input
                type="text"
                placeholder="Title"
                className="focus:outline-0 px-3 text-5xl font-semibold opacity-50"
              />
              <input
                type="text"
                placeholder="Write a post..................."
                className="focus:outline-0 px-3 text-3xl font-normal opacity-50"
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
              <img src={imgUrl} alt="an attached image" className="w-[15%]" />
            )}
            {vidUrl && <video src={vidUrl} controls className="h-[35%]" />}
            <textarea
              placeholder="Write a post......"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full h-full focus:outline-0 text-lg font-medium"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default PublishScreen;
