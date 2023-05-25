import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDOScmhjihHzRej2xftUq5huBWh2-WfbRA",
    authDomain: "desafio-full.firebaseapp.com",
    projectId: "desafio-full",
    storageBucket: "desafio-full.appspot.com",
    messagingSenderId: "672769647027",
    appId: "1:672769647027:web:eaab556e9ce400553cabc6"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const calculosDB = collection(db, 'calculos')

export default calculosDB 


