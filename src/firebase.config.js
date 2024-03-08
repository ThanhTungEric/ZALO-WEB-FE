// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB103nVc-IHnCgqwdxMoq64A0aKb3-G5F8",
    authDomain: "otp-project-93b5f.firebaseapp.com",
    projectId: "otp-project-93b5f",
    storageBucket: "otp-project-93b5f.appspot.com",
    messagingSenderId: "555234309102",
    appId: "1:555234309102:web:7f8d745e4fc44d723a14ff",
    measurementId: "G-8ZJX9BHBKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);