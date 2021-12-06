var admin = require("firebase-admin");
var serviceAccount = require("./abc-2021-database-firebase-adminsdk-ur2dg-5bc1a07f84.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://abc-2021-database-default-rtdb.asia-southeast1.firebasedatabase.app"
});
// const database = getDatabase(firebaseApp);
const database = admin.database();
// Create a new rerference -- essentially a key/section on the db
// in this application we can put all our information under the same key
// check your friebase console (after pushing data for the first time)
// to understand better what this means
// from: https://firebase.google.com/docs/database/web/read-and-write
const messageListRef = database.ref('messages/');
messageListRef.push().set("hiiii");
