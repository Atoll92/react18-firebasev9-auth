const functions = require("firebase-functions");
// const fetchAll = require("../src/components/FetchAll");
const admin = require("firebase-admin");
// const firestore = require("firestore")


// const { app } = require("firebase-admin");

admin.initializeApp()

// var admin = require("firebase-admin");

// // Fetch the service account key JSON file contents
// var serviceAccount = require("path/to/serviceAccountKey.json");

// // Initialize the app with a service account, granting admin privileges
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // The database URL depends on the location of the database
//   databaseURL: "https://DATABASE_NAME.europe-west1.firebasedatabase.app"
// });

// // As an admin, the app has access to read and write all data, regardless of Security Rules
// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

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



// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    console.log('This will be run every 5 minutes!');
    fetchAll()
    return null;
  });


  exports.detectLoginActivity = functions.firestore.document('/users/{userId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
    //   const original = snap.data().domaine_array;
      const original1 = snap.data();

      // Access the parameter `{documentId}` with `context.params`
    //   functions.logger.log('domaine_array', context.params.userId, original);
      functions.logger.log('rawsnap', context.params.userId, original1);
      
      const uppercase = original1.toUpperCase();
      
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });


  // Listen for changes in all documents in the 'users' collection and all subcollections


// Listen for changes in all documents in the 'users' collection
exports.detectAnyChangeToUsers = functions.firestore
    .document('users/{userId}')
    .onWrite((change, context) => {
      // If we set `/users/marie` to {name: "Marie"} then
      // context.params.userId == "marie"
      // ... and ...
      console.log("users changed")
      functions.logger.log(context.params.userId)
      functions.logger.log(change.after.data())
    });



 async function fetchAll() {
    console.log("fetching all")
    const users = admin.firestore().collection('users')
    const user = await users.where('domaine_array', '!=', false).get()
    console.log("user.val") 
    console.log(user.val()) 
    console.log("user.ref") 
    console.log(user.ref) 
    console.log("user.data") 
    console.log(user.data()) 
    user.forEach(snapshot => {
        console.log(snapshot.val()) 
    })
}