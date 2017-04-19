import { Component, AfterContentInit, Input } from '@angular/core';
import { FormatRanksService } from '../format-ranks.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements AfterContentInit {

	@Input() public rankings: any = {
		rankedJournals: [],
		noMatch: []
		};

	public gsRankLinks: Array<any> = [];
	public gsRankNumbers: Array<Array<Number>> = [];
	public gsRankCats: Array<string> = [];
	public formattedRanks: Array<string> = [];
	public showRankToggle: boolean = false;
  public unRanked: Array<string> = [];


  constructor(private formatRanks: FormatRanksService) { }

  ngAfterContentInit() {
    for (let item in this.rankings.rankedJournals){
     
      if (this.rankings.rankedJournals[item].noRank){
        console.log("found a no-rank journal!", this.rankings.rankedJournals[item].journalName);
     
        this.unRanked.push(this.rankings.rankedJournals.splice(item, 1));
        

      }

    }

   }

  addRank(e){
    this.rankings.rankedJournals.push(e);

  }

  showRanks(){
  	this.gsRankNumbers = [];
  	this.gsRankLinks = [];
  	this.gsRankCats = [];
  	this.showRankToggle = !this.showRankToggle;
  	if (this.showRankToggle){

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
  				this.formattedRanks.push(this.formatRanks.formatRanks(jGSRanks, jGSCats))
  		}
   	} 

  	}

  }

  




}
