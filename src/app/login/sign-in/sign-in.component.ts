import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { Account } from 'src/models/account';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() private shownTemplate = new EventEmitter<string>();

  // model: {
  //   email: "test@gmx.de",
  //   password: "test123",
  //   confirmPassword: "test123",
  // };

  model: Account = {
    email: "test@gmx.de",
    password: "test123",
    confirmPassword: "test123",
  };

  constructor(private dbService: DBService) { }

  ngOnInit() {
  }

  showForgetPW() {
    this.shownTemplate.emit('resetPW');
  }

  showSignUp() {
    this.shownTemplate.emit('signUp');
  }

  signIn() {   
    this.dbService.findAccount(this.model).then((foundAccount: any) => {
      console.log(this.model.password)
      console.log(foundAccount.password)
      if (foundAccount !== null){
        if (this.model.password === foundAccount.password) {
          console.log("PASSED!")
        }
      } else {
        // account nicht vorhanden
      }
    });


  
  }

}
