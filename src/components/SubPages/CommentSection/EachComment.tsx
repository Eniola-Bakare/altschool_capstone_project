import React from "react";

function EachComment({ commentDetails }) {
  console.log(commentDetails);
  const { commentText } = commentDetails;
  return (
    <div>
      {/* EachComment */}
      <p>{commentText}</p>
    </div>
  );
}

export default EachComment;
