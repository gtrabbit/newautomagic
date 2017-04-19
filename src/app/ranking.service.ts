import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RankingService {

  constructor(private http: Http) { }


  getRanks(journalList): Observable<Response>  {
  	
  	let reqOpts = new RequestOptions({body: {journalList: journalList}})
  	return this.http.post('./getranks', journalList, reqOpts)

  }


}
