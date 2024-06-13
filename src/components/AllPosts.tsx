import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
  const { showComments } = useCommentContext();
  const [allPosts, setAllPosts] = useState<UserAndPost[]>([]);

  const fetchData = () => {
    const postDB = collection(db, "posts");

    getDocs(postDB).then((postDetails) => {
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
    });
  };

  // useEffect(() => { 
  //   fetchData();
  // }, []);
  fetchData()  

  setInterval(fetchData, 300500);

  return (
    <div className="all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto">
      {allPosts.map((post) => (
        <EachPost key={post?.id} post={post} />
      ))}
    </div>
  );
}

export default AllPosts;
