//set up dependencies or whatever
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const tinyreq = require('tinyreq');
const rank = require('./rankingDB').module.rank;
const pdf = require('html-pdf');

const cleaner = require('./clean');


// the meat, so to speak

let erroredPages = [];

const scrapeRanks = function(body, link){

//finds the table where journal titles are stored
  const tableReg = /<table id="gsc_mvt_table" class="gsc_mp_table">(.+)<\/table>/;
//finds each title within the table
  const titleNamesReg = /<td class="gsc_mvt_t">(.*?)<\/td>/g;

//finds the name of the category
  const catNameReg = /<h1 class="gs_hdr_mbo" dir="ltr">(.+)<\/h1>/;



//checks to make sure a valid page is being displayed, i.e. we didn't hit a captcha wall or something
  if (!catNameReg.exec(body)){
    console.log("encountered something unexpected");
    erroredPages.push(link);
    console.log(body);
  } else {

//use regexps to gather info  
  let CatName = catNameReg.exec(body)[1];
  let table = body.match(tableReg);
  let titles = table[0].match(titleNamesReg)
  
//setup data structure
  let ranks = {cat: CatName,
              top10: []};

//reduce to top 10 only
  let topTenTitles = titles.slice(1, 11);

//enter titles into data structure 
  topTenTitles.forEach(function(a){
    b = a.slice(22, -5);
    b = b.replace(/&amp;/g, "&");
    b = b.replace(/&#8211;/g, "--");
    b = b.replace(/&#8208;/g, "-");
    ranks.top10.push(b);         
    });
 
 //execute next section of code  
    submitRanks(ranks, link);
  }
}



const findLinks = function (body){
  console.log("attempting to find new links")
  //finds location of navigation
  const findNavReg = /<div class="gs_md_ul">(.*?)<\/div>/;
  //picks out links to categories
  const linkReg = /<a href="(.*?)"/g;


  let nav = body.match(findNavReg)[0];
  let cats = nav.match(linkReg);
  let links = []
  cats.forEach(function(a){
    links.push("http://scholar.hipr.com"+a.slice(9, -1).replace(/&amp;/g, "&"));
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



const submitRanks = function (ranks, link){
   
    ranks.top10.forEach(function(a, i){
      let search = cleaner.clean(a);
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
              console.log(a);
              console.log("looking at new link");

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
                            console.log(totalPagesSearched)
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
