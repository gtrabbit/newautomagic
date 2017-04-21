import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddIFLinkServiceService {

  constructor(private http: Http) { }

  submitIFL(link, journal): Observable<Response>{
  	return this.http.post("./submitIFL", {
  		journal: journal,
  		link: link
  	})


  }

}
