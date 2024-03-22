import { User } from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
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
};

type likedLocalItems = {
  userDocRef: any;
  postDocRef: any;
};

const AuthContext = createContext<AuthContextTYPE | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setEmail] = useState("eebakare@gmail.com");
  const [password, setPassword] = useState("123Ab!");
  const [fName, setFName] = useState("eniola");
  const [lName, setLName] = useState("bakare");
  const [category, setCategory] = useState("Reader");
  const [confirmPassword, setConfirmPassword] = useState("123Ab!");
  const [signedIn, setSignedIn] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [published, setPublished] = useState<boolean>(false);

  const upDatePosts = () => {
    setPublished(true);
  };

  const [currentUser, setCurrentUser] = useState<object | null>(null);
  // console.log(currentUser, "current user");
  const [likedLocalItems, setLikedLocalItems] = useState<likedLocalItems[]>([]);
  console.log(
    likedLocalItems,
    "from auth context ++++++++++++++++++++++++++++++++++++++++++"
  );

  useEffect(() => {
    setLikedLocalItems(currentUser?.likedItems);
  }, [currentUser?.likedItems]);
  // console.log(likedLocalItems, currentUser);

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
