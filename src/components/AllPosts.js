import { jsx as _jsx } from "react/jsx-runtime";
import { collection, getDocs } from "firebase/firestore";
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
                const userAndPost = [];
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
    return (_jsx("div", { className: "all-posts tab flex flex-col justify-between items-center h-screen overflow-y-auto", children: allPosts.map((post) => (_jsx(EachPost, { post: post }, post.postData.postDocRef))) }));
}
export default AllPosts;
