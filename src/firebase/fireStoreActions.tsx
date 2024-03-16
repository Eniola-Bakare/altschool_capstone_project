import { db } from "../firebase/config";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../components/contexts/AuthContext";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type NewUserProps = {
  displayName: string;
  photoURL: string;
  tenantId: string;
  fName: string;
  lName: string;
  category: string;
  uid: string;
  otp: string;
  email: string;
};


export function CreateNewUseronDB(newUser: NewUserProps) {

  console.log(newUser);
  
}
