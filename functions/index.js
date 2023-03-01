const functions = require("firebase-functions");
// const fetchAll = require("../src/components/FetchAll");
const admin = require("firebase-admin");
// const { app } = require("firebase-admin");

admin.initializeApp()

// import app from "../src/firebase-config";
// import { db } from "../src/firebase-config";

// import fetchAll from "../src/components/FetchAll";
// import { db } from "../src/firebase-config";

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    console.log('This will be run every 5 minutes!');
    fetchAll()
    return null;
  });



 async function fetchAll() {
    console.log("fetching all")
    const users = admin.firestore().collection('users')
    const user = await users.where('domaine_array', '!=', false).get()
    console.log("user") 
    console.log(user) 
    user.forEach(snapshot => {
        console.log(snapshot.ref.data()) 
    })
}