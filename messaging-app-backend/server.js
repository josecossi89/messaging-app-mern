import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages";
//App Config
const app = express();
const port = process.env.PORT || 9000;
const connection_url =
  "mongodb+srv://josecossib:hokkaido@cluster0.5u6qsjw.mongodb.net/messagingDB?retryWrites=true&w=majority";
//Middleware

//DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
});
//API Endpoints
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
