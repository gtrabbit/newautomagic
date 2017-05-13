import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { CreateAccountService} from '../create-account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  providers: [CreateAccountService]
})
export class AccountsComponent implements OnInit {

	model: User = {
		firstName: null,
		lastName: null,
		username: null,
		email: null,
		password: null,
		admin: false
	}
	creationMsg: string = "";
  deleteMsg: string = "";

  constructor(private CAS: CreateAccountService) { }

  ngOnInit() {
  }

  checkValid(){
  	if (
  		this.model.firstName &&
  		this.model.lastName &&
  		this.model.username &&
  		this.model.email &&
  		this.model.password
  		) {
  		return false;
  	} else {
  		return true;
  	}
  }

  submit(){
  	
  	let user = new User(this.model.firstName, this.model.lastName, this.model.username, this.model.email, this.model.password, this.model.admin);
  	this.CAS.create(user).subscribe(
  		body => this.creationMsg = body.json().msg)
  }

  delete(user){
    this.CAS.delete(user).subscribe(
      body => this.deleteMsg = body.json().msg)

  }

}
