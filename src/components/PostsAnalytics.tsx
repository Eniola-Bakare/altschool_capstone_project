import { collection, getDocs, query, where } from "firebase/firestore";
import PostAnalysis from "./PostAnalysis";
import PostAnlySummary from "./PostAnlySummary";
import { db } from "../firebase/config";
import { useAuthContext } from "./contexts/AuthContext";
import { useEffect, useState } from "react";

function PostsAnalytics() {
  const { currentUser } = useAuthContext();
  const [highestScore, setHighestScore] = useState({});
  const [postsLength, setPostsLength] = useState(0);
  const [totalImpression, setTotalImpression] = useState(0);
  const postsRef = collection(db, "posts");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function postAnalytics() {
    const startTimestamp = new Date(year, month);
    const endTimestamp = new Date(year, month + 1);

    const queri = query(
      postsRef,
      where("userID", "==", currentUser?.userDocRef),
      where("datePublished", ">=", startTimestamp),
      where("datePublished", "<", endTimestamp)
    );
    getDocs(queri).then((userPosts) => {
      setPostsLength(userPosts.size);
      setTotalImpression((_) => {
        return userPosts.docs
          .map((each) => {
            const dataEach = each.data();
            return (
              dataEach.bookmark + dataEach.comments.length * 2 + dataEach.likes
            );
          })
          .reduce((total, acc) => {
            return total + acc;
          });
      });
      console.log(userPosts);
      const highestScorePost = userPosts.docs.reduce(
        (highestPost, currentPost) => {
          const currentPoste = currentPost.data();
          const currentScore =
            currentPoste.bookmark +
            currentPoste.comments.length * 2 +
            currentPoste.likes;
          const highestScore = highestPost.score || 0;

          if (currentScore > highestScore) {
            return { post: currentPoste, score: currentScore };
          } else {
            return highestPost;
          }
        },
        {}
      );

      setHighestScore(highestScorePost);
      console.log("post with highest score", highestScorePost);
    });
  }
  const dateNow = new Date();
  const month = dateNow.getMonth();
  const day = dateNow.getDate();
  const year = dateNow.getFullYear();

  useEffect(() => {
    postAnalytics();
  }, []);

  return (
    <section className="w-[80%] flex flex-col gap-3 self-start pl-14 ">
      <p className="font-bold text-3xl">Posts analytics</p>

      <div className="post-date-details">
        <p className="font-bold text-xl border-b-2 border-blue pb-3">
          {months[month]} {year},{" "}
          <span className="text-base text-grey">{day} days so far</span>
        </p>
        {/* <p className="font-bold text-xl pt-2"> */}
        <p className="font-bold text-xl pb-3 pt-4">Posts highlights</p>
        Top post{" "}
        <span className="text-base text-grey font-normal">
          earned {highestScore.score} impressions
        </span>
        {/* </p> */}
      </div>

      <PostAnalysis
        highestImpression={highestScore}
        totalImpression={totalImpression}
        totalPosts={postsLength}
      />

      {/* <PostAnlySummary /> */}
    </section>
  );
}

export default PostsAnalytics;
