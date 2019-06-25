import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import {parseString} from 'xml2js';
const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/posts/', (req, res) => {
    axios.get('https://medium.com/feed/@oldirony').then(function(response){    
        parseString(response.data,(err,res2)=>{
            res.send(JSON.stringify(res2.rss.channel[0].item));
        })
    }).catch(function(error){
        console.log(error);
    });
  });

app.listen(PORT,() => {
    console.log("Listening on port : " + PORT);
});