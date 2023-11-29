
const  { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");



const firebaseConfig = {
  apiKey: "AIzaSyBeJJvuui-2DN0UnLC6jN2FvqyTdPpHYQo",
  authDomain: "fir-auth-aa7e2.firebaseapp.com",
  projectId: "fir-auth-aa7e2",
  storageBucket: "fir-auth-aa7e2.appspot.com",
  messagingSenderId: "126898272854",
  appId: "1:126898272854:web:f4c198b47aa961e4f6d9f7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

module.exports = auth ;

