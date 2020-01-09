import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.scss']
})
export class ResetPwComponent implements OnInit {
@Output() private shownTemplate = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  backToSignIn() {
    this.shownTemplate.emit('signIn');
  }

}
