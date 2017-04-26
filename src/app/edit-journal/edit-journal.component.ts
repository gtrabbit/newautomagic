import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { RankingService } from '../ranking.service';
import { NoRankService } from '../no-rank.service';

@Component({
  selector: 'app-edit-journal',
  templateUrl: './edit-journal.component.html',
  styleUrls: ['./edit-journal.component.css'],
  providers: [NoRankService]
})
export class EditJournalComponent implements OnInit {

	@Input() public journals: string[] = [];
	public results: Object = {};
	public editShow: boolean[] = [];
	public rankings: Object = {};
	public formattedRanks: Array<string> = [];
	@Output() public addedRanks = new EventEmitter();
  public searchedFor: string;
  public disabledArr: Array<Boolean> = []

  constructor(private RS: RankingService, private nR: NoRankService) { }

  ngOnInit() {

  }



  log(){
  	console.log(this.results);
  }

  addRank(r, i){
  	this.addedRanks.emit(r);
    this.journals.splice(i, 1, "--Added to list--");
    delete this.results[i];
    this.disabledArr[i] = true;
  }

  markAsNoRank(i){
    this.nR.submitNoRank(this.journals[i])
      .subscribe(
        body => {
          this.disabledArr[i] = true;
          this.journals[i].concat(" --marked as unranked");

        },
        error => console.log(error))
  }

	


	edit(i){
    	this.editShow[i] = true;
 	}

 	submitEdit(i, j){
     this.searchedFor = j;
    	this.editShow[i]=false;
    	this.RS.getRanks([j])
    		.subscribe(
    			body => {
            this.results[i] = body.json();
            

          }
    	
    			)

  }



}
