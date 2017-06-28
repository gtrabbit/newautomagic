import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetCitingPapersService {

  constructor(private http: Http) { }


  find(website):Observable<Response>{
  	return this.http.get('./getcitingpapers/' + website)

  }
}
