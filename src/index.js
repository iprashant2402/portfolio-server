import express from 'express';
import cors from 'cors';
import axios from 'axios';
import {parseString} from 'xml2js';

const app = express();

app.use(cors());

app.get('/', (req,res) => {
    res.redirect('/posts');
});

app.get('/posts', (req, res) => {
    axios.get('http://medium.com/feed/@iprashant2402').then(function(response){
        console.log(response.data);    
        parseString(response.data,(err,res2)=>{
            console.log(res2.rss.channel);
            res.send(JSON.stringify(res2.rss.channel[0].item));
        })
    }).catch(function(error){
        console.log(error);
    });
  });

app.listen(process.env.PORT || 3000);