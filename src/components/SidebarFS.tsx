import LogoText from "./LogoText";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import { useLocalStorage } from "./actions/LocalStorage";
import NotificationBtn from "./SubPages/Notification/NotificationBtn";

function SidebarFS() {
  const {
    setSignedIn,
    setShowAnalytics,
    setShowFeed,
    setScreenToShow,
    notificationAlert,
  } = useAuthContext();
  const navigate = useNavigate();
  const { removeUserLocalStorage } = useLocalStorage("currentUser");

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        setSignedIn(false);
        removeUserLocalStorage();
        navigate("/signin");
      })
      .catch((error) => console.log("an error occured", error));
  }

  return (
    <aside className="w-[24%] pr-8 h-screen flex flex-col justify-evenly items-center border-r border-borderGrey">
      <LogoText />

      <div className="sidebar-first">
        <p className="text-lg text-black pb-4 font-medium">Overview</p>
        <ul className="flex flex-col gap-4 pl-7">
          <li
            className="flex gap-3 text-grey hover:text-blue "
            onClick={() => setScreenToShow("feed")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="fill-grey hover:fill-blue"
            >
              <path
                d="M21 2H9C8.4 2 8 2.4 8 3V6C8 6.6 8.4 7 9 7H21C21.6 7 22 6.6 22 6V3C22 2.4 21.6 2 21 2ZM12 17H7V22H12V17ZM7 9.5H2V14.5H7V9.5ZM18 9.6H9.5V14.3H18V9.6Z"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            Feed
          </li>
          <li
            className="flex gap-3 text-grey hover:text-blue "
            onClick={() => setScreenToShow("bookmarks")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-grey hover:fill-blue"
            >
              <path d="M16.5 7V22.2417L10.197 19.5404L10 19.456L9.80304 19.5404L3.5 22.2417V7C3.5 6.58379 3.64248 6.23962 3.94155 5.94055C4.24061 5.6415 4.58424 5.4995 4.99939 5.5H5H15C15.4162 5.5 15.7604 5.64248 16.0594 5.94155C16.3585 6.24061 16.5005 6.58424 16.5 6.99939V7ZM5 5H15C15.55 5 16.021 5.196 16.413 5.588C16.805 5.98 17.0007 6.45067 17 7L5 5ZM4.5 19.95V20.7093L5.19751 20.4093L10 18.3443L14.8025 20.4093L15.5 20.7093V19.95V7V6.5H15H5H4.5V7V19.95ZM20.5 3V19.5H19.5V3V2.5H19H6.5V1.5H19C19.4162 1.5 19.7604 1.64248 20.0594 1.94155C20.3585 2.24061 20.5005 2.58424 20.5 2.99939V3Z" />
            </svg>
            Bookmarks
          </li>
          <li className="flex gap-3 text-grey hover:text-blue ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-grey hover:fill-blue"
            >
              <path d="M19.3172 16.404C18.7306 15.8169 18.0451 15.3377 17.2922 14.9883C18.354 14.1282 19.0313 12.8157 19.0313 11.3438C19.0313 8.74694 16.8657 6.61647 14.2688 6.65631C11.7118 6.69616 9.65162 8.77975 9.65162 11.3438C9.65162 12.8157 10.3313 14.1282 11.3907 14.9883C10.6377 15.3374 9.95214 15.8166 9.36568 16.404C8.086 17.686 7.35943 19.3782 7.31256 21.1829C7.31193 21.2079 7.31632 21.2328 7.32546 21.2561C7.33461 21.2794 7.34832 21.3006 7.36579 21.3185C7.38326 21.3364 7.40415 21.3506 7.42721 21.3604C7.45027 21.3701 7.47504 21.3751 7.50006 21.3751H8.81256C8.91334 21.3751 8.99771 21.2954 9.00006 21.1946C9.04459 19.8352 9.59537 18.5626 10.5633 17.5969C11.0587 17.099 11.6478 16.7042 12.2968 16.4355C12.9457 16.1667 13.6414 16.0294 14.3438 16.0313C15.7712 16.0313 17.1141 16.5868 18.1243 17.5969C19.0899 18.5626 19.6407 19.8352 19.6876 21.1946C19.6899 21.2954 19.7743 21.3751 19.8751 21.3751H21.1876C21.2126 21.3751 21.2374 21.3701 21.2604 21.3604C21.2835 21.3506 21.3044 21.3364 21.3218 21.3185C21.3393 21.3006 21.353 21.2794 21.3622 21.2561C21.3713 21.2328 21.3757 21.2079 21.3751 21.1829C21.3282 19.3782 20.6016 17.686 19.3172 16.404ZM14.3438 14.3438C13.5422 14.3438 12.7876 14.0321 12.2227 13.4649C11.9392 13.1837 11.7153 12.8482 11.5643 12.4786C11.4133 12.1089 11.3383 11.7126 11.3438 11.3133C11.3508 10.5446 11.6579 9.80162 12.1946 9.25084C12.7571 8.67428 13.5094 8.35319 14.3133 8.34381C15.1079 8.33678 15.879 8.64616 16.4462 9.20162C17.0274 9.77116 17.3462 10.5329 17.3462 11.3438C17.3462 12.1454 17.0344 12.8977 16.4672 13.4649C16.189 13.7445 15.858 13.9661 15.4935 14.117C15.1291 14.2679 14.7383 14.345 14.3438 14.3438ZM8.47271 11.9626C8.45162 11.7587 8.4399 11.5524 8.4399 11.3438C8.4399 10.9712 8.47506 10.6079 8.54068 10.254C8.55709 10.1696 8.51256 10.0829 8.43521 10.0477C8.11646 9.90475 7.8235 9.70787 7.57037 9.45944C7.2721 9.17024 7.0374 8.82203 6.88123 8.43705C6.72505 8.05207 6.65085 7.63876 6.66334 7.2235C6.68443 6.47116 6.98678 5.75631 7.51412 5.21725C8.09303 4.62428 8.87115 4.30084 9.6985 4.31022C10.4462 4.31725 11.168 4.60553 11.7141 5.11647C11.8993 5.28991 12.0587 5.48209 12.1922 5.68834C12.2391 5.761 12.3305 5.79147 12.4102 5.76334C12.8227 5.62037 13.2587 5.51959 13.7063 5.47272C13.8376 5.45866 13.9126 5.31803 13.854 5.20084C13.0922 3.69381 11.536 2.65319 9.736 2.62506C7.13678 2.58522 4.97115 4.71569 4.97115 7.31022C4.97115 8.78209 5.6485 10.0946 6.71021 10.9547C5.9649 11.2993 5.27818 11.7751 4.68287 12.3704C3.3985 13.6524 2.67193 15.3446 2.62506 17.1516C2.62443 17.1766 2.62882 17.2015 2.63796 17.2248C2.64711 17.2481 2.66082 17.2693 2.67829 17.2872C2.69576 17.3052 2.71665 17.3194 2.73971 17.3291C2.76277 17.3388 2.78754 17.3438 2.81256 17.3438H4.1274C4.22818 17.3438 4.31256 17.2641 4.3149 17.1633C4.35943 15.804 4.91021 14.5313 5.87818 13.5657C6.56725 12.8766 7.411 12.3985 8.33209 12.1665C8.4235 12.143 8.48443 12.0563 8.47271 11.9626Z" />
            </svg>
            Team blogs
          </li>
          <li className="flex gap-3 text-grey hover:text-blue ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="fill-grey hover:fill-blue"
            >
              <path d="M12 1L21.05 6.4C21.35 6.58333 21.5833 6.83333 21.75 7.15C21.9167 7.46667 22 7.8 22 8.15V19C22 19.55 21.804 20.021 21.412 20.413C21.02 20.805 20.5493 21.0007 20 21H4C3.45 21 2.979 20.804 2.587 20.412C2.195 20.02 1.99934 19.5493 2 19V8.15C2 7.8 2.08334 7.46667 2.25 7.15C2.41667 6.83333 2.65 6.58333 2.95 6.4L12 1ZM12 12.65L19.8 8L12 3.35L4.2 8L12 12.65ZM12 15L4 10.2V19H20V10.2L12 15ZM12 19H20H4H12Z" />
            </svg>
            Drafts
          </li>
          <li
            className="flex gap-3 text-grey hover:text-blue "
            onClick={() => setScreenToShow("analytics")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-grey hover:fill-blue"
            >
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" />
              <path d="M7 12H9V17H7V12ZM15 7H17V17H15V7ZM11 14H13V17H11V14ZM11 10H13V12H11V10Z" />
            </svg>
            Analytics
          </li>
        </ul>
      </div>

      <div className="sidebar-second">
        <p className="text-lg text-black flex gap-3 pb-4 font-medium">
          Trending Tags
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M20.9998 7.5C21.0093 7.43032 21.0093 7.35968 20.9998 7.29C20.9911 7.23129 20.9743 7.17407 20.9498 7.12C20.9234 7.07113 20.8933 7.02433 20.8598 6.98C20.8218 6.91675 20.7746 6.85947 20.7198 6.81L20.5998 6.74C20.5421 6.69696 20.478 6.66321 20.4098 6.64H20.2098C20.1489 6.58099 20.0777 6.53356 19.9998 6.5H14.9998C14.7346 6.5 14.4802 6.60536 14.2927 6.79289C14.1052 6.98043 13.9998 7.23478 13.9998 7.5C13.9998 7.76522 14.1052 8.01957 14.2927 8.20711C14.4802 8.39464 14.7346 8.5 14.9998 8.5H17.8298L13.8298 13.21L9.50981 10.64C9.30519 10.5183 9.06387 10.4736 8.82923 10.5139C8.5946 10.5542 8.38205 10.677 8.22981 10.86L3.22981 16.86C3.14561 16.961 3.08217 17.0777 3.04312 17.2033C3.00408 17.3289 2.99019 17.461 3.00227 17.592C3.01435 17.7229 3.05214 17.8503 3.11349 17.9666C3.17485 18.0829 3.25855 18.1861 3.35981 18.27C3.53972 18.4191 3.76616 18.5005 3.99981 18.5C4.14672 18.5002 4.29188 18.4681 4.42496 18.4059C4.55804 18.3437 4.67578 18.2529 4.76981 18.14L9.21981 12.8L13.4898 15.36C13.6923 15.4801 13.9308 15.5249 14.1631 15.4865C14.3954 15.4481 14.6067 15.3289 14.7598 15.15L18.9998 10.2V12.5C18.9998 12.7652 19.1052 13.0196 19.2927 13.2071C19.4802 13.3946 19.7346 13.5 19.9998 13.5C20.265 13.5 20.5194 13.3946 20.7069 13.2071C20.8945 13.0196 20.9998 12.7652 20.9998 12.5V7.5Z"
              fill="#626262"
            />
          </svg>
        </p>

        <ul className="flex flex-col gap-4 pl-7">
          <li className="text-lg text-grey hover:text-blue">Programming</li>
          <li className="text-lg text-grey hover:text-blue">Data science</li>
          <li className="text-lg text-grey hover:text-blue">Technology</li>
          <li className="text-lg text-grey hover:text-blue">
            Machine learning
          </li>
          <li className="text-lg text-grey hover:text-blue">Politics</li>
          <li className="text-lg text-blue hover:text-grey">See all</li>
        </ul>
      </div>

      <div className="sidebar-third">
        <p className="text-lg text-black pb-4 font-medium"> Personal</p>

        <ul className="flex flex-col gap-4 pl-7">
          <li className="text-lg text-grey hover:text-blue flex gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-grey hover:fill-blue"
            >
              <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 6C11.4696 6 10.9609 6.21071 10.5858 6.58579C10.2107 6.96086 10 7.46957 10 8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10C12.5304 10 13.0391 9.78929 13.4142 9.41421C13.7893 9.03914 14 8.53043 14 8C14 7.46957 13.7893 6.96086 13.4142 6.58579C13.0391 6.21071 12.5304 6 12 6ZM12 13C14.67 13 20 14.33 20 17V20H4V17C4 14.33 9.33 13 12 13ZM12 14.9C9.03 14.9 5.9 16.36 5.9 17V18.1H18.1V17C18.1 16.36 14.97 14.9 12 14.9Z" />
            </svg>
            Account
          </li>
          <li className="text-lg text-grey hover:text-blue flex gap-3">
            <NotificationBtn />
            <span
              className={`${notificationAlert ? "text-danger" : "text-grey"}`}
            >
              {" "}
              Notifications
            </span>
          </li>
          <li
            className="text-lg text-danger cursor-pointer"
            onClick={handleLogOut}
          >
            Log out
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SidebarFS;
