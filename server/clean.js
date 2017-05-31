const clean = function (a){
   a = a.toLowerCase().replace(/(\s|^)(and|&|the|in|of|on|at)\s/gi, " ").replace(/(\s|^)(and|&|the|in|of|on|at)\s/gi, " ").replace(/[^\s\w]/gi, " ").replace(/\s+/g, " ").trim();
  return (a);
}












exports.clean = clean;