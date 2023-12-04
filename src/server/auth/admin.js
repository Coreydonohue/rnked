const admin = require("firebase-admin");
const credentials = require("./credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
  })
  
  // console.log("admin from main", admin)

  module.exports = admin;