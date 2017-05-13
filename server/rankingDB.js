var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');




const rankingSchema = new Schema({
  journalName: {type: String, required: true, unique: true},
  search: Schema.Types.Mixed,
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
  this.markModified('updated');
  if (!this.search){
    console.log("there was not already a search field")
    this.search = [clean(this.journalName)];
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
    console.log("the information found reads")
    console.log(a, " : ", journal[a]);
    console.log("information we are adding")
    console.log(a, " : ", newInfo[a]);
    //another safeguard
    if (!(a === null || a === undefined)){
 //special case for dealing with GS ranks
    if (a === "GSRank"){
      let newCats = [];
      newInfo.GSRank.forEach(function(a){
        if (a.cat !== undefined){
          newCats.push(a.cat);
        }
        
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

 //otherwise, we just overwrite what was there
    } else {
     //yet another safeguard against unintentionally sending
     //empty data
      if (newInfo[a]){
        journal[a] = newInfo[a];
      }
    }  
    }  
  })
  //extra protection
  if (journal.GSRank.length === 1){
    if (journal.GSRank[0].cat === undefined){
      journal.GSRank = undefined;
    }
  }
  console.log(journal);
  journal.save(function(err){
    if (err){
      message = "failed";
    } else {
      cb(message + journal);
    }

  })



}

const associate = function(journal, alternate, cb){
  console.log(journal)
  console.log("alternate is", alternate);
  console.log("cleaned verion is ", clean(journal));
 

  rank.findOne({search: clean(alternate)}, function(err, result){
    if (err){console.log(err)}
    if (typeof result.search === 'string'){
       result.search = [result.search];
    }
   
    if (!result.search.includes(clean(journal))){
       result.search.push(clean(journal));
      console.log(result);
      result.markModified('search');
      result.save();
    }
    cb(result);
   
  })
 


}
    
 
 const deleteRank = function(body, cb){
  rank.remove({search: body.search}, function(err, results){
    if (err){
      console.log(err)
    }
    cb(results);
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


const merge = function(chart, cb){
  let noMatch = [];
  let matches = 0;
  let total = chart.length;
  console.log(chart)
  console.log(chart.length)
  chart.forEach(function(a){
   
    rank.find({search: a.search}, function(err, journals){
      if (err) throw err;
      if (journals.length){
        journals[0].IF = a.IF;
        journals[0].save(function(err){
          if (err) throw err;
        })
        
        matches++;
        total--;
      } else {
        let makeNew = new rank({
          journalName: a.journalName,
          IF: a.IF,
          search: a.search
        });
        makeNew.save(function(err){
          if (err) {
            console.log(makeNew);
            throw err;
          }
        })
        noMatch.push(a);
        total--;
      }
        if (total === 0){
    cb ({noMatch: noMatch, matches: matches});
  } 
    })
    
   
  })
 
}



exports.module = {
  makeArray: makeArray,
  checkForRanks: checkForRanks,
  makeClean: clean,
  markAsUnranked: markAsUnranked,
  submitIFL: submitIFL,
  submitnew: submitnew,
  associate: associate,
  delete: deleteRank,
  rank: rank,
  merge: merge
}