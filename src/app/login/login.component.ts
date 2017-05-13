import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

	@Output() closed = new EventEmitter();
	isAdmin = false;


  constructor(private LIS: LoginService) { }

  ngOnInit() {
  }

  submit(u, p){
  	this.LIS.login(u, p).subscribe(
  		body => {
  			this.isAdmin = body.json();
  			console.log(this.isAdmin);
  			

  			})


  	return true;

  }

  close(){
  	this.closed.emit();
  }

}
