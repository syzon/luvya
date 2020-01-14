import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user';
import { DBService } from 'src/services/db.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() private shownTemplate = new EventEmitter<string>();

  // model = new User('', '', '');
  // private users: User[] = [];
  model: User = {
    name: "carlo",
    email: "test@gmx.de",
    dateOfBirth: new Date('2000-01-01'),
    gender: "male",
    password: "test123",
    confirmPassword: "test123",
  };

  emailAddressAlreadyInUse = false;



  constructor(private dbService: DBService) {
    // this.model = {
    //   name: "",
    //   email: "",
    //   dateOfBirth: "",
    //   gender: "male",
    //   password: "",
    // }
  }

  ngOnInit() {
  }

  getDateOutOfString(dateString: string) {
    return new Date(dateString);
  }

  backToSignIn() {
    this.shownTemplate.emit('signIn');
  }

  checkIfUserExists() {
    this.dbService.getUser(this.model).then((found) => {
      if (found !== null) {
        this.emailAddressAlreadyInUse = true;
      } else {
        this.emailAddressAlreadyInUse = false;
        this.signUp();
      }
    }
    );
  }

  signUp() {
    console.log("SIGNUP SUCCEEDED")
    console.log(this.model);
    this.addNewUser(this.model);
    this.backToSignIn();
  }

  addNewUser(user: any) {
    // const newUser = {
    //   name: user.name,
    //   email: user.email,
    //   dataOfBirth: user.dataOfBirth,
    //   gender: user.gender,
    //   password: user.password
    // };




    // console.log(newUser)
    // this.users.push(newUser);
    this.dbService.addUser(user);

    // TODO: resetten
    // this.model = 
  }


  // onNewUser(form: NgForm) {
  //   console.log(form)
  //   console.log(form.value.name)
  //   console.log(form.value.dataOfBirth)
  //   // const newUser = {name: form.value.name, dataOfBirth: form.value.dataOfBirth, sex: form.value.sex};
  //   const newUser = {
  //     name: form.value.name

  //   };
  //   console.log(newUser)
  //   this.users.push(newUser);
  //   this.dbService.addUser(newUser);
  //   form.resetForm();
  // }

  // onFetchUsers() {
  //   this.dbService.getUsers().then(users => this.users = users);
  // }

  onDeleteUser(user) {
    this.dbService.deleteUser(user);
    // this.users.splice(index, 1)
  }




}
