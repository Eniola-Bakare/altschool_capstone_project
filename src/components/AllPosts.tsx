import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EachPost from "./EachPost";
import { useCommentContext } from "./SubPages/CommentSection/CommentsContext";
import { useAuthContext } from "./contexts/AuthContext";

type UserAndPost = {
  postData: { postDocRef: string };
  userData: { userDocRef: string };
};

type UserDetails = {
  category: string;
  displayName: string;
  email: string;
  fName: string;
  lName: string;
  likedItems: [];
  photoURL: string;
  tenantId: null;
  uid: string;
};

type CurrentUserProp = {
  currentUser?: object | null;
};

function AllPosts({ currentUser }: CurrentUserProp) {
  const { searchText, setSearchText } = useAuthContext();
  const [allPosts, setAllPosts] = useState<UserAndPost[]>([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  let lastDoc = null;
  let postDB = collection(db, "posts");

  const fetchData = () => {
    let queryConstraints = [orderBy("datePublished", "desc"), limit(10)];

    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc));
    }

    if (currentUser) {
      queryConstraints.push(where("userID", "==", currentUser?.userDocRef));
    }

    const queryy = query(postDB, ...queryConstraints);
    getDocs(queryy).then((postDetails) => {
      postDetails.forEach((eachPost) => {
        // poster details
        const postI = eachPost.data();
        const poster = postI.userID;

        getDoc(doc(db, "users", poster))
          .then((resp) => {
            const userDoc = { ...resp.data(), userDocRef: resp.id };
            const post = { ...postI, postDocRef: postI.postID };
            setAllPosts((prev) => {
              if (prev.length === 0) {
                return [{ userData: userDoc, postData: post }];
              } else {
                const postExists = prev.some(
                  (each) => each.postData.postDocRef === post.postDocRef
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
      lastDoc = postDetails.docs[postDetails.docs.length - 1];
    });
  };
  useEffect(() => {
    if (searchText.trim()) {
      const keywords = searchText
        .split(" ")
        .filter((word) => word.trim() !== "");

      getDocs(
        query(
          collection(db, "posts"),
          where("keywords", "array-contains-any", keywords)
        )
      ).then((postDetails) => {
        const newPosts = [];
        postDetails.forEach((eachPost) => {
          const postI = eachPost.data();
          const poster = postI.userID;

          getDoc(doc(db, "users", poster))
            .then((resp) => {
              const userDoc = { ...resp.data(), userDocRef: resp.id };
              const post = { ...postI, postDocRef: postI.postID };
              newPosts.push({ userData: userDoc, postData: post });
              if (newPosts.length === postDetails.size) {
                setAllPosts(newPosts);
              }
            })
            .catch((err) => console.error(err));
        });
      });
    } else {
      fetchData();
    }
  }, [searchText]);

  const fetchMorePost = () => {
    fetchData();
  };

  return (
    <div className="all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto relative">
      {allPosts.map((post) => (
        <EachPost key={post?.id} post={post} />
      ))}

      <p
        className=" mb-4 pb-4 bg-blue px-5 pt-4 rounded-full text-white font-semibold text-lg "
        onClick={fetchMorePost}
      >
        Fetch More posts
      </p>
    </div>
  );
}

export default AllPosts;
