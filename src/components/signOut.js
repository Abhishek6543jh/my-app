import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
const Logout = async () => {
    try{
    await signOut(auth);
    }
    catch(error){
      console.log(error);
    }
}
export default Logout;