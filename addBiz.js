// businessInsert.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getFirestore, collection, addDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDBRStTIC5mPjfLWW0Gej-VfIYhGKrJpkw",
  authDomain: "desertbadges.firebaseapp.com",
  projectId: "desertbadges",
  storageBucket: "desertbadges.firebasestorage.app",
  messagingSenderId: "333860964523",
  appId: "1:333860964523:web:54412685f155873f2dcfee",
  measurementId: "G-SRN3H0MP11"
};
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
export const db = getFirestore(app);

// (Optional) keep analytics if you want
// const analytics = getAnalytics(app);

async function addBusiness(businessID, name, type) {
  try {
    await addDoc(collection(db, "businesses"), {
      businessID,
      name,
      type,
    });
    console.log(`✅ Business "${name}" added successfully`);
  } catch (e) {
    console.error("❌ Error adding business:", e);
  }
}

// Example usage: insert one business
addBusiness("SALON123", "Glamour Salon", "salon");
addBusiness("GARAGE123", "Speedy Garage", "garage");
