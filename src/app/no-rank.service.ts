import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoRankService {

  constructor(private http: Http) { }

  submitNoRank(name): Observable<Response> {
   	//let reqOpts = new RequestOptions({body: name});
   	return this.http.post('./norank', name)
  }

}
