import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {FacebookAuthProvider, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

}

const auth = getAuth();

export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider)
        .then(res => {
            const {displayName, photoURL, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                error: '',
                success: true
            }
            return signedInUser;
            //console.log(displayName,email,photoURL);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

export const handleFbSignIn = () => {
    const fbProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            user.success = true;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            return user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
}

export const handleSignOut = () => {
    return signOut(auth).then( res => {
        const signOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
            error: '',
            success: false
        }
        return signOutUser;
    }).catch((error) => {
        // An error happened.
    });
    //console.log("sign out");
}

export const createUserByEmailAndPassword = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const newUserInfo = user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
            // ...
        })
        .then(res=>{
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInByEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("user-not-created");
            // Signed in
            const user = userCredential.user;
            const newUserInfo = user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            console.log("sign in check",newUserInfo);
            return newUserInfo;
        })
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        console.log("username updated successfully");
        // ...
    }).catch((error) => {
        console.log(error);
    });
}
