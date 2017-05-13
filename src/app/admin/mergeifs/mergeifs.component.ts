import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mergeifs',
  templateUrl: './mergeifs.component.html',
  styleUrls: ['./mergeifs.component.css']
})
export class MergeifsComponent implements OnInit {
	confirmation: object = {
		matches: "",
		noMatch: []
	}

  constructor(private http: Http) { }

  ngOnInit() {
  }

  submit(ifchart){
    console.log(ifchart);
  	this.http.post('./mergeifs', ifchart).subscribe(
  		body => this.confirmation = body.json())

  }

}
