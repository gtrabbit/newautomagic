import { Component, OnInit, Input } from '@angular/core';
import { FormatRanksService} from '../format-ranks.service';
import { Ranking } from "../ranking";

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
 


  constructor(private FRS: FormatRanksService) { }

  ngOnInit() {
    for (let i = 0; i<this.rankings.rankedJournals.length; i++){
      if (this.rankings.rankedJournals[i].noRank){
        this.unRanked.push(this.rankings.rankedJournals.splice(i, 1));
        i--;
      }
    }
    
   }

  addRank(e){
    this.rankings.rankedJournals.push(e);
  }

  showRanks(){
    if (!this.showRankToggle){
      this.acquireLinks();
    }
    
  	this.showRankToggle = !this.showRankToggle;
    
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
          } else {
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



}
