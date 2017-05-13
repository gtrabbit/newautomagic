import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pbf',
  templateUrl: './pbf.component.html',
  styleUrls: ['./pbf.component.css']
})
export class PbfComponent implements OnInit {

	msg: any = "";

  constructor(private http: Http) { }

  ngOnInit() {
  }

  submit(ave, per, year){
  	this.http.post('./admin/updatepbf', {
  		averages: ave,
  		percentiles: per,
  		year: year
  	}).subscribe(
  		body => this.msg = body.json().msg
  	)


  }

}
