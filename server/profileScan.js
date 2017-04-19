const tinyreq = require('tinyreq');
const titleCase = require('./title');

const scrapeProfile = function (website, cb){
  tinyreq({
    url: website,
    headers: {
      charset: 'utf-8'
    },
    encoding: "UTF-8",
    data_endcoding: "UTF-8"
  }, function(err, body){
    body = body.match(/<body>.+<\/body/g)[0]
    body = body.replace(/&#8211;/g, "--");
    body = body.replace(/&#8208;/g, "-");
    body = body.replace(/&amp;/g, "&");
    body = body.replace(/&#8221;/g, '"');
    body = body.replace(/&#8220;/g, '"')
   
     let titles = [];
    let init1 = body.match(/gsc_a_at">(.*?)<\/a>/g);
    init1.forEach(function(a){
      titles.push(a.slice(10, a.length-4));
    })
    
    let journals = [];
    let init2 = body.match(/<\/div><div class="gs_gray">.*?<span/g);
    
    init2.forEach(function(a){
      let b = a.slice(27, a.length-5);
      b = b.match(/([,:a-zA-Z&-]\s*)+(?=\s\d*|\W*)/)[0].trim().toLowerCase();
      b = titleCase.titleCase(b);
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
        a = "No Citations";
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
   cb(paperList); 
  })
 
}

exports.scrape = scrapeProfile;