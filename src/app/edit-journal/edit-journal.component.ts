import { Component, OnInit, Input, OnChanges, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { RankingService } from '../ranking.service';
import { NoRankService } from '../no-rank.service';

@Component({
  selector: 'app-edit-journal',
  templateUrl: './edit-journal.component.html',
  styleUrls: ['./edit-journal.component.css'],
  providers: [NoRankService]
})
export class EditJournalComponent implements OnInit, AfterContentInit {

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

  ngAfterContentInit(){
    	for (let item in this.results){
  		console.log(item);

  	}
  }



  log(){
  	console.log(this.results);
  }

  addRank(r, i){
  	this.addedRanks.emit(r);
    this.results = {};
  }

  markAsNoRank(i){
    this.nR.submitNoRank(this.journals[i])
      .subscribe(
        body => {
          console.log("this happens")

          console.log(body.json());
          this.disabledArr[i] = true;

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
            console.log(this.results);

          }
    	
    			)

  }



}
