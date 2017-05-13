const tinyreq = require('tinyreq');
const titleCase = require('./title');

const buildPaperList = function (body){
  let titles = [];
  let init1 = body.match(/gsc_a_at">(.*?)<\/a>/g);
  init1.forEach(function(a){
    titles.push(a.slice(10, a.length-4));
    })
    
  let journals = [];
  let init2 = body.match(/<\/div><div class="gs_gray">.*?<span/g);
    
  init2.forEach(function(a){
    let b = a.slice(27, a.length-5);
    b = b.match(/(([,:a-zA-Z&-\./]\s*)|((\d+(?=(th)|(st)|(rd)|(nd))))|(\d{4}\s))*(?!\d)/)[0].trim();
    if (b.slice(-1) === ","){
        b = b.slice(0, b.length-1);
      }  
    journals.push(b);
   
    })
  let years = [];
  let init3 = body.match(/class="gsc_a_h">(\d+)/g);
  init3.forEach(function(a){
    years.push(a.slice(16));
    })
  let citCounts = [];
  let init4 = body.match(/class="gsc_a_ac">\d*/g);
  init4.forEach(function(a){
    if (a.slice(17).length === 0){
        a = "0";
        citCounts.push(a);
      } else {
        citCounts.push(a.slice(17))
      }
    })
  let paperList = []
  let paper;

  for (let i=0; i<years.length; i++){
    paper = {
     "title": titles[i],
      "year": years[i],
      "citations": citCounts[i],
      "journal": journals[i],
      "exclude": false
        }
    paperList.push(paper);
    }
  return paperList;
}




const scrapeProfile = function (website, cb){
  tinyreq({
    url: website,
    headers: {
      'charset': 'utf-8',
      'user-agent': "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
    },
    encoding: "UTF-8",
    data_endcoding: "UTF-8"
  }, function(err, body){
      if (err){
        cb({err: err})
      }

      if (!body){
        cb({err: "returned an empty body?"})
      }
  
    body = body.match(/<body>.+<\/body/g)[0];
    body = body.replace(/&#8211;/g, "--");
    body = body.replace(/&#8208;/g, "-");
    body = body.replace(/&amp;/g, "&");
   
    if (body.search(/gsc_a_at">(.*?)<\/a>/g) !== -1){
      let paperList = buildPaperList(body);
      cb(paperList); 
    } else {
      console.log(body);
      console.log("I think this might result in a captcha")
      cb({err: "looks like Google blocked the search, or you entered the URL incorrectly"});
    }



     })
 }


exports.scrape = scrapeProfile;