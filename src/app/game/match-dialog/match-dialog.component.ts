import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
// import {Course} from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { GameComponent } from '../game.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-match-dialog',
  templateUrl: './match-dialog.component.html',
  styleUrls: ['./match-dialog.component.scss']
})
export class MatchDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  matchedWithUser: any;

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    // private dialogRef: MatDialogRef<GameComponent>,
    // @Inject(MAT_DIALOG_DATA) {
    //   description, longDescription,
    //   category
    // }) {
    private dialogRef: MatDialogRef<GameComponent>,
    @Inject(MAT_DIALOG_DATA) {
      description, matchedWithUser
    }
  ) {

    this.description = description;
    this.matchedWithUser = matchedWithUser;

    this.form = fb.group({
      description: [description, Validators.required],
      matchedWithUser: [description, Validators.required],
      // category: [category, Validators.required],
      // releasedAt: [moment(), Validators.required],
      // longDescription: [longDescription, Validators.required]
    });

  }

  ngOnInit() {

  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  save() {
    this.dialogRef.close(this.form.value);
  }

  goToChat() {
    this.dialogRef.close(0);
  }

  close() {
    this.dialogRef.close();
  }

}
