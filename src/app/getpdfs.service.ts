import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetpdfsService {

  constructor(private http: Http) { }

  getpdfs(data): Observable<any>{
  	
  	return this.http.post('./getpdfs', data)


  }

}
