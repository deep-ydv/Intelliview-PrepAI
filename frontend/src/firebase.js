import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  // 🔹 your firebase config here
    apiKey: import.meta.env.firebase.apiKey,
  authDomain: import.meta.env.firebase.authDomain,
  projectId: import.meta.env.firebase.projectId,
  storageBucket: import.meta.env.firebase.storageBucket,
  messagingSenderId: import.meta.env.firebase.apiKey.messagingSenderId,
  appId: import.meta.env.firebase.apiKey.appId,
  measurementId: import.meta.env.firebase.measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


// From Google 

// Import the functions you need from the SDKs you need



// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBODWBp7uO0tp_EjwIkuca-yaPxx1Fkslc",
//   authDomain: "interviewprepai-618ca.firebaseapp.com",
//   projectId: "interviewprepai-618ca",
//   storageBucket: "interviewprepai-618ca.firebasestorage.app",
//   messagingSenderId: "651094890329",
//   appId: "1:651094890329:web:0346dce7d2e4da66e75e48",
//   measurementId: "G-MV7QN9W6XY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);