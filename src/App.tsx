import SignInPage from "./pages/SignInPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      {/* <div className="flex flex-col">
        <LandingPage />
      </div> */}
      <div className="app-auth w-full">
        <SignInPage />
      </div>
    </>
  );
}

export default App;
