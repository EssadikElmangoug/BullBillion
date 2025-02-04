import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, OAuthProvider, FacebookAuthProvider, PhoneAuthProvider } from "firebase/auth";

const doCreateUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

const doSignInWithEmailAndPassword = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
};

const doSignInWithApple = async () => {
    const provider = new OAuthProvider('apple.com');
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
};

const doSignInWithMeta = async () => {
    const provider = new FacebookAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
};

const doSignInWithPhone = async () => {
    const provider = new PhoneAuthProvider(auth);
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
};

const doSignOut = async () => {
    return await signOut(auth);
};


export { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignInWithGoogle, doSignInWithApple, doSignInWithMeta, doSignOut };

