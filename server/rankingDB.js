var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const cleaner = require('./clean')




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


rankingSchema.pre('save', function(next){
  let currentDate = new Date();
  this.updated = currentDate;
  this.markModified('updated');
  if (!this.search){
    console.log("there was not already a search field")
    this.search = [cleaner.clean(this.journalName)];
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
     rank.find({search: cleaner.clean(a)}, function(err, journals){
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
    search: cleaner.clean(journal),
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
    search: cleaner.clean(journal.journalName),
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

const updateJournal = function(journal, newInfo, ow, cb){
 
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
    if (a === "GSRank" && !ow){
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
      if (newInfo[a] || a === "GSRank"){
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

 

  rank.findOne({search: cleaner.clean(alternate)}, function(err, result){
    if (err){console.log(err)}
    if (typeof result.search === 'string'){
       result.search = [result.search];
    }
   
    if (!result.search.includes(cleaner.clean(journal))){
       result.search.push(cleaner.clean(journal));
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

 const deleteEverything = function(cb){
  rank.remove({}, function(err){
    if (err) console.log(err)
    
  })
  rank.find({}, function(err, results){
    if (err) console.log(err)
    if (!results.length){
      cb({msg: "Database is wiped"})
    } else {
      cb({msg: "" + results.length + " entries in the database"})
    }
  })
 }




const submitnew = function(body, cb){
  const callBack2 = function(message){
    cb(message);
  }
  const callBack = function (results){
    if (results.noMatch.length){
      makeNewJournalRanking(body.sub, callBack2)
    } else {
      updateJournal(results.rankedJournals[0], body.sub, body.ow, callBack2)
    }
  }
  checkForRanks([body.sub.journalName], callBack);
}


const merge = function(chart, cb){
  let noMatch = [];
  let matches = 0;
  let total = chart.length;
  console.log(chart.length)
  let errored = []
  chart.forEach(function(a){
   
    rank.find({search: a.search}, function(err, journals){
      if (err) throw err;
      if (journals.length){
        journals[0].IF = a.IF;
        journals[0].save(function(err){
          if (err) {
            console.log(err);
            console.log(journals[0])
            errored.push(journals[0])
          }
          console.log(total)
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
            console.log(err);
            console.log("Trying to handle error...")
            errored.push(makeNew);

          }
        })
        noMatch.push(a.search);
        total--;
        console.log(total);
      }
        if (total === 0){
          if (errored.length){
            errored.forEach(function(a){
              console.log(a);
            })
          }
          cb ({noMatch: noMatch, matches: matches});
  } 
    })
    
   
  })
 
}


const findAll = function(cb){
  rank.find({}, function(err, results){
    cb({msg: results.length,
        wholeDB: results})
  })

}




const tempupdate = function(){
  rank.find({}, function(err, results){
    if (err) console.log(err)

    results.forEach(a=>{
      if (a.GSRank.length){
        a.GSRank.forEach(a=>{
          a.cat = a.cat.replace(/&amp;/g, "&")

         })
      }
     a.save(function(err){
      err ? console.log(err) : console.log("success")
     })
    })


  })



}








exports.module = {
  makeArray: makeArray,
  checkForRanks: checkForRanks,
  markAsUnranked: markAsUnranked,
  submitIFL: submitIFL,
  submitnew: submitnew,
  associate: associate,
  delete: deleteRank,
  rank: rank,
  merge: merge,
  deleteEverything: deleteEverything,
  findAll: findAll,
  tempupdate: tempupdate
}