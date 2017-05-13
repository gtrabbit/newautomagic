import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreateAccountService {

  constructor(private http: Http) { }

  create(user): Observable<Response>{
  	return this.http.post("./admin/create", user);
  }

  delete(user): Observable<Response>{
  	return this.http.get("./admin/delete/" + user)
  }

}
