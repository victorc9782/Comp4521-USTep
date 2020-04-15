import Firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyB9XGtH8pMM3HClGwSCtAYEP4z1GKc_QFA",
    authDomain: "comp4521-5739d.firebaseapp.com",
    databaseURL: "https://comp4521-5739d.firebaseio.com",
    projectId: "comp4521-5739d",
    storageBucket: "comp4521-5739d.appspot.com",
    messagingSenderId: "426679212495",
    appId: "1:426679212495:web:231eb6620c3a9657901aba",
    measurementId: "G-81NGKPSCB8"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();