import { Component, OnInit, Input } from '@angular/core';
import { Ranking } from '../ranking';
import { Http } from '@angular/http';

@Component({
  selector: 'app-associate-rank',
  templateUrl: './associate-rank.component.html',
  styleUrls: ['./associate-rank.component.css']
})
export class AssociateRankComponent implements OnInit {

	@Input() journal: string;
	@Input() result: string;
	goAhead = false;
	res: string = "";

  constructor(private http: Http) { }

  ngOnInit() {
  }

 
//is called regardless, but everything is inside that if statement
//which is determined by value of the checkbox. sends name of
//journal to server along with an alternative search term
//user would like to associate with it. 
  associate(){
    console.log("associate function is called by client")
  	if (this.goAhead){
  		console.log(this.journal, this.result);
  		this.http.post('./associate', {
  			journal: this.journal,
  			result: this.result
  		}).subscribe(
  			body => {
  				let res = body.json().msg;
  			},
  			error => console.log(error))

  	}
  	
  }

}
