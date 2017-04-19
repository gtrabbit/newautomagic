const pScan = require('./server/profileScan');
const bodyParser = require('body-parser');
var express = require('express');
var app = express();
const ranks = require('./server/rankingDB');
const avp = require('./server/averagesPercentiles');
const path = require('path');

app.use(bodyParser.urlencoded({extended: false}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/dist'));


app.get("/", function(req, res){
 res.sendFile(path.join(__dirname+'/dist/index.html'))

})

app.get("/getpaperlist", function(req, res){
   let website = req._parsedUrl.query
   let cb = function (paperList){
     res.send(paperList);
  }
  pScan.scrape(website, cb);
  
});

app.get("/pbf", function(req, res){
  res.send(avp.pbf)
})

app.get("/norank", function(req, res){
  let journal = Object.body;
  console.log(journal);
  
  const cb = function(){
    res.send({msg: journal + " marked as unranked"});
    
  }
res.send ("okay")
 // ranks.module.markAsUnranked(journal, cb);
  
  
});

app.post("/getranks", function(req, res){
   const cb = function(data){
  
    res.send(data)
  }

  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body).journalList;
              ranks.module.checkForRanks(body, cb);

            } 
        });
 




  
 
 
 
 // ranks.module.checkForRanks(journalList, cb)
  
});




var listener = app.listen(process.env.PORT || 8080);


