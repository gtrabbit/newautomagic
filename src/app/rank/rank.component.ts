import { Component, OnInit, Input } from '@angular/core';
import { FormatRanksService} from '../format-ranks.service';
import { Ranking } from "../ranking";
import { GetpdfsService } from '../getpdfs.service'

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

	@Input() public rankings: any = {
		rankedJournals: [],
		noMatch: []
		};
	public showRankToggle: boolean = false;
  public unRanked: Array<Ranking> = [];
  gsRankCats: Array<string> = [];
  gsRankLinks: Array<string> = [];
  gsRankNumbers: Array<number[]> = [];
  editJournal: Ranking;
  displayEdit = false;
 


  constructor(private FRS: FormatRanksService, private GPS: GetpdfsService) { }

  ngOnInit() {
     this.removeUnranked();

    
   }

  addRank(e){
    this.rankings.rankedJournals.push(e);
  }

 removeUnranked(){

    for (let i = 0; i<this.rankings.rankedJournals.length; i++){
      if (this.rankings.rankedJournals[i].noRank){
        this.unRanked.push(this.rankings.rankedJournals.splice(i, 1));
        i--;
      }
    }
 }

  showRanks(){
    if (!this.showRankToggle){
      this.removeUnranked();
      this.acquireLinks();
      this.sortRankings()
    }
    
  	this.showRankToggle = !this.showRankToggle;
    
  }

  sortRankings(){
    this.rankings.rankedJournals.sort(function(a, b){
      return b.IF - a.IF;
    })
  }

  readyDL(){
    let data = this.makeDataObject();
    this.GPS.getpdfs(data).subscribe(
      body => {
        let uid = body.json().msg;       
        window.open(uid, "_blank");
      });
   
    
  }

  acquireLinks(){
    this.gsRankLinks = [];
    this.gsRankCats = [];
    this.gsRankNumbers = [];
    for (let item of this.rankings.rankedJournals){
      if (item.hasOwnProperty("GSRank")){
        let jGSRanks = [];
        let jGSCats = [];
        item.GSRank.forEach((a) => {
          jGSRanks.push(a.rank);
          jGSCats.push(a.cat);
          if (!this.gsRankCats.includes(a.cat)){
            this.gsRankCats.push(a.cat);
            this.gsRankLinks.push(a.catLink.link);
            this.gsRankNumbers.push([Number(a.rank)]);
          } else if (this.gsRankNumbers[this.gsRankLinks.indexOf(a.catLink.link)]){
            this.gsRankNumbers[this.gsRankLinks.indexOf(a.catLink.link)].push(a.rank)
            this.gsRankNumbers[this.gsRankLinks.indexOf(a.catLink.link)].sort(); 
          }
         })
        
      }
     }

  }

  displayEditToggle(){
    this.displayEdit = !this.displayEdit;
  }
openEdit(i){
  this.displayEdit = false;
  this.editJournal = this.unRanked[i][0];
  console.log(this.editJournal);
  this.displayEdit = true;

}

makeDataObject(){
  let data = {data: []}
  for (let i in this.gsRankCats){
    let thing = {
      url: this.gsRankLinks[i],
      cat: this.gsRankCats[i],
      numbers: this.gsRankNumbers[i]
    }
    data.data.push(thing);
  }
  return data;
}



}
