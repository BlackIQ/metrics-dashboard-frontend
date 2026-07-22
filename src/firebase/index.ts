import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCcpEGZ7zXjxAE1oxXcyDA-M6xDwfeyQb0",
  authDomain: "openhubble-cloud.firebaseapp.com",
  projectId: "openhubble-cloud",
  storageBucket: "openhubble-cloud.firebasestorage.app",
  messagingSenderId: "630599906091",
  appId: "1:630599906091:web:e157d67c4ef29e38ac0b6e",
  measurementId: "G-SGS0TFX63V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// OAuth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Google Login Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    return { idToken, user: result.user };
  } catch (error) {
    throw new Error(error.message);
  }
};

// GitHub Login Function
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const idToken = await result.user.getIdToken();

    return { idToken, user: result.user };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Facebook Login Function
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const idToken = await result.user.getIdToken();
    return { idToken, user: result.user };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Exports
export { app, auth, googleProvider, githubProvider, facebookProvider };
