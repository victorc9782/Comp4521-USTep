/*
#COMP 4521 
#Chu Chun Wai 20344464 cwvchu@connect.ust.hk
#Yip Pak Kin 20360422 pkyipab@connect.ust.hk
#Man Ho Yin 20306137 hymanae@connect.ust.hk
*/
import firebase from "firebase";


const config = {
    apiKey: "AIzaSyB9XGtH8pMM3HClGwSCtAYEP4z1GKc_QFA",
    authDomain: "comp4521-5739d.firebaseapp.com",
    databaseURL: "https://comp4521-5739d.firebaseio.com",
    projectId: "comp4521-5739d",
    storageBucket: "comp4521-5739d.appspot.com",
    messagingSenderId: "426679212495",
    appId: "1:426679212495:web:231eb6620c3a9657901aba",
    measurementId: "G-81NGKPSCB8"
};

let apps = firebase.apps
if (!apps.length) {
    apps = firebase.initializeApp(config);
}


export const database = apps.database();
export const storage = apps.storage();
export const auth = apps.auth();
