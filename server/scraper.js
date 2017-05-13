//set up dependencies or whatever
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const tinyreq = require('tinyreq');
const rank = require('./rankingDB').module.rank;


// the meat, so to speak

let erroredPages = [];

const scrapeRanks = function(body, link){
 // console.log("this has been called");
  const topReg = /<td class="gs_title">(.*?)<\/td>/g;
  const cNReg = /Top publications - (.*?)(?=<\/h3)/;

  if (!cNReg.exec(body)){
    console.log("encountered something unexpected");
    erroredPages.push(link);
    console.log(body);
  } else {


  
  let CatName = cNReg.exec(body)[1];
  let category = body.match(/<table id="gs_cit_list_table">.+<td class="gs_pos">11./g);
  let TopCat = category[0].match(topReg);
  
  
  
  let ranks = {cat: CatName,
              top10: []};
  TopCat.forEach(function(a){
    let b = a.match(/>.+</)[0];
    b = b.replace(/&amp;/g, "&");
    b = b.replace(/&#8211;/g, "--");
    b = b.replace(/&#8208;/g, "-");
    ranks.top10.push(b.slice(1, b.length-1));
             
    });
   
    submitRanks(ranks, link);
    }
    }

const findLinks = function (body){
  let nav = body.match(/<ul class="gs_ibl">.+<\/ul>/g)[0].replace(/amp;/g, "");
  let cats = nav.match(/href="(.*?)"/g)
  let links = []
  cats.forEach(function(a){
    a=a.slice(6);
    links.push("http://scholar.hipr.com"+a.slice(0, a.length-1));
    })
  return links;
  }


const checkDups = function (a, cat){
  for (let i=0; i<a.length; i++){
    if (a[i].cat === cat){
      return true;
    }
  }
  return false;
}
//cleans title of punc and caps for easy searching

const clean = function (a){
 
  a = a.toLowerCase().replace(/\s(and|&)\s/g, " ").replace(/[^\s\w]/g, " ").replace(/\s+/g, " ").trim();
  return (a);
}

const submitRanks = function (ranks, link){
   
    ranks.top10.forEach(function(a, i){
      let search = clean(a);
      let position = i+1;
      let category = ranks.cat;
      rank.find({search: search}, function(err, journal){
        if (err) {
          console.log(err);
        };
        
        if (!journal.length){
          
          let newJournal = new rank({
            journalName: a,
            search: search,
            GSRank: [{
              rank: position,
              cat: category,
              catLink: {
                DL: false,
                link: link
              }
            }],
            IF: "",
            IFLink: ""
  })
        newJournal.save(function(err){
          if (err) {
            console.log(err)
            let msg = "An error occured. Please run the scrape again. Sometimes multiple attempts are necessary.";
            console.log(msg);
          } else {
            console.log("found a new journal and saved it")
          }
         
    
  })
          
          
          
        } else {
          if (!checkDups(journal[0].GSRank, category)){
            
            journal[0].GSRank.push({
            rank: position,
            cat: category,
            catLink: {
              DL: false,
              link: link
            }
          });
          journal[0].save(function(err){
            if (err) throw err;
          
          })
            
          } else {
           // console.log("journal already ranked in this category")
     
          }
        }
      })
    })
}







const scrape = function (website, cb){
  let totalPagesSearched = 0;
  let linksLooked = 0;

    
 
          tinyreq({
            url: website,
            data_encoding: "UTF-8"
            }, (err, body) => {
              if (err){
                console.log(err)
                return;
              }
              totalPagesSearched++;
            //this scans the page and submits rankings for top 10 on each
              scrapeRanks(body, website);
              linksLooked++;
            //gets all sub categories from the page
            let links = findLinks(body)
            linksLooked += links.length;

            links.forEach(function(a, i, array){
              (function(i){
                setTimeout(function(){
                  tinyreq({
                  url: a,
                  data_encoding: "UTF-8"
                  }, (err, body) => {
                    if (err){
                      console.log(err)
                      return;
                    }
                    totalPagesSearched++;
                    //this scans the page and submits rankings for top 10 on each
                    scrapeRanks(body, array[i]);
                    let links = findLinks(body);
                    linksLooked += links.length;
                    links.forEach(function(a, i, array){
                      (function(i){
                        setTimeout(function(){
                          tinyreq({
                            url: a,
                            data_encoding: "UTF-8"
                          }, (err, body) => {
                            scrapeRanks(body, array[i]);


                            totalPagesSearched++;
                            
                            if (totalPagesSearched === linksLooked-5){
                              
                              cb({msg: "GS Ranks successfully updated"});

                            }
                            




                          } )


                        }, i*2000)
                      }(i))
                    })
                  })
                }, i*1600)

              }(i));

            })
          })



}
  
  


exports.scrape = scrape;
