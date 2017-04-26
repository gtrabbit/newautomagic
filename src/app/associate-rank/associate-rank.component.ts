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
	res: string;

  constructor(private http: Http) { }

  ngOnInit() {
  }

 

  associate(){
  	if (this.goAhead){
  		console.log(this.journal, this.result);
  		this.http.post('./associate', {
  			journal: this.journal,
  			result: this.result
  		}).subscribe(
  			body => {
  				console.log(body.json().msg);
  			},
  			error => console.log(error))

  	}
  	
  }

}
