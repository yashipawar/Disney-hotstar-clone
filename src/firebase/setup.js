
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCPUuxguSZtYx-A3yxrfmYjMNT5Ox_Dq9s",
  authDomain: "disney-clone-ce815.firebaseapp.com",
  projectId: "disney-clone-ce815",
  storageBucket: "disney-clone-ce815.appspot.com",
  messagingSenderId: "234095423005",
  appId: "1:234095423005:web:b4277f02c33062385aa0f4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)