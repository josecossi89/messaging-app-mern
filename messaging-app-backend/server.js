import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
//App Config
const app = express();
const port = process.env.PORT || 9000;
const connection_url =
  "mongodb+srv://josecossib:hokkaido@cluster0.5u6qsjw.mongodb.net/messagingDB?retryWrites=true&w=majority";
const pusher = new Pusher({
  appId: "1470960",
  key: "a3b2ead073a9ec534215",
  secret: "01a95a3840ef0b315a70",
  cluster: "us2",
  useTLS: true,
});
//Middleware
app.use(express.json());
app.use(Cors());
//DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
});
//API Endpoints

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagingmessages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error trigerring Pusher");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello TheWebDev");
});
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//Listener
app.listen(port, () => {
  console.log(`Listening on localhost: ${port}`);
});
