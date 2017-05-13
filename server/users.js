var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

const userSchema = new Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	admin: Boolean    
})



const users = mongoose.model("user", userSchema);


const deleteUser = function(user, cb){
	users.remove({username: user}, function(err, rem){
		if (err){
			cb("some kinda error")
		} else {
			cb("user deleted: " + user);
		}
	
	})



}


const checkUser = function(user, pw, cb){
	users.find({username: user}, function(err, userFound){
		err ? cb(false) : 
			userFound.length ?
			cb(userFound[0].password === pw) :
			cb(false)
	})
}

const findUser = function(user, cb){
	
	users.find({username: user.username}, function(err, userFound){
		if (err){
			cb("error processing request", null)
		} else {
			cb(null, userFound)
		}
	})
}


// {
// 		username: user.username,
// 		password: user.password,
// 		firstName: user.firstName,
// 		lastName: user.lastName,
// 		email: user.email,
// 		admin: user.admin 
// 		}

const makeNew = function(user, cb, edited){
	if (edited){
		users.findOneAndUpdate(
			{username: user.username},
			{$set:
				{
				username: user.username,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				admin: user.admin 
				}
			},
			 {
				returnNewDocument: true
			})

		cb ("Successfully updated user: " + user.username)
	} else {
		let newUser = new users(user);
		let msg = "";
		newUser.save(function(err){
			if (err){
				msg = "There was an error creating this user";
			} else {
				msg = "New user successfully created"
			}
		cb(msg);
		})
	


	}
}




const createNew = function(user, callback){
	const cb = function(err, _user){
		err ? callback(err) : _user.length ? makeNew(user, callback, true) : makeNew(user, callback, false);
	}
	findUser(user, cb);




	}






exports.module = {
	createNew: createNew,
	deleteUser: deleteUser,
	checkUser: checkUser
}