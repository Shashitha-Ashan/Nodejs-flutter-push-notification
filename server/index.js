const express = require("express");

const app = express();
const port = 3000;

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("api/v1/notification/send", async (req, res) => {
  const { title, body, deviceID } = req.body;
  const message = {
    notification: {
      title,
      body,
    },
    token: deviceID,
  };

  try {
    await admin.messaging().send(message);
    console.log("Notification sent successfully");
    res.status(200).send("Notification sent successfully");
  } catch (error) {
    console.log("Error sending notification: ", error);
    res.status(500).send("Error sending notification");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
