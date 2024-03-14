import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextTYPE = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};
const AuthContext = createContext<AuthContextTYPE | undefined>(undefined);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setEmail] = useState<string>("eebakare@gmail.com");
  const [password, setPassword] = useState<string>("kkkk");
  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword }}>
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
