import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { formatDate } from "@angular/common";
// import * as RandomName from '../../../node_modules/random-name/index.js';
// declare var r: any;
// import * as test from 'random-name';


// const testFolder = './images/';
// const fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file); // use those file and return it as a REST API
//   });
// })


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users = [
    {
      "name": "Robert",
      "email": "robert@gmx.de",
      "dateOfBirth": null,
      "gender": "male",
      "password": "test123",
      "confirmPassword": "test123",
      "acceptTerms": "true",
      "reason": "Chat",
      "info": "Hey, ich bins!",
      "img": null
    },
    {
      "name": "Robert",
      "email": "robert@gmx.de",
      "dateOfBirth": null,
      "gender": "male",
      "password": "test123",
      "confirmPassword": "test123",
      "acceptTerms": "true",
      "reason": "Chat",
      "info": "Hey, ich bins!",
      "img": null
    },
    {
      "name": "Susi",
      "email": "robert@gmx.de",
      "dateOfBirth": null,
      "gender": "female",
      "password": "test123",
      "confirmPassword": "test123",
      "acceptTerms": "true",
      "reason": "Chat",
      "info": "Hey, ich bins!",
      "img": null
    },
    {
      "name": "Elfriede",
      "email": "robert@gmx.de",
      "dateOfBirth": null,
      "gender": "female",
      "password": "test123",
      "confirmPassword": "test123",
      "acceptTerms": "true",
      "reason": "Chat",
      "info": "Hey, ich bins!",
      "img": null
    },
  ]

  constructor(private dbService: DBService) {
  }

  ngOnInit() {
  }

  createUsers() {
    // 95 men
    // 46 women

    this.createUser(this.userNames.male[0])


  }

  createUser(name: string, email: string, dateOfBirth: Date, gender: string, password: string, confirmPassword: string, acceptTerms: Boolean, reason: string, info: string, img: Object) {
    let user = {
      "name": name,
      "email": email,
      "dateOfBirth": dateOfBirth,
      "gender": gender,
      "password": password,
      "confirmPassword": confirmPassword,
      "acceptTerms": acceptTerms,
      "reason": reason,
      "info": info,
      "img": img
    }

    this.dbService.addUser(user);
  }

}
