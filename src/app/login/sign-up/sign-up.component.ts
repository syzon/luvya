import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() private shownTemplate = new EventEmitter<string>();

  // model = new User('', '', '');

  constructor() { }

  ngOnInit() {
  }

  backToSignIn() {
    this.shownTemplate.emit('signIn');
  }

  signUp() {
    console.log("SIGNUP")
  }

}
