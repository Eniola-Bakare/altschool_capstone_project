import { useEffect, useState } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

type EachPostProps = {
  post: {
    postText: string;
    postData: object;
  };
};
function EachPost({ post }: EachPostProps) {
  const { currentUser, setCurrentUser, likedLocalItems, setLikedLocalItems } =
    useAuthContext();
  const [liked, setLiked] = useState(false);
  const { userDocRef } = post.userData;
  const userDetails = post.userData;
  const { postDocRef, likes } = post.postData;
  const postDetails = post.postData;
  const date = post.postData?.datePublished?.toDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date?.getMonth()];

  const [likesNoLocal, setLikesNoLocal] = useState(likes);
  const currentUserDocRef = currentUser?.userDocRef;

  useEffect(() => {
    const alreadyLiked = likedLocalItems?.findIndex(
      (items) => items?.postDocRef == postDocRef
    );
    console.log(alreadyLiked, liked);
    if (alreadyLiked < 0 || alreadyLiked == undefined) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  }, [likedLocalItems]);

  function handleLike() {
    const alreadyLiked = likedLocalItems?.findIndex(
      (items) => items?.postDocRef == postDocRef
    );

    console.log(alreadyLiked);
    if (alreadyLiked < 0) {
      console.log("adding now, not there beforeeeeeeeeeeeee");
      setLikedLocalItems((prev) => {
        const updated = [
          ...prev,
          { postDocRef: postDocRef, userDocRef: userDocRef },
        ];
        console.log(updated);

        updateDoc(doc(db, "users", userDocRef, "posts", postDocRef), {
          likes: likesNoLocal + 1,
        })
          .then((ref) => {
            onSnapshot(
              doc(db, "users", userDocRef, "posts", postDocRef),
              (doc) => setLikesNoLocal(doc?.data().likes)
            );
            updateDoc(doc(db, "users", currentUser?.userDocRef), {
              likedItems: updated,
            }).then((ref) => {
              return onSnapshot(
                doc(db, "users", currentUser?.userDocRef),
                (doc) =>
                  setCurrentUser({
                    ...doc?.data(),
                    userDocRef: currentUserDocRef,
                  })
              );
            });
          })
          .catch((error) => console.log("not updatedddddd+++++++", error));

        return updated;
      });
    } else if (alreadyLiked >= 0) {
      console.log("removing now, not there beforeeeeeeeeeeeee");

      setLikedLocalItems((prev) => {
        const updated = prev.filter((item) => item.postDocRef !== postDocRef);
        console.log(updated);

        updateDoc(doc(db, "users", userDocRef, "posts", postDocRef), {
          likes: likesNoLocal - 1,
        })
          .then((ref) => {
            onSnapshot(
              doc(db, "users", userDocRef, "posts", postDocRef),
              (doc) => setLikesNoLocal(doc?.data().likes)
            );
            return updateDoc(doc(db, "users", currentUser?.userDocRef), {
              likedItems: updated,
            }).then((ref) => {
              return onSnapshot(
                doc(db, "users", currentUser?.userDocRef),
                (doc) =>
                  setCurrentUser({
                    ...doc?.data(),
                    userDocRef: currentUserDocRef,
                  })
              );
            });
          })
          .catch((error) => console.log("not updatedddddd+++++++", error));

        return updated;
      });
    }
  }

  console.log(likedLocalItems);
  console.log(currentUser);

  return (
    <section
      key={post?.id}
      className="flex w-full flex-col pl-[50px] pr-[190px] pb-8 border-x border-t border-b-borderGrey"
    >
      <div className="profile-details flex items-center gap-5 py-[30px] ">
        <div className="profile-image w-[70px]">
          <img
            src={userDetails.photoURL}
            alt="a profile picture"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-2xl">
            {userDetails.fName} {userDetails.lName}
          </p>
          <p className="text-lg text-grey">
            {userDetails.category}{" "}
            <strong className="text-grey text-borderGrey">|</strong>{" "}
            <span>
              {monthName} {date?.getDate()},{date?.getFullYear()}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col ">
        <h1 className="font-bold text-4xl pb-2">
          Starting out as a Product designer
        </h1>
        <p className="est-read-time flex items-center gap-3 pb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.75 3.77344H16.3875C15.2367 3.77344 14.1117 4.10391 13.1437 4.72734L12 5.46094L10.8563 4.72734C9.88924 4.10403 8.76299 3.77282 7.6125 3.77344H2.25C1.83516 3.77344 1.5 4.10859 1.5 4.52344V17.8359C1.5 18.2508 1.83516 18.5859 2.25 18.5859H7.6125C8.76328 18.5859 9.88828 18.9164 10.8563 19.5398L11.8969 20.2102C11.9273 20.2289 11.9625 20.2406 11.9977 20.2406C12.0328 20.2406 12.068 20.2313 12.0984 20.2102L13.1391 19.5398C14.1094 18.9164 15.2367 18.5859 16.3875 18.5859H21.75C22.1648 18.5859 22.5 18.2508 22.5 17.8359V4.52344C22.5 4.10859 22.1648 3.77344 21.75 3.77344ZM7.6125 16.8984H3.1875V5.46094H7.6125C8.44219 5.46094 9.24844 5.69766 9.94453 6.14531L11.0883 6.87891L11.25 6.98438V17.8125C10.1344 17.2125 8.8875 16.8984 7.6125 16.8984ZM20.8125 16.8984H16.3875C15.1125 16.8984 13.8656 17.2125 12.75 17.8125V6.98438L12.9117 6.87891L14.0555 6.14531C14.7516 5.69766 15.5578 5.46094 16.3875 5.46094H20.8125V16.8984ZM9.30234 8.46094H4.94766C4.85625 8.46094 4.78125 8.54063 4.78125 8.63672V9.69141C4.78125 9.7875 4.85625 9.86719 4.94766 9.86719H9.3C9.39141 9.86719 9.46641 9.7875 9.46641 9.69141V8.63672C9.46875 8.54063 9.39375 8.46094 9.30234 8.46094ZM14.5312 8.63672V9.69141C14.5312 9.7875 14.6062 9.86719 14.6977 9.86719H19.05C19.1414 9.86719 19.2164 9.7875 19.2164 9.69141V8.63672C19.2164 8.54063 19.1414 8.46094 19.05 8.46094H14.6977C14.6062 8.46094 14.5312 8.54063 14.5312 8.63672ZM9.30234 11.7422H4.94766C4.85625 11.7422 4.78125 11.8219 4.78125 11.918V12.9727C4.78125 13.0688 4.85625 13.1484 4.94766 13.1484H9.3C9.39141 13.1484 9.46641 13.0688 9.46641 12.9727V11.918C9.46875 11.8219 9.39375 11.7422 9.30234 11.7422ZM19.0523 11.7422H14.6977C14.6062 11.7422 14.5312 11.8219 14.5312 11.918V12.9727C14.5312 13.0688 14.6062 13.1484 14.6977 13.1484H19.05C19.1414 13.1484 19.2164 13.0688 19.2164 12.9727V11.918C19.2188 11.8219 19.1438 11.7422 19.0523 11.7422Z"
              fill="black"
            />
          </svg>
          10 mins reaad
        </p>
        <div className="feed-post w-full flex flex-col gap-4 each-post">
          <textarea
            className="content text-grey text-lg w-[90%] text-wrap overflow-clip outline-none cursor-auto resize-none"
            readOnly
            value={postDetails.postText}
          ></textarea>
          <div className="feed-image">
            <img
              src={postDetails.attachment}
              alt="an image"
              className="w-[40%]"
            />
          </div>

          <div
            className="interactions w-[50%] flex justify-between items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="flex items-center text-grey gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="fill-black hover:fill-blue active:fill-blue"
              >
                <path d="M13.4297 9.86719C12.8883 9.86719 12.4688 10.2867 12.4688 10.8047C12.4688 11.3227 12.8883 11.7422 13.4297 11.7422C13.9242 11.7422 14.3438 11.3227 14.3438 10.8047C14.3438 10.2867 13.9242 9.86719 13.4297 9.86719ZM6.86719 9.86719C6.32578 9.86719 5.90625 10.2867 5.90625 10.8047C5.90625 11.3227 6.32578 11.7422 6.86719 11.7422C7.36172 11.7422 7.78125 11.3227 7.78125 10.8047C7.78125 10.2867 7.36172 9.86719 6.86719 9.86719Z" />
                <path d="M20.9528 8.08601C19.8255 6.53913 18.2505 5.50554 16.5231 5.03913V5.04148C16.1223 4.59617 15.67 4.18601 15.1637 3.82038C11.327 1.03132 5.94109 1.8821 3.14031 5.71882C0.883281 8.83601 0.979375 13.029 3.28094 16.0079L3.29969 19.1157C3.29969 19.1907 3.31141 19.2657 3.33484 19.336C3.45906 19.7321 3.88094 19.9501 4.27469 19.8259L7.24187 18.8907C8.02703 19.1696 8.83797 19.329 9.64422 19.3735L9.6325 19.3829C11.7208 20.904 14.4583 21.361 16.9684 20.5313L19.9473 21.5016C20.0223 21.5251 20.0997 21.5391 20.1794 21.5391C20.5942 21.5391 20.9294 21.204 20.9294 20.7891V17.6485C22.9942 14.8454 23.0481 10.9712 20.9528 8.08601ZM7.57 17.2266L7.28875 17.1094L4.96844 17.836L4.945 15.3985L4.7575 15.1876C2.77469 12.7688 2.64344 9.28367 4.49969 6.72663C6.75906 3.6282 11.0903 2.94382 14.1794 5.17976C17.2778 7.4321 17.9645 11.7563 15.7262 14.836C13.8489 17.4118 10.488 18.3634 7.57 17.2266ZM19.4059 16.8282L19.2184 17.0626L19.2419 19.5001L16.945 18.7266L16.6637 18.8438C15.3512 19.3313 13.952 19.3712 12.6559 19.0079L12.6512 19.0055C14.3833 18.4735 15.9536 17.3954 17.0856 15.8438C18.8762 13.3759 19.1669 10.2751 18.1262 7.63132L18.1403 7.6407C18.6794 8.02742 19.1739 8.51023 19.5934 9.09382C21.295 11.4282 21.1989 14.6063 19.4059 16.8282Z" />
                <path d="M10.1484 9.86719C9.60703 9.86719 9.1875 10.2867 9.1875 10.8047C9.1875 11.3227 9.60703 11.7422 10.1484 11.7422C10.643 11.7422 11.0625 11.3227 11.0625 10.8047C11.0625 10.2867 10.643 9.86719 10.1484 9.86719Z" />
              </svg>

              <span>200</span>
            </p>

            <p
              className="flex items-center text-grey gap-2 cursor-pointer"
              onClick={() => handleLike()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className={` ${
                  liked
                    ? "fill-blue active:fill-blue hover:fill-blue"
                    : "active:fill-black fill-black hover:fill-blue"
                }`}
              >
                <path d="M12 20.9999L10.55 19.6999C8.86667 18.1832 7.475 16.8749 6.375 15.7749C5.275 14.6749 4.4 13.6872 3.75 12.8119C3.1 11.9372 2.646 11.1332 2.388 10.3999C2.13 9.66657 2.00067 8.91657 2 8.1499C2 6.58324 2.525 5.2749 3.575 4.2249C4.625 3.1749 5.93333 2.6499 7.5 2.6499C8.36667 2.6499 9.19167 2.83324 9.975 3.1999C10.7583 3.56657 11.4333 4.08324 12 4.7499C12.5667 4.08324 13.2417 3.56657 14.025 3.1999C14.8083 2.83324 15.6333 2.6499 16.5 2.6499C18.0667 2.6499 19.375 3.1749 20.425 4.2249C21.475 5.2749 22 6.58324 22 8.1499C22 8.91657 21.8707 9.66657 21.612 10.3999C21.3533 11.1332 20.8993 11.9372 20.25 12.8119C19.6 13.6872 18.725 14.6749 17.625 15.7749C16.525 16.8749 15.1333 18.1832 13.45 19.6999L12 20.9999ZM12 18.2999C13.6 16.8666 14.9167 15.6372 15.95 14.6119C16.9833 13.5866 17.8 12.6952 18.4 11.9379C19 11.1792 19.4167 10.5039 19.65 9.9119C19.8833 9.3199 20 8.73257 20 8.1499C20 7.1499 19.6667 6.31657 19 5.6499C18.3333 4.98324 17.5 4.6499 16.5 4.6499C15.7167 4.6499 14.9917 4.87057 14.325 5.3119C13.6583 5.75324 13.2 6.3159 12.95 6.9999H11.05C10.8 6.31657 10.3417 5.7539 9.675 5.3119C9.00833 4.8699 8.28333 4.64924 7.5 4.6499C6.5 4.6499 5.66667 4.98324 5 5.6499C4.33333 6.31657 4 7.1499 4 8.1499C4 8.73324 4.11667 9.3209 4.35 9.9129C4.58333 10.5049 5 11.1799 5.6 11.9379C6.2 12.6959 7.01667 13.5876 8.05 14.6129C9.08333 15.6382 10.4 16.8672 12 18.2999Z" />
              </svg>

              <span>{likesNoLocal}</span>
            </p>

            <p className="flex items-center text-grey gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-black hover:fill-blue active:fill-blue"
              >
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" />
                <path d="M7 12H9V17H7V12ZM15 7H17V17H15V7ZM11 14H13V17H11V14ZM11 10H13V12H11V10Z" />
              </svg>

              <span>{postDetails.bookmark}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EachPost;
