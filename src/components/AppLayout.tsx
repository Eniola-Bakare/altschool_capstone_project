import { onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase/config";
import { useState } from "react";
import FeedScreen from "../pages/FeedScreen";
import SignInPage from "../pages/SignInPage";

function AppLayout() {
  const [authenticated, setAuthenticated] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) setAuthenticated(true);
    setAuthenticated(false);
  });
  return <>{authenticated ? <FeedScreen /> : <SignInPage />}</>;
}

export default AppLayout;
