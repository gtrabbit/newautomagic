import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';





@Injectable()
export class ScanService {


  constructor(private http: Http) { }


  getPaperList(website: string): Observable<Response> {
  	website = website.replace(/https/, "http") + "&pagesize=100";
  	let headers = new Headers({'Content-Type': 'application/json and cats'})
  	let reqOpts = new RequestOptions({
  		url: "./getpaperlist",
  		method: RequestMethod.Get,
  		search: website,
  		headers: headers});
  	let req = new Request(reqOpts)

  	return this.http.request(req);
  	//return this.http.post("https://exultant-runner.glitch.me/getpaperlist", "words", reqOpts)
  					
  			
 
  
  }




}
