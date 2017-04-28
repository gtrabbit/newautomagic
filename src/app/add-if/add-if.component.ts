import { Component, OnInit } from '@angular/core';
import { Ranking } from '../ranking';
import { AddRankService } from '../add-rank.service';

@Component({
  selector: 'app-add-if',
  templateUrl: './add-if.component.html',
  styleUrls: ['./add-if.component.css']
})
export class AddIFComponent implements OnInit {


	model: Ranking; 
	info: boolean;


	


  constructor(private ARS: AddRankService) { }

  ngOnInit() {

  	this.model = new Ranking(
		"", "", new Date(), false, false, {
  		rank: undefined,
  		cat: undefined,
  		catLink: {
  			DL: false,
  			link: undefined
  		}
  	}, null, "");
  
  }


  log(){
  	console.log(this.model);
  }


  addGSRank(){
  	this.model.GSRank.splice(this.model.GSRank.length, 0, {
  		rank: undefined,
  		cat: undefined,
  		catLink: {
  			DL: false,
  			link: undefined
  		}
  	});
 
  

  }

  remove(i){
  	this.model.GSRank.splice(i, 1);
  }

  

  compileGSRanks(): Array<Object>{

  	let GSRanks = [];
  	for (let index in this.model.GSRank){
  		GSRanks.push({
  			rank: this.model.GSRank[index].rank,
  			cat: this.model.GSRank[index].cat,
  			catLink: { 
  				DL: false,
  				link: this.model.GSRank[index].catLink.link
  			}
  		});
  	}
  	return GSRanks;
  }

  onSubmit(){
  	console.log(this.info);
  
  	// let submission = new Ranking(
  	// 	this.model.journalName, //journalName
  	// 	this.clean(this.model.journalName), //search
  	// 	new Date(), //updated 
  	// 	this.isItRanked(this.info), //noRank
  	// 	true, //completed
  	// 	this.compileGSRanks(), //GSRank
  	// 	this.model.IF, //IF
  	// 	this.model.IFLink //IFLink
  	// 	);
    //	this.ARS.submitRank(submission).subscribe();
  
    this.model.noRank = this.info;
    this.model.GSRank = this.compileGSRanks();
    this.model.complete = true;
    this.model.updated = new Date();
    this.ARS.submitRank(this.model).subscribe(
      body => console.log(body.json().msg));



  }

}
