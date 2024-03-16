import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EachPost from "./EachPost";

function AllPosts() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const usersRef = collection(db, "users");
      getDocs(usersRef).then((userData) => {
        let userDoc;
        let post;
        let userAndPost = [];

        userData.forEach((eachUser) => {
          const postsRef = collection(db, "users", eachUser.id, "posts");
          getDocs(postsRef).then((allPosts) => {
            allPosts.forEach((eachPost) => {
              if (eachPost.data()) {
                userDoc = { ...eachUser.data(), userDocRef: eachUser.id };
                // console.log(eachUser.id);
                post = { ...eachPost.data(), postDocRef: eachPost.id };
                // console.log(post);
                userAndPost.push({ postData: post, userData: userDoc });

                setAllPosts(userAndPost);
              }
            });
          });
        });
        // console.log(userAndPost);
      });
    };

    fetchData();
  }, []);
  console.log(allPosts);
  return (
    <div className="all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto">
      {allPosts.map((post) => (
        <EachPost key={post.id} post={post} />
      ))}
    </div>
  );
}

export default AllPosts;
// post={post}
