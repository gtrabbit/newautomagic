import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddRankService {

  constructor(private http: Http) { }

  submitRank(sub, overwrite): Observable<Response>{
  	return this.http.post('./submitrank', {sub: sub, ow: overwrite})



  }

}
