import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './admin/user';

@Injectable()
export class LoginService {

	@Output() loggedIn = new EventEmitter();

	public currentUser: User = {
		firstName: "Guest",
		lastName: "User",
		username: "Guestuser",
		email: null,
		password: null,
		admin: false,
		dbwrite: false
	}

  constructor(private http: Http) { }

  checkLogin(u, p){
  	let checkedLogin = this.login(u, p).subscribe(
  		body => {
  			if (body.json()){
  				this.currentUser = body.json()[0];
  				this.loggedIn.emit(this.currentUser)
  			} else {
  				window.alert("We couldn't match username and password. Please try again.")
  			}
  		});
  
  }

  login(u, p):Observable<Response> {
  	return this.http.get('./login/' + u + "/" + p)
  }




}
