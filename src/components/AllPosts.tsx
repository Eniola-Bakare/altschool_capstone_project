import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EachPost from "./EachPost";
import { useCommentContext } from "./SubPages/CommentSection/CommentsContext";

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

function AllPosts() {
  const { showComments, setShowComments } = useCommentContext();
  const [allPosts, setAllPosts] = useState<UserAndPost[]>([]);

  let lastDoc = null;

  const postDB = collection(db, "posts");
  const fetchData = () => {
    let queryy = query(postDB, orderBy("datePublished", "desc"), limit(10));

    if (lastDoc) {
      queryy = query(
        postDB,
        orderBy("datePublished", "desc"),
        startAfter(lastDoc),
        limit(10)
      );
    }
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

  const fetchMorePost = () => {
    fetchData();
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  fetchData();

  setInterval(fetchData, 300500);

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
