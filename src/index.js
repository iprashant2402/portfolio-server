import express from "express";
import cors from "cors";
import axios from "axios";
import { parseString } from "xml2js";
import Expo from "expo-server-sdk";
const bodyParser = require("body-parser");
require("babel-core/register");
require("babel-polyfill");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  axios
    .get("http://medium.com/feed/@iprashant2402")
    .then(function(response) {
      console.log(response.data);
      parseString(response.data, (err, res2) => {
        console.log(res2.rss.channel);
        res.send(JSON.stringify(res2.rss.channel[0].item));
      });
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.get("/newOrderNotification", (req, res) => {
  let expo = new Expo();
  let messages = [];
  messages.push({
    to: "ExponentPushToken[liwdDpDyhZfoznrnPbkNOJ]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[fWAPboPn-xWMUBikgE-zIj]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[HlFrpiGJeo9bo7nUKp93k-]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[9z8tQaGU2mkQiLAv5NLS7b]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[jHNpOaLviMHOkYQWi-3sQV]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(error);
      }
    }

    for (let ticket of tickets) {
      console.log(ticket);
    }
  })();

  res.send("NEW ORDER");
});

app.post("/selectedUsers", (req, res) => {
  let expo = new Expo();
  let messages = [];
  const postTokens = req.body.tokens;
  const postTitle = req.body.title;
  const postContent = req.body.content;
  postTokens.forEach(item => {
    if(Expo.isExpoPushToken(item)){
    messages.push({
        to: item,
        sound: "default",
        title: postTitle,
        body: postContent,
        data: { somedata: "new order" },
        priority: "high"
      });
    } 
  });
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(error);
      }
    }

    for (let ticket of tickets) {
      console.log(ticket);
    }
  })();
  res.send("YEAH");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port 3000");
});
