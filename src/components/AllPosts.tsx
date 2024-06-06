import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EachPost from "./EachPost";
import { useAuthContext } from "./contexts/AuthContext";

type UserAndPost = {
  postData: { postDocRef: string };
  userData: { userDocRef: string };
};

function AllPosts() {
  // const [allPosts, setAllPosts] = useState<UserAndPost[]>([]);
  const { setAllPosts, allPosts } = useAuthContext();

  const fetchData = () => {
    const usersRef = collection(db, "users");

    getDocs(usersRef)
      .then((userData) => {
        const userAndPostPromises = userData.docs.map((eachUser) => {
          const postsRef = collection(db, "users", eachUser.id, "posts");
          return getDocs(postsRef).then((allPostsSnapshot) => {
            return allPostsSnapshot.docs.map((eachPost) => {
              const userDoc = { ...eachUser.data(), userDocRef: eachUser.id };
              const post = { ...eachPost.data(), postDocRef: eachPost.id };
              return { postData: post, userData: userDoc };
            });
          });
        });

        return Promise.all(userAndPostPromises);
      })
      .then((userAndPostArray) => {
        const flattenedUserAndPostArray = userAndPostArray.flat();
        setAllPosts(flattenedUserAndPostArray);
      })
      .catch((error) => {
        console.error("Error fetching posts: ", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto">
      {allPosts.map((post) => (
        <EachPost key={post?.id} post={post} />
      ))}
    </div>
  );
}

export default AllPosts;
