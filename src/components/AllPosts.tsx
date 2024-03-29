import { Timestamp, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EachPost from "./EachPost";

type UserAndPost = {
  userData: {
    photoURL: string;
    fName: string;
    lName: string;
    category: string;
    userDocRef: string;
  };
  postData: {
    likes: number;
    postDocRef: string;
    datePublished: Timestamp;
    postText: string;
    attachment: string;
    bookmark: boolean;
  };
  // postDocRef:string
};

function AllPosts() {
  const [allPosts, setAllPosts] = useState<UserAndPost[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const usersRef = collection(db, "users");
      getDocs(usersRef).then((userData) => {
        let userDoc;
        let post;
        const userAndPost: UserAndPost[] = [];

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

                return setAllPosts(userAndPost);
              }
            });
          });
        });
        console.log(allPosts);
      });
    };
    fetchData();
  });

  return (
    <div className="all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto">
      {allPosts.map((post) => (
        <EachPost key={post.postData.postDocRef} post={post} />
      ))}
    </div>
  );
}

export default AllPosts;
