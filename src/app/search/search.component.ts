import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';
import { FormatRanksService } from '../format-ranks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	public ranking: Object = {};
	public noMatch: string;
  public results: any;
  public journal: string;
  public searchHappened: boolean = false;
	

  constructor(private RS: RankingService, private FRS: FormatRanksService) { }

  ngOnInit() {
  }

  search(journal){
 
  	this.noMatch = "";
  	this.RS.getRanks(journal).subscribe(
  		body => {
  			let results = body.json();
        this.results = results;
        this.journal = journal;
        this.searchHappened = true;
  			
  			
  			},
  		error => console.log(error)
  		)
  }

  log(){
  	console.log(this.ranking);
  }

      
         


  formattedRanks(){

  }

}
