import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';





@Injectable()
export class ScanService {


  constructor(private http: Http) { }


  getPaperList(website: string): Observable<Response> {
  	website = website.replace(/https/, "http") + "&pagesize=100";
   	return this.http.post('./getpaperlist', website);
  	
  					
  			
 
  
  }




}
