import {
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import {
  auth
} from "../config/firebase.config";

const googleProider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProider).then((useCred) => {
    window.location.reload();
  });
};

export const signOutAction = async () => {
  await auth.signOut().then(() => {
    window.location.reload();
  });
};