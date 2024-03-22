import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
const AuthContext = createContext(undefined);
export default function AuthContextProvider({ children, }) {
    const [email, setEmail] = useState("eebakare@gmail.com");
    const [password, setPassword] = useState("123Ab!");
    const [fName, setFName] = useState("eniola");
    const [lName, setLName] = useState("bakare");
    const [category, setCategory] = useState("Reader");
    const [confirmPassword, setConfirmPassword] = useState("123Ab!");
    const [signedIn, setSignedIn] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [published, setPublished] = useState(false);
    const upDatePosts = () => {
        setPublished(true);
    };
    const [currentUser, setCurrentUser] = useState(null);
    // console.log(currentUser, "current user");
    const [likedLocalItems, setLikedLocalItems] = useState([]);
    console.log(likedLocalItems, "from auth context ++++++++++++++++++++++++++++++++++++++++++");
    useEffect(() => {
        setLikedLocalItems(currentUser?.likedItems);
    }, [currentUser?.likedItems]);
    // console.log(likedLocalItems, currentUser);
    const [newUser, setNewUser] = useState(null);
    const [errorMessageSignIn, setErrorMessageSignIn] = useState("");
    const [errorMessageSignUp, setErrorMessageSignUp] = useState(false);
    const [oTP, setOTP] = useState([]);
    function generateOTP() {
        const newOTP = [];
        for (let i = 0; i < 4; i++) {
            newOTP.push(Math.floor(Math.random() * 10)); // Generate random digit between 0 and 9
        }
        setOTP(newOTP);
    }
    return (_jsx(AuthContext.Provider, { value: {
            email,
            setEmail,
            password,
            setPassword,
            fName,
            setFName,
            lName,
            setLName,
            category,
            setCategory,
            confirmPassword,
            setConfirmPassword,
            signedIn,
            setSignedIn,
            authUser,
            setAuthUser,
            errorMessageSignIn,
            setErrorMessageSignIn,
            errorMessageSignUp,
            setErrorMessageSignUp,
            oTP,
            setOTP,
            generateOTP,
            newUser,
            setNewUser,
            currentUser,
            setCurrentUser,
            likedLocalItems,
            setLikedLocalItems,
            published,
            setPublished,
            upDatePosts,
            // likedItems,
            // setLikedItems,
            // liked,
            // setLiked,
        }, children: children }));
}
const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuthContext must be used within AuthContextProvider");
    }
    return authContext;
};
export { AuthContextProvider, useAuthContext };
