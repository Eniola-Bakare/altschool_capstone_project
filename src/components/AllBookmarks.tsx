import { useEffect, useState } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import EachPost from "./EachPost";
import { useCommentContext } from "./SubPages/CommentSection/CommentsContext";

function AllBookmarks() {
  const { currentUser } = useAuthContext();
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const getData = () => {
    const bookmarkedItems = currentUser?.bookmarkedItems;
    console.log(bookmarkedItems);
    bookmarkedItems.forEach((each) => {
      getDoc(doc(db, "posts", each?.postDocRef)).then((post) => {
        const postI = post.data();
        const poster = postI?.userID;

        getDoc(doc(db, "users", poster))
          .then((resp) => {
            const userDoc = { ...resp.data(), userDocRef: resp.id };
            const post = { ...postI, postDocRef: postI?.postID };
            setBookmarkedPosts((prev) => {
              if (prev.length === 0) {
                return [{ userData: userDoc, postData: post }];
              } else {
                const postExists = prev.some(
                  (each) => each.postData?.postDocRef === post.postDocRef
                );

                if (!postExists) {
                  return [...prev, { userData: userDoc, postData: post }];
                }

                return prev;
              }
            });
          })
          .catch((err) => console.error(err));
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[80dvw] h-[90%] border border-borderGrey rounded-lg flex flex-col py-12 mx-1 px-16 gap-16 mt-5 overflow-scroll">
      {bookmarkedPosts?.map((each) => (
        <EachPost post={each} key={each?.postData?.postDocRef} />
      ))}
    </div>
  );
}

export default AllBookmarks;
