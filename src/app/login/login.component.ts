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





}
