import { Injectable } from '@angular/core';

@Injectable()
export class FormatRanksService {


  constructor() { }




//utility-- takes a ranking and returns an object (seen below)
//formatted is a string to be displayed; the other info is 
//useful for generating the links and numbers to suffix files
    extractCats(ranking){
      let journalName = ranking.journalName;
      let gsRankNumbers = [];
      let gsRankCats = [];
      let gsRankLinks = [];
      let formattedRanks = [];
      let IF;
      if (ranking.hasOwnProperty('IF') && ranking.IF){
        IF = ranking.IF.toString();
        let start = IF.substr(IF.indexOf(".")+1);
        let sub = "000".substr(start.length);
        IF = IF + sub;
     } 
     
     if (ranking.hasOwnProperty("GSRank")){
          let jGSRanks = [];
          let jGSCats = [];
          ranking.GSRank.forEach((a) => {
            jGSRanks.push(a.rank);
            if (a.cat === "English"){
              a.cat = "all English journals"
            }
            jGSCats.push(a.cat);
            if (!gsRankCats.includes(a.cat)){
              gsRankCats.push(a.cat);
              gsRankLinks.push(a.catLink.link);
              gsRankNumbers.push([Number(a.rank)]);
            } else {
              gsRankNumbers[gsRankLinks.indexOf(a.catLink.link)].push(a.rank)
              gsRankNumbers[gsRankLinks.indexOf(a.catLink.link)].sort(); 
            }
           })
       
             formattedRanks.push(this.formatRanks(jGSRanks, jGSCats))
         
         
      }
      return {
        formatted: formattedRanks,
        journalName: journalName,
        numbers: gsRankNumbers,
        cats: gsRankCats,
        links: gsRankLinks,
        IF: IF
      }
     } 

      
      //creates string for displaying GS ranks
 formatRanks(ranks, cats) {
   let text = "";
   if (ranks.length){
      text = "<strong> Ranked "
   }
   
    for (let i=0; i<ranks.length; i++){
      text = text.concat("#" + ranks[i] + "</strong> in " + cats[i])
      if ((ranks.length - i) === 2){
        text = text.concat(" and <strong>")
      } else if ((ranks.length - i) > 2){
       
        text = text.concat(", <strong>")
      }
     
    }
     if (ranks.length){
      text = text.concat(" by Google Scholar")
   }
    
    return text;
  }
  


}



