import SignInPage from "./pages/SignInPage";
import SignUpConfirm from "./pages/SignUpConfirm";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedScreen from "./pages/FeedScreen";
import "./index.css";
import { useEffect } from "react";
import { useAuthContext } from "./components/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import { useLocalStorage } from "./components/actions/LocalStorage";

function App() {
  const { currentUser, setCurrentUser } = useAuthContext();
  const { setUserLocalStorage, getUserLocalStorage } =
    useLocalStorage("currentUser");
  useEffect(() => {
    function getCurrentUser() {
      getDoc(doc(db, "users", getUserLocalStorage("currentUser")?.userDocRef))
        .then((user) => {
          const userData = user.data();
          const userID = user.id;
          setCurrentUser({ ...userData, userDocRef: userID });
          setUserLocalStorage({ ...userData, userDocRef: userID });
        })
        .catch((error) => console.log(error));
    }

    const interval = setInterval(getCurrentUser, 50000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="*" element={<SignInPage />} /> */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="app/feed/:id" element={<FeedScreen />} />
          <Route path="confirmation" element={<SignUpConfirm />} />
        </Routes>
        {/* <div className="flex flex-col">
          <LandingPage />
        </div>
        <div className="app-auth w-full">
          <SignInPage />
        </div>
        <div className="app-auth w-full">
          <SignUpPage />
        </div>

        <div className="auth-confirm w-[full]">
          <SignUpConfirm />
        </div>
        <div className="feedScreenComp w-full">
          <FeedScreen />
        </div> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
