const pScan = require('./server/profileScan');
const bodyParser = require('body-parser');
var express = require('express');
var app = express();
const ranks = require('./server/rankingDB');
const avp = require('./server/averagesPercentiles');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://HLG:automagic123@ds129050.mlab.com:29050/learningthis");

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

app.post("/submitrank", function(req, res){
   const cb = function(message){
    res.send({msg: message})
  }
  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body)
              ranks.module.submitnew(body, cb);

            } 
        });
})

app.post('/associate', function(req, res){
  const cb = function(journal, ranking){
    res.send({msg: "we recieved " + journal + ranking})
  }
  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body)
              cb(body.journal, body.result)

            } 
        });



})

app.post("/submitIFL", function(req, res){
  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body)
              ranks.module.submitIFL(body, cb);

            } 
        });
  
  const cb = function(journal){
    res.send({msg: "Link submitted for " +journal});
    
  }
})

app.post("/getpaperlist", function(req, res){
  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              pScan.scrape(body, cb);

            } 
        });


   let cb = function (paperList){
     res.send(paperList);
  }
  
  
});

app.get("/pbf", function(req, res){
  res.send(avp.pbf)
})

app.post("/norank", function(req, res){
   var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              ranks.module.markAsUnranked(body, cb);

            } 
        });
  
  const cb = function(){
    res.send({msg: body + " marked as unranked"});
    
  }


  
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
});


var listener = app.listen(process.env.PORT || 8080);


