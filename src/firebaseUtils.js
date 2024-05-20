// Import environment variables
var firebase = require('firebase-admin');

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(
      {
        "type": "service_account",
        "project_id": "moyennesed-v3",
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-not3e%40moyennesed-v3.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
    )
  });
}

module.exports = { firebase };