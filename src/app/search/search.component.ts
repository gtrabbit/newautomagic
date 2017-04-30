import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';
import { FormatRanksService } from '../format-ranks.service';
import { DeleteEntryService } from "../delete-entry.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	
  public results: any;
  public journal: string;
  public searchHappened: boolean = false;
  showGSRankLinks = false;
  showIFLink = false;
  displays = {
    links: [],
    cats: [],
    numbers: []
  }
  displayEdit: boolean;
	

  constructor(private RS: RankingService, private FRS: FormatRanksService, private DES: DeleteEntryService) { }

  ngOnInit() {
  
  }

  edit(){
    this.displayEdit = !this.displayEdit;
  }

  search(journal){
    this.searchHappened=false;
    this.showGSRankLinks=false;
    this.showIFLink = false;
    this.displays = {
    links: [],
    cats: [],
    numbers: []
  }
  	this.RS.getRanks(journal).subscribe(
  		body => {
  			let results = body.json();
        this.results = results;
        if (results.rankedJournals.length){
          this.journal = results.rankedJournals[0].journalName;
          this.acquireLinks()
          this.displayLinks(this.results);
        } else {
          this.journal = journal;
        }
            
        this.searchHappened = true;
  			
  			
  			},
  		error => console.log(error)
  		)
  }

  log(){
  	console.log(this.results);
    console.log(this.displays);
  }

  delete(results){
    this.DES.delete(results).subscribe(
      body => {
        console.log(body.json())
        this.searchHappened = !this.searchHappened
      }
      )


  }

  acquireLinks(){
      if (this.results.rankedJournals[0].hasOwnProperty("GSRank")){
        this.results.rankedJournals[0].GSRank.forEach((a) => {
          this.displays.numbers.push(a.rank);
          this.displays.cats.push(a.cat);
          this.displays.links.push(a.catLink.link);
         })
        
      }
     } 
  

  

  displayLinks(results){



    if (results.rankedJournals[0].hasOwnProperty('GSRank')){
      if (results.rankedJournals[0].GSRank.length){
        this.showGSRankLinks = true;
      }
    }
    if (results.rankedJournals[0].hasOwnProperty('IFLink')){
      if (results.rankedJournals[0].IFLink.length){
        this.showIFLink = true;
      }
    }



  }

}
