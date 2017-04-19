import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TopCitedService {

  constructor(private http: Http) { }

  getPBF(): Observable<Response>{
  	return this.http.get("./pbf")

  }

}
