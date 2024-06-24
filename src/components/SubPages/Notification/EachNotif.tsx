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
    <div className="flex gap-3 pb-3">
      <img src={engagerPhotoURL} className="w-7" />
      <p className="text-lg">
        {engagerFName} {message}
      </p>
    </div>
  );
}

export default EachNotif;
