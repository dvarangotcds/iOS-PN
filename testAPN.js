require('dotenv').config()
var apn = require('apn');

var certFilePath = process.env.CERTIFICATE_PEM_FILE_PATH
var pkFilePath = process.env.PRIVATE_KEY_PEM_FILE_PATH

if (certFilePath == null) {
  console.log("Missing env var => CERTIFICATE_PEM_FILE_PATH")
}

if (pkFilePath == null) {
  console.log("Missing env var => PRIVATE_KEY_PEM_FILE_PATH")
}

var prod = process.env.IS_PROD || false
var options = {
  cert: certFilePath,
  key: pkFilePath,
  production: prod
};

var apnProvider = new apn.Provider(options);

let deviceToken = "c8d5fa476b07f049c6404040bba3d07c0f870b0322464a259c82542963413bf5"

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "You have a new message";
note.payload = {'messageFrom': 'John Appleseed'};
note.topic = process.env.BUNDLE_IDENTIFIER;

apnProvider.send(note, deviceToken).then( (result) => {
  console.log(result)
});