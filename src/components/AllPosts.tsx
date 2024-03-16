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

        userData.forEach((eachUser) => {
          const postsRef = collection(db, "users", eachUser.id, "posts");
          getDocs(postsRef).then((allPosts) => {
            allPosts.forEach((eachPost) => {
              if (eachPost.data()) {
                userDoc = eachUser.data();
                console.log(typeof eachPost.data());
                console.log(userDoc);
                post = eachPost.data();

                setAllPosts((prev) => {
                  const index = prev.findIndex(
                    (item) => item.uid === userDoc.uid
                  );
                  if (index !== -1) {
                    return prev.map((item) =>
                      item.uid === userDoc.uid
                        ? { ...item, ...userDoc, post }
                        : item
                    );
                  } else {
                    return [...prev, { ...userDoc, post }];
                  }
                });
              }
            });
          });
        });
        console.log(userDoc, post);
        // setAllPosts((prev) => [...prev, { userDoc, post }]);
      });
    };

    fetchData();
  }, []);
  console.log(allPosts);
  return (
    <div className="all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto">
      {allPosts.map((post) => (
        <EachPost key={post.id} />
      ))}
    </div>
  );
}

export default AllPosts;
// post={post}
