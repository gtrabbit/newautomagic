import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormatRanksService } from '../format-ranks.service';

@Component({
  selector: 'app-display-ranking',
  templateUrl: './display-ranking.component.html',
  styleUrls: ['./display-ranking.component.css']
})
export class DisplayRankingComponent implements OnInit, OnChanges {

	@Input() public results: any;
	@Input() public journal: any;
	public ranking: any;



  constructor(private FRS: FormatRanksService) { }

  ngOnInit() {
  //	this.ranking = this.displayF(this.results, this.journal);
  }

  ngOnChanges(){
    this.ranking = this.displayF(this.results, this.journal);

  }

  displayF(results, journal){
    if (!results.hasOwnProperty('rankedJournals')){
      console.log("results sent from there?", results);

      results = {rankedJournals: [results]};
    }
  	let display;
  		if (results.rankedJournals.length){
  			console.log(results)
  			if (results.rankedJournals[0].noRank){
  				display = {formatted: "This journal has been marked as unranked"}
  			} else {
  				display = this.FRS.extractCats(results.rankedJournals[0]);
  			}
  		} else {
  			display = {formatted: "Sorry, there was no match."};
  			}

  			return display;
  }

}