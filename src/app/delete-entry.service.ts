import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeleteEntryService {

  constructor(private http: Http) { }

  delete(results): Observable<Response>{
  	return this.http.post('./delete', results);
  }

}
