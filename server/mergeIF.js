const cleaner = require('./clean');


const titleCase = function (string){
  let title = string.toLowerCase().split(" ");
  let goats = [];
  title.forEach(function(a){
    if (a !== "and" && a !== "the" && a !== "of" && a !== "a" && a !== "an" && a !== "in" && a !== "at"){
    let upper = a[0].toUpperCase();
    upper = upper.concat(a.slice(1));
    goats.push(upper);
    } else {
      goats.push(a);
    }
  })

  return goats.join(" ");
  
  
}

const createJSON = function (chart){
let reg = /([\w\s-:&]+)\s\s([\d+\.]+)\s{4}/g
let JSONIF = [];
let list = chart.match(reg);
list.forEach(function(a){
	let arr = a.split("  ");
	let title = titleCase(arr[0].trim());
  let search = cleaner.clean(title);
  
	let IF = Number(arr[1]);
	let entry = {
    journalName: title,
		search: search,
		IF: IF
		}
JSONIF.push(entry);
		
})
  return JSONIF
}

exports.createJSON = createJSON;