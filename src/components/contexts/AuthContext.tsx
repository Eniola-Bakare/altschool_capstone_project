import { User, onAuthStateChanged } from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { auth } from "../../firebase/config";
import { useLocalStorage } from "../actions/LocalStorage";

type AuthContextTYPE = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  category: string;
  setCategory: (category: string) => void;
  fName: string;
  setFName: (name: string) => void;
  lName: string;
  setLName: (lName: string) => void;
  screenToShow: string;
  setScreenToShow: (screenToShow: string) => void;
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
  newPost: boolean;
  setNewPost: (signedIn: boolean) => void;
  authUser: null | object;
  setAuthUser: Dispatch<SetStateAction<User | null>>;
  errorMessageSignIn: string;
  setErrorMessageSignIn: Dispatch<SetStateAction<string>>;
  errorMessageSignUp: boolean;
  setErrorMessageSignUp: (errorMessage: boolean) => void;
  oTP: number[];
  setOTP: (oTP: number[]) => void;
  generateOTP: () => void;
  newUser: null | object;
  setNewUser: Dispatch<SetStateAction<null>>;
  currentUser: object | null;
  setCurrentUser: Dispatch<SetStateAction<object | null>>;
  likedLocalItems: likedLocalItems[];
  setLikedLocalItems: Dispatch<SetStateAction<likedLocalItems[]>>;
  published: boolean;
  setPublished: Dispatch<SetStateAction<boolean>>;
  upDatePosts: () => void;
  allPosts: UserAndPost[];
  setAllPosts: Dispatch<SetStateAction<UserAndPost[]>>;
  showAnalytics: boolean;
  setShowAnalytics: Dispatch<SetStateAction<boolean>>;
  showFeed: boolean;
  setShowFeed: Dispatch<SetStateAction<boolean>>;
  notificationAlert: boolean;
  setNotificationAlert: Dispatch<SetStateAction<boolean>>;
  showNotification: boolean;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  olderNotifications: Engagements[];
  setOlderNotifications: Dispatch<SetStateAction<Engagements[]>>;
  recentNotifications: Engagements[];
  setRecentNotifications: Dispatch<SetStateAction<Engagements[]>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  notifRef: React.MutableRefObject<null>;
};

type likedLocalItems = {
  userDocRef: any;
  postDocRef: any;
};
type UserAndPost = {
  postData: { postDocRef: string };
  userData: { userDocRef: string };
};

type Engagements = {
  engagerFName: string;
  engagerPhotoURL: string;
  engagerRef: string;
  message: string;
  postDocRef: string;
  type: string;
};
const AuthContext = createContext<AuthContextTYPE | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { getUserLocalStorage, setUserLocalStorage } =
    useLocalStorage("currentUser");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123Ab!");
  const [fName, setFName] = useState("eniola");
  const [lName, setLName] = useState("bakare");
  const [category, setCategory] = useState("Reader");
  const [confirmPassword, setConfirmPassword] = useState("123Ab!");
  const [signedIn, setSignedIn] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [published, setPublished] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<UserAndPost[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showFeed, setShowFeed] = useState(true);
  const [screenToShow, setScreenToShow] = useState("feed");
  const [searchText, setSearchText] = useState("");
  const [notificationAlert, setNotificationAlert] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notifRef = useRef(null);
  const [olderNotifications, setOlderNotifications] = useState<Engagements[]>(
    []
  );
  const [recentNotifications, setRecentNotifications] = useState<Engagements[]>(
    []
  );

  const upDatePosts = () => {
    setPublished(true);
  };

  const [currentUser, setCurrentUser] = useState<object | null>(null);
  const [likedLocalItems, setLikedLocalItems] = useState<likedLocalItems[]>([]);

  useEffect(() => {
    setCurrentUser(getUserLocalStorage());
  }, []);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser?.olderNotification > 0) {
      setOlderNotifications(currentUser?.olderNotification);
    }  
  }, [currentUser]); 

  useEffect(() => {
    setLikedLocalItems(currentUser?.likedItems);
  }, [currentUser?.likedItems]);

  const [newUser, setNewUser] = useState(null);

  const [errorMessageSignIn, setErrorMessageSignIn] = useState("");
  const [errorMessageSignUp, setErrorMessageSignUp] = useState(false);

  const [oTP, setOTP] = useState<number[]>([]);
  function generateOTP() {
    const newOTP = [];
    for (let i = 0; i < 4; i++) {
      newOTP.push(Math.floor(Math.random() * 10)); // Generate random digit between 0 and 9
    }
    setOTP(newOTP);
  }

  return (
    <AuthContext.Provider
      value={{
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
        newPost,
        setNewPost,
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
        allPosts,
        setAllPosts,
        showAnalytics,
        setShowAnalytics,
        showFeed,
        setShowFeed,
        notificationAlert,
        setNotificationAlert,
        showNotification,
        setShowNotification,
        notifRef,
        olderNotifications,
        setOlderNotifications,
        recentNotifications,
        setRecentNotifications,
        screenToShow,
        setScreenToShow,
        searchText,
        setSearchText,
        // likedItems,
        // setLikedItems,
        // liked,
        // setLiked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }

  return authContext;
};

export { AuthContextProvider, useAuthContext };
