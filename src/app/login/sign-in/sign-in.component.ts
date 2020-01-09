import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
@Output() private shownTemplate = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  showForgetPW() {
    this.shownTemplate.emit('resetPW');
  }

  showSignUp() {
    this.shownTemplate.emit('signUp');
  }

}
