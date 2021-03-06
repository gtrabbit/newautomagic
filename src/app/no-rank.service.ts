import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoRankService {

  constructor(private http: Http) { }

  submitNoRank(name): Observable<Response> {
   	return this.http.post('./norank', name)
  }

}
