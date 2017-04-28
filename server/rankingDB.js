var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');



const rankingSchema = new Schema({
  journalName: {type: String, required: true, unique: true},
  search: String,
  updated: Date,
  noRank: Boolean,
  complete: Boolean,
  GSRank: [{
    rank: Number,
    cat: String,
    catLink: {
      DL: Boolean,
      link: String
    }
  }],
  IF: Number,
  IFLink: String
    
})

const clean = function (a){
   a = a.toLowerCase().replace(/\s(and|&)\s/g, " ").replace(/[^\s\w]/g, " ").replace(/\s+/g, " ").trim();
  return (a);
}

rankingSchema.pre('save', function(next){
  let currentDate = new Date();
  this.updated = currentDate;
  if (!this.search){
    this.search = clean(this.journalName);
  }
  next();
});

var rank = mongoose.model("rank", rankingSchema);

//receives list of journals, returns ranks for those that match and a list of those without
const checkForRanks = function(journalList, cb){
  let rankedJournals = [];
  let noMatch = [];
  let total = journalList.length;
 
  journalList.forEach(function(a){
     rank.find({search: clean(a)}, function(err, journals){
       total--;
       if (err) throw err;
       
       if (journals.length){
         rankedJournals.push(journals[0])
       } else {
         noMatch.push(a);
       }
       if (total === 0){
         
         cb({
             rankedJournals: rankedJournals,
             noMatch: noMatch});
       }
     })
  })
  
}

const markAsUnranked = function(journal, cb){
  let unranked = new rank({
    journalName: journal,
    search: clean(journal),
    noRank: true,
    complete: true,
    });
  unranked.save(function(err){
    if (err){
      throw err;
    }
    cb();
  });
  
}


const makeArray = function(journalList){
  let newList = [];
  for (let items in journalList){
    newList.push(journalList[items]);
  }
  return newList;
}

const submitIFL = function(body, cb){
  rank.findOne({journalName: body.journal.journalName}, function(err, result){
    if (err){console.log(err)}
    result.IFLink = body.link;
    result.save();
    cb(body.journal);

  })
}

const makeNewJournalRanking = function(journal, cb){
  let message = "success";
  let newJournal = new rank({
    journalName: journal.journalName,
    search: clean(journal.journalName),
    noRank: journal.noRank,
    GSRank: journal.GSRank,
    complete: true,
    IF: journal.IF,
    IFLink: journal.IFLink
  })
  newJournal.save(function(err){
    if (err){
      message = "failed to create new journal";
    }
    cb(message);
  })
}

const updateJournal = function(journal, newInfo, cb){
  let message = "success for ";
  let props = Object.keys(newInfo);
  props.forEach(function(a){
    if (a === "GSRank"){
      let newCats = [];
      newInfo.GSRank.forEach(function(a){
        newCats.push(a.cat);
      })
      let oldCats = [];
      journal.GSRank.forEach(function(a, i){
        oldCats.push(a.cat, i);
      })
    
      newCats.forEach(function(a, i){
        if (oldCats.includes(a)){
          journal.GSRank[oldCats[oldCats.indexOf(a)+1]] = newInfo.GSRank[i];
        } else {
          journal.GSRank.push(newInfo.GSRank[i]);
        }
      })


    } else {
      journal[a] = newInfo[a];
    }    
  })
  journal.save(function(err){
    if (err){
      message = "failed";
    } else {
      cb(message + journal);
    }

  })



}



const submitnew = function(body, cb){
  const callBack2 = function(message){
    cb(message);
  }

  const callBack = function (results){
    if (results.noMatch.length){
      makeNewJournalRanking(body, callBack2)
    } else {
      updateJournal(results.rankedJournals[0], body, callBack2)
    }

  }
  checkForRanks([body.journalName], callBack);
}


exports.module = {
  makeArray: makeArray,
  checkForRanks: checkForRanks,
  makeClean: clean,
  markAsUnranked: markAsUnranked,
  submitIFL: submitIFL,
  submitnew: submitnew
}