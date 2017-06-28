const pScan = require('./server/profileScan');
const bodyParser = require('body-parser');
var express = require('express');
var app = express();
const ranks = require('./server/rankingDB');
const scraper = require('./server/scraper');
const path = require('path');
const makePBFChart = require('./server/makePBFChart');
const mongoose = require('mongoose');
const users = require('./server/users');
const merge = require('./server/mergeIF');
const makePDFtest = require('./server/makePDFtest');

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


app.get("/tempupdate", function(req, res){
  ranks.module.tempupdate();
})


app.post('/getpdfs', function(req, res){
  const cb = function(data){
    res.send(data);
  }

  app.get('/tmp/:uid', function(req, res){
    let uid = req.params.uid;
    res.download(__dirname+'/tmp/' + uid + '/pldocs.zip')
  })


  let body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body)
              console.log(body);
              makePDFtest.module.makePDF(body, cb);
            } 
        });
})

app.post('/admin/updatepbf', function(req, res){
  
  const cb = function(data){
    res.send({msg: data});
  }

  let body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body)
    
              makePBFChart.module.makeChart(body.averages, body.percentiles, body.year, cb);
            

            } 
        });

})

app.get("/admin/deleteeverything", function(req, res){
  const cb = function(data){
    res.send(data)
  }
  ranks.module.deleteEverything(cb);
})


app.get("/admin/scrape", function(req, res){
  const cb = function(data){
    res.send(data);
  }
  scraper.module.scrape("http://scholar.hipr.com/citations?view_op=top_venues&hl=en&vq=en", cb)

})

app.get('/login/:user/:pw', function(req, res){
  const cb = function(data){
    res.send(data);
  }

  users.module.checkUser(req.params.user, req.params.pw, cb)

})

app.get("/admin/delete/:user", function(req, res){
   const cb = function(data){
    res.send({msg: data})
  }

  let username = req.params.user;
  users.module.deleteUser(username, cb)


})

app.get('/ranks/total', function(req, res){
  const cb = function(data){
    res.send(data)
  }
  ranks.module.findAll(cb);

})


app.post("/admin/create", function(req, res){
  const cb = function(data){
    res.send({msg: data})
  }
let body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body)
              users.module.createNew(body, cb);

            } 
        });

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
  const cb = function(result){
    res.send({msg: result})
  }
  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body);
              ranks.module.associate(body.journal, body.result, cb);
              } 
        });



})

app.post('/delete', function(req, res){
  const cb = function(data){
    res.send({msg: data})
  }
  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              body = JSON.parse(body);
              if (body.search.length){
                ranks.module.delete(body, cb);
              }
              
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


   let cb = function (paperList, body){

     res.send({
      paperList: paperList,
      body: body});
  }
  
  
});

app.get("/pbf", function(req, res){
  const cb = function(chart){
    res.send(chart)
  }
  makePBFChart.module.giveChart(cb)
  
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

app.post('/mergeifs', function(req, res){
  const cb = function(data){
    res.send(data);
  }

  var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            if (body) {
              let IFchart = merge.createJSON(body);
              ranks.module.merge(IFchart, cb)
            } 
        });

  


})


app.get('/getcitingpapers/:url', function(req, res){
  const cb = function(data){
    res.send(data)
  }
  website = "https://scholar.google.com/scholar?oi=bibs&hl=en&cites=".concat(req.params.url)
  scraper.module.citingPapers(website, cb)
 
})


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


const temporary = function(){
  return ranks.module.tempUpdate()
}


var listener = app.listen(process.env.PORT || 8080);


