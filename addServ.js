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

async function addService(businessID, name, category) {
  try {
    await addDoc(collection(db, "services"), {
      businessID,   // link service to a business
      name,         // service name (Oil Change, AC Repair…)
      category,     // optional: garage, salon, etc
    });
    console.log(`✅ Service "${name}" added for business ${businessID}`);
  } catch (e) {
    console.error("❌ Error adding service:", e);
  }
}

// Example: Add services for GARAGE123
addService("GARAGE123", "Oil Change", "garage");
addService("GARAGE123", "AC Repair", "garage");
addService("GARAGE123", "Brake Service", "garage");
addService("GARAGE123", "Car Wash", "garage");

addService("SALON123", "Hair Services", "salon");
addService("SALON123", "Nail Services", "salon");
addService("SALON123", "Facial Services", "salon");
addService("SALON123", "Spa Services", "salon");