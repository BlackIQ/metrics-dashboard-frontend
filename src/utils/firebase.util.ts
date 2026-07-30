import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import firebaseSettings from "@/core/firebase/firebase.config";

const firebaseConfig = {
  apiKey: firebaseSettings.apiKey,
  authDomain: firebaseSettings.authDomain,
  projectId: firebaseSettings.projectId,
  storageBucket: firebaseSettings.storageBucket,
  messagingSenderId: firebaseSettings.messagingSenderId,
  appId: firebaseSettings.appId,
  measurementId: firebaseSettings.measurementId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<string> => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();

  return idToken;
};
