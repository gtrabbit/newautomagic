const titleCase = function (string){
  let title = string.split(" ");
  let goats = [];
  title.forEach(function(a){
    if (a !== "and" && a !== "of" && a !== "a" && a !== "an" && a !== "in" && a !== "at" && a !== "on"){
    let upper = a[0].toUpperCase();
    upper = upper.concat(a.slice(1));
    goats.push(upper);
    } else {
      goats.push(a);
    }
  })
  return goats.join(" ");
  
  
}


exports.titleCase = titleCase;
