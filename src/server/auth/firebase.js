// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
const  { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeJJvuui-2DN0UnLC6jN2FvqyTdPpHYQo",
  authDomain: "fir-auth-aa7e2.firebaseapp.com",
  projectId: "fir-auth-aa7e2",
  storageBucket: "fir-auth-aa7e2.appspot.com",
  messagingSenderId: "126898272854",
  appId: "1:126898272854:web:f4c198b47aa961e4f6d9f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

module.exports =  auth ;
