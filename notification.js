
var admin = require("firebase-admin");



var serviceAccount = require("./sayhey-app-auth-firebase-adminsdk-4pepf-f656af3d28.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports.admin = admin