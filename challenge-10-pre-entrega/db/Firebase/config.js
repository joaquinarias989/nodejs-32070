var admin = require("firebase-admin");

var serviceAccount = require("./firebase-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log("Firebase connected!");

module.exports = { db };
