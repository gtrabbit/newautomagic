import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Ranking } from '../ranking';
import { AddRankService } from '../add-rank.service';

@Component({
  selector: 'app-add-if',
  templateUrl: './add-if.component.html',
  styleUrls: ['./add-if.component.css']
})
export class AddIFComponent implements OnInit {

  response: string;
  showResponse: Boolean = false;
	@Input() model: Ranking = new Ranking(
    undefined, undefined, new Date(), false, false, {
      rank: undefined,
      cat: undefined,
      catLink: {
        DL: false,
        link: undefined
      }
    }, undefined, undefined);


  ; 
	info: boolean;


	


  constructor(private ARS: AddRankService) { }

  ngOnInit() {
  	
    }


  log(){
  	console.log(this.model);
  }

//adds in additional GS ranks if needed
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
//or removes them
  remove(i){
  	this.model.GSRank.splice(i, 1);
  }

  
//takes form into and pushes into an array needed for rank Schema
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

//finalizes the rank and sends to the DB
  onSubmit(){
    this.showResponse = false;
    this.model.noRank = this.info;
    this.model.GSRank = this.compileGSRanks();
    this.model.complete = true;
    this.model.updated = new Date();
    this.ARS.submitRank(this.model).subscribe(
      body => {
        this.showResponse = true;
        this.response = body.json().msg.slice(0, 7);

      });
  }

}
