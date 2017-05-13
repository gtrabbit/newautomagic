import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RankScraperService {

  constructor(private http: Http) { }

  scrape(): Observable<Response>{
  	return this.http.get('./admin/scrape')

  }

  stats(): Observable<Response>{
  	return this.http.get('./ranks/' + "lastUpdated")
  }

}
