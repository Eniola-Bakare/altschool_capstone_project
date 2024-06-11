import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import EachPost from "./EachPost";
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

function AllPosts() {
  const [allPosts, setAllPosts] = useState<UserAndPost[]>([]);
  let userDetails = [{ text: 2 }];

  const fetchData = () => {
    const usersRef = collection(db, "users");
    const postDB = collection(db, "posts");

    // getDocs(usersRef)
    //   .then((userData) => {
    //     const userAndPostPromises = userData.docs.map((eachUser) => {
    //       const postsRef = collection(db, "users", eachUser.id, "posts");
    //       return getDocs(postsRef).then((allPostsSnapshot) => {
    //         return allPostsSnapshot.docs.map((eachPost) => {
    //           const userDoc = { ...eachUser.data(), userDocRef: eachUser.id };
    //           const post = { ...eachPost.data(), postDocRef: eachPost.id };
    //           return { postData: post, userData: userDoc };
    //         });
    //       });
    //     });

    //     return Promise.all(userAndPostPromises);
    //   })
    //   .then((userAndPostArray) => {
    //     const flattenedUserAndPostArray = userAndPostArray.flat();
    //     setAllPosts(flattenedUserAndPostArray);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching posts: ", error);
    //   });

    getDocs(postDB).then((postDetails) => {
      console.log(postDetails.forEach((each) => console.log(each.data())));
      let posterDetails = [{}];

      postDetails.forEach((eachPost) => {
        // poster details
        const postI = eachPost.data();
        const poster = postI.userID;

        console.log(postI, eachPost.id);

        getDoc(doc(db, "users", poster))
          .then((resp) => {
            console.log(resp.data());

            const userDoc = { ...resp.data(), userDocRef: resp.id };
            const post = { ...postI, postDocRef: postI.postID };
            setAllPosts((prev) => {
              console.log(prev);
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

        // posterDetails.map((eachUserDetails) => {
        //   console.log('eachUserDetails')
        //   if (eachUserDetails.userID === poster) {
        //     userNpost.push({ postData: post, uerData: eachUserDetails });
        //     console.log(userNpost);

        //     return [...posterDetails];
        //   } else {
        //     getDocs(collection(db, "users", poster))
        //       .then((resp) => {
        //         console.log(userNpost);
        //         userNpost.push({
        //           postData: post,
        //           uerData: resp,
        //         });

        //         return [...posterDetails, resp];
        //       })
        //       .catch((err) => console.error(err));
        //   }
        // });

        console.log(posterDetails);
      });

      // console.log(eachPost);
      // return getDocs(postsRef).then((allPostsSnapshot) => {
      //   return allPostsSnapshot.docs.map((eachPost) => {
      //     const userDoc = { ...eachUser.data(), userDocRef: eachUser.id };
      //     const post = { ...eachPost.data(), postDocRef: eachPost.id };
      //     return { postData: post, userData: userDoc };
      //   });
      // });

      //   return Promise.all(userAndPostPromises);
      // })
      // .then((userAndPostArray) => {
      //   const flattenedUserAndPostArray = userAndPostArray.flat();
      //   setAllPosts(flattenedUserAndPostArray);
      // })
      // .catch((error) => {
      //   console.error("Error fetching posts: ", error);
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
