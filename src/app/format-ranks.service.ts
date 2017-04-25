import { Injectable } from '@angular/core';

@Injectable()
export class FormatRanksService {


  constructor() { }





    extractCats(ranking){
     let journalName = ranking.journalName;
     let gsRankNumbers = [];
     let gsRankCats = [];
     let gsRankLinks = [];
     let formattedRanks = [];
     let IF;
     if (ranking.hasOwnProperty('IF')){
       IF = ranking.IF;
     } 
     



     if (ranking.hasOwnProperty("GSRank")){
          let jGSRanks = [];
          let jGSCats = [];
          ranking.GSRank.forEach((a) => {
            jGSRanks.push(a.rank);
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

      

 formatRanks(ranks, cats) {
   let text;
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
 
    return text;
  }
  


}



