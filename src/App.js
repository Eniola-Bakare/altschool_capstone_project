import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import SignInPage from "./pages/SignInPage";
import SignUpConfirm from "./pages/SignUpConfirm";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContextProvider from "./components/contexts/AuthContext";
import FeedScreen from "./pages/FeedScreen";
function App() {
    return (_jsx(_Fragment, { children: _jsx(AuthContextProvider, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "signin", element: _jsx(SignInPage, {}) }), _jsx(Route, { path: "signup", element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: "app/feed/:id", element: _jsx(FeedScreen, {}) }), _jsx(Route, { path: "confirmation", element: _jsx(SignUpConfirm, {}) })] }) }) }) }));
}
export default App;
