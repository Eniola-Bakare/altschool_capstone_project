import { useAuthContext } from "./contexts/AuthContext";

function AllNotifications() {
  const { currentUser, setNotificationAlert } = useAuthContext();
  console.log(currentUser);
  let recentNotifcationLocal = currentUser?.recentNotification;

  if (recentNotifcationLocal?.length > 0) {
    setNotificationAlert(true);
    console.log("greater than 1!");
    console.log(recentNotifcationLocal);
    recentNotifcationLocal = recentNotifcationLocal?.map((eachNotif) => {
      console.log(eachNotif.type);
      if (eachNotif.type == "comment") {
        console.log("xyg commented");
      } else if (eachNotif.type == "bookmark") {
        console.log("xyg bookmarked your pos");
      } else if (eachNotif.type == "like") {
        console.log("xyg liked your post");
      }
    });
  }
  return <div>AllNotifications</div>;
}

export default AllNotifications;
