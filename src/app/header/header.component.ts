import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../admin/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


	accessDenied = false;
  public _user: User = this.LIS.currentUser;

  constructor(private LIS: LoginService) { }

  ngOnInit() {
    this.LIS.loggedIn.subscribe(
      body=>{
        this._user = body;
      })

  }

  showAdminPanel(){
  	this.accessDenied = !this.accessDenied
  }

  isAdmin(){
    return this._user.admin;
  }

  submit(u, p){
    this.LIS.checkLogin(u, p);

  }

  logout(){
    this.LIS.currentUser = {
      firstName: "Guest",
      lastName: "User",
      username: "Guestuser",
      email: null,
      password: null,
      admin: false,
      dbwrite: false
    }
    this.LIS.loggedIn.emit(this.LIS.currentUser)
  }

}
