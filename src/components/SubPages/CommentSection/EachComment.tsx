import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase/config";

function EachComment({ commentDetails }) {
  const { commentText, commenterRef, datePublished } = commentDetails;
  const [commenterDetails, setcommenterDetails] = useState({});
  const { photoURL, fName } = commenterDetails;

  function getCommenterDetails() {
    getDoc(doc(db, "users", commenterRef))
      .then((commenter) => setcommenterDetails(commenter.data()))
      .catch((err) => console.error(err, "unable to load"));
  }

  const date = new Date(datePublished);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  getCommenterDetails();

  return (
    <div className=" mt-10">
      {/* EachComment */}

      <div className="commenter-details bg-borderGrey/10 p-5 rounded-lg flex items-center gap-1 w-full">
        <img
          src={photoURL}
          alt="commenter picture"
          className=" rounded-full w-7"
        />
        <p className=" font-semibold text-lg">
          {fName} | <span className=" text-grey/50 font-medium">{formattedDate} [{formattedTime}] </span> 
        </p>
      </div>
      <p className="  p-4 rounded-sm">{commentText}</p>
      {/* <p>{datePublished}</p> */}
    </div>
  );
}

export default EachComment;
