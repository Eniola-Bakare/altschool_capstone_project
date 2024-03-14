import { ReactNode, createContext, useContext, useState } from "react";

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
};
const AuthContext = createContext<AuthContextTYPE | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setEmail] = useState("eebakare@gmail.com");
  const [password, setPassword] = useState("kkkkkkkk");
  const [fName, setFName] = useState("eniola");
  const [lName, setLName] = useState("bakare");
  const [category, setCategory] = useState("reader");
  const [confirmPassword, setConfirmPassword] = useState("kkkk");
  const [signedIn, setSignedIn] = useState(false);

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
