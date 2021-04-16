 import firebase from "firebase/app";
 import "firebase/database";
 import "firebase/auth";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCVOTZ5LIYAxQsf9QkPQc4HlbxbDCA45_U",
    authDomain: "scheduler-8fc47.firebaseapp.com",
    databaseURL: "https://scheduler-8fc47-default-rtdb.firebaseio.com",
    projectId: "scheduler-8fc47",
    storageBucket: "scheduler-8fc47.appspot.com",
    messagingSenderId: "706418986277",
    appId: "1:706418986277:web:519fe77f5c93055fc89ecc",
    measurementId: "G-GBLTJ2DC3S"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  export {firebase};