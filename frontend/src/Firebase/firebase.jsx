// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';


  console.log("API Key:", import.meta.env.VITE_APP_API_KEY);
  const apiKey =import.meta.env.VITE_APP_API_KEY
  console.log("Auth Domain:", import.meta.env.VITE_APP_AUTH_DOMAIN);

const firebaseConfig = {
  apiKey:import.meta.env.VITE_APP_API_KEY,
  authDomain:import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket:import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId:import.meta.env.VITE_APP_APP_ID,
  measurementId:import.meta.env.VITE_APP_MEASUREMENT_ID
};
console.log('config',firebaseConfig)

// const firebaseConfig = {
//   apiKey: "AIzaSyBYMi4B8hFwYGfxCywGcuqgyaINkQpljVk",
//   authDomain: "buggsbunny.firebaseapp.com",
//   projectId: "buggsbunny",
//   storageBucket: "buggsbunny.appspot.com",
//   messagingSenderId: "1068008077997",
//   appId: "1:1068008077997:web:8f88ff68bb2883c7dfa424",
//   measurementId: "G-PSS7DN59WS"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth}