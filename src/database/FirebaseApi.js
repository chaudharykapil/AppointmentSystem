import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCld9zdmNzrWuH9_vmHLuMBOARKlXDhQJU",
    authDomain: "appointmentsystem-d837d.firebaseapp.com",
    projectId: "appointmentsystem-d837d",
    storageBucket: "appointmentsystem-d837d.appspot.com",
    messagingSenderId: "214424884769",
    appId: "1:214424884769:web:79d3468a25db6871d93560",
    measurementId: "G-FX1YFF1N8V",
    databaseURL:"https://appointmentsystem-d837d-default-rtdb.firebaseio.com"
  };
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
export default database