import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-db-wipe',
  templateUrl: './db-wipe.component.html',
  styleUrls: ['./db-wipe.component.css']
})
export class DbWipeComponent implements OnInit {

	msg = ""

  constructor(private http: Http) { }

  ngOnInit() {
  }

  deleteEverything(){
  	this.http.get('./admin/deleteeverything').subscribe(
  		body=>{
  			this.msg = body.json().msg;
  		})
  }

}
