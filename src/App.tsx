import SignInPage from "./pages/SignInPage";
import FeedScreen from "./pages/FeedScreen";
import SignUpConfirm from "./pages/SignUpConfirm";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="*" element={<SignInPage />} /> */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Routes>
        <div className="flex flex-col">
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
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
