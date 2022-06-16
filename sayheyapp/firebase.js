import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDowaVAU4kbig2of4eNRnV73I11vxnuol4",
  authDomain: "sayhey-otpverify.firebaseapp.com",
  projectId: "sayhey-otpverify",
  storageBucket: "sayhey-otpverify.appspot.com",
  messagingSenderId: "514227093527",
  appId: "1:514227093527:web:0444ac3ff7445df1f09c52",
  measurementId: "G-6B553L3VRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);