import { onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase/config";
import { useState } from "react";
import FeedScreen from "../pages/FeedScreen";
import SignInPage from "../pages/SignInPage";

function AppLayout() {
  return <>{Outlet}</>;
}

export default AppLayout;
