import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormatRanksService } from '../format-ranks.service';
import { Ranking } from '../ranking';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-display-ranking',
  templateUrl: './display-ranking.component.html',
  styleUrls: ['./display-ranking.component.css']
})
export class DisplayRankingComponent implements OnInit, OnChanges {


 
	@Input() public results: any;
	@Input() public journal: any;
	public ranking: any;
  editJournal: Ranking;
  displayEditToggle = false;
  journalRank: Ranking;



  constructor(private FRS: FormatRanksService, private LIS: LoginService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.ranking = this.displayF(this.results, this.journal);
  }

  displayEdit(){
    if (this.LIS.currentUser.dbwrite){
      if (this.displayEditToggle === true){
        this.displayEditToggle = false;
      } else {
        this.editJournal = this.journalRank;
        this.displayEditToggle = true;
      }
    } else {
      window.alert("You are not authorized to edit the database. Try logging in.")
    }

  

  }

  displayF(results, journal){
    if (!results.hasOwnProperty('rankedJournals')){
      results = {rankedJournals: [results]};
    }
  	let display;
  		if (results.rankedJournals.length){
  		
  			if (results.rankedJournals[0].noRank){
  				display = {formatted: "This journal has been marked as unranked"}
  			} else {
          this.journalRank = results.rankedJournals[0];
  				display = this.FRS.extractCats(results.rankedJournals[0]);

  			}
  		} else {
  			display = {formatted: "Sorry, there was no match."};
  			}

  			return display;
  }

}
