import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(u, p):Observable<Response> {
  	return this.http.get('./login/' + u + "/" + p)
  }


}
