import express from "express";
import cors from "cors";
import axios from "axios";
import { parseString } from "xml2js";
import Expo from "expo-server-sdk";
const bodyParser = require("body-parser");
var http = require("https");
const querystring=require('querystring');
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
    to: "ExponentPushToken[-uOKZ5IW-0jIsQGZ_Oi2lw]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[BjCZm6MbMFBMQogPfLgjtJ]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[pkgunlOqbUYS-Krpn3HocP]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[lor0vxCTqI-SUouDwa-igW]",
    sound: "default",
    title: "NEW ORDER",
    body: "New order has been placed.",
    data: { somedata: "new order" },
    priority: "high"
  });
  messages.push({
    to: "ExponentPushToken[lHaecrNxwnG10I1aJPXJK6]",
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

app.post('/api/sendotp',(request,response,next) =>
{
    var flag=0;
    const params={
        template_id:'5dac02d7d6fc05265e48f5f1',
        mobile:request.body.phone,
        authkey:'299889AtoI1ccEli5dabf539',
        otp_length:6,
        otp_expiry:1,
        invisible:1
    }

    const postdata=querystring.stringify(params);
    // console.log(postdata);

    var options={
        'method' : 'POST',
        'hostname' : 'control.msg91.com',
        'port' : null,
        'path' : `api/sendotp.php?${postdata}`,
        "headers" : {}
    };
    var url=`https://api.msg91.com/api/v5/otp?${postdata}`;
    
    console.log(url);
    var req=http.request(url,(res)=>{
        var chunks=[];
        res.on("data",(chunk)=>{chunks.push(chunk);});
        res.on("end",()=>{
            var body=Buffer.concat(chunks);
            var obj=JSON.parse(body.toString());
            // code_id=obj.message;
            //type=obj.type;
            if(obj.type=='error'){
                flag=1;
            }
            console.log(obj);
        });
    });
    if(flag==1)
        response.status(404).send(`{"message":"Some error Occured"}`);
    else
        response.send(`{"message":"otp sent successfully"}`);
    req.end();
});

app.post('/api/resendotp',(request,response,next)=>
{
    const params={
        country:91,
        retrytype:'text',
        mobile : request.headers.pno,
        authkey : '299889AtoI1ccEli5dabf539',
    };

    var flag=0;
    var mobileResponse;
    var query=querystring.stringify(params);
    console.log(query);
    var url=`https://control.msg91.com/api/retryotp.php?${params}`;
    var req=http.request(url,(res)=>{
        var chunks=[];
        res.on("data",(chunk)=>{chunks.push(chunk);});
        res.on("end",()=>{
            var body=Buffer.concat(chunks);
            console.log(body.toString());
            var obj=JSON.parse(body.toString());
            if(obj.type===`error`){
                flag=1;
            }
            console.log(obj);
            mobileResponse=obj;
        });
    });
    if(flag==0)
        response.send(mobileResponse);
    else
        response.send({message:"Error Occured"});
    req.end();
});

app.post('/api/verifyotp',(request,response,next)=>
{
    var flag=0;
    var mobileResponse;
    const params={
        otp : request.body.otp,
        mobile : request.body.phone,
        authkey : '299889AtoI1ccEli5dabf539',
        // request_id : code_id
    };
    var query=querystring.stringify(params);
    var url=`https://api.msg91.com/api/v5/otp/verify?${query}`;

    var req=http.request(url,(res)=>{
        var chunks=[];
        res.on("data",(chunk)=>{
            chunks.push(chunk);
        });
        res.on("end",()=>{
            var body=Buffer.concat(chunks);
            var obj=JSON.parse(body.toString());
            console.log(obj);
            if(obj.type==`error`){
                flag=1;
            }
        });
    });
    if(flag==0)
    response.send({success:true});
    else
        response.send({success:false});
    req.end();
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port 3000");
});
