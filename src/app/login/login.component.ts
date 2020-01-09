import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DBService } from 'src/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private shownTemplate = "";
  // private users: User[] = [];

  @Input()
  set template(templateName: string) {
    this.shownTemplate = templateName;
  }

  constructor(private dbService: DBService) { }

  ngOnInit() {
    this.dbService.initDB();
    this.shownTemplate = 'signIn'
  }

  showSignUp() {
    this.shownTemplate = 'signUp';
  }

  showSignIn() {
    this.shownTemplate = 'signIn';
  }

  showResetPW() {
    this.shownTemplate = 'resetPW';
  }

  switchTemplate($event) {
    this.shownTemplate = $event;
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
