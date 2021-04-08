// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use (사용하고 싶은 모듈 import 하기)
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK Import
import fireSDK from "./fireSDK";

const firebaseConfig = fireSDK;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Social 로그인
export const firebaseInstance = firebase;
// Auth (회원가입, 로그인)
export const authService = firebase.auth();
// FireStore DB 저장
export const dbService = firebase.firestore();
// FireStore storage 영상 저장
export const storageService = firebase.storage();
