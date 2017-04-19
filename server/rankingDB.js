var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://HLG:automagic123@ds129050.mlab.com:29050/learningthis");


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

exports.module = {
  makeArray: makeArray,
  checkForRanks: checkForRanks,
  makeClean: clean,
  markAsUnranked: markAsUnranked
}