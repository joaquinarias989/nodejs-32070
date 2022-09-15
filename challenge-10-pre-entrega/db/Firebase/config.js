var admin = require("firebase-admin");

var serviceAccount = require("./streetwear-ecommerce-firebase-adminsdk-8lv70-92cac8ae1d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase connected!");
