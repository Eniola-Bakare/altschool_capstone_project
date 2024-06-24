import React from "react";

function EachNotif({ notifDetails }) {
  const {
    engagerFName,
    engagerPhotoURL,
    engagerRef,
    message,
    postDocRef,
    type,
  } = notifDetails;
  return (
    <div>
      <p>{engagerFName} {message}</p>
    </div>
  );
}

export default EachNotif;
