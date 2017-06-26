export class User {
	constructor(firstName: string, lastName: string, username: string, email: string, password: string, admin: boolean, dbwrite: boolean){
		this.username = username;
		this.email = email;
		this.password = password;
		this.admin = admin;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dbwrite = dbwrite;
	}
	username: string;
	email: string;
	password: string;
	admin: boolean;
	firstName: string;
	lastName: string;
	dbwrite: boolean;
}
