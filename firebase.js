
require("dotenv").config()
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
    apiKey: process.env.APP_API,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJ_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESS_SENDER_ID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENT_ID
  };


const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(firebaseApp,process.env.storageBucket);