import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { formatDate } from "@angular/common";
import { HelperService } from 'src/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';

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
  private base64textString: String = "";

  // handleFileSelect(evt) {
  //   var files = evt.target.files;
  //   var file = files[0];

  //   console.log(files)
  //   console.log(file)

  //   if (files && file) {
  //     var reader = new FileReader();

  //     reader.onload = this._handleReaderLoaded.bind(this);

  //     reader.readAsBinaryString(file);
  //   }
  // }

  // _handleReaderLoaded(readerEvt) {
  //   console.log(readerEvt)
  //   var binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  //   console.log(btoa(binaryString));
  // }


  img: any = {
    src: ''
  };

  users = [
    {
      "name": "Robert",
      "email": "robert@gmx.de",
      "dateOfBirth": this.helperService.convertStringToDate("26.04.1993"),
      "gender": "male",
      "password": "test123",
      "confirmPassword": "test123",
      "acceptTerms": true,
      "reason": "Chat",
      "info": "Hey, ich bins!",
      "imgPath": '/assets/images/portraits/men/0.jpg',
      "img": null
    },
    // {
    //   "name": "Alex",
    //   "email": "alex@gmx.de",
    //   "dateOfBirth": this.helperService.convertStringToDate("11.04.1995"),
    //   "gender": "male",
    //   "password": "test123",
    //   "confirmPassword": "test123",
    //   "acceptTerms": true,
    //   "reason": "Chat",
    //   "info": "Hey, ich bins!",
    //   "imgPath": '/assets/images/portraits/men/_1.jpg',
    //   "img": null
    // },
    // {
    //   "name": "Susi",
    //   "email": "Susi@gmx.de",
    //   "dateOfBirth": this.helperService.convertStringToDate("22.07.1998"),
    //   "gender": "female",
    //   "password": "test123",
    //   "confirmPassword": "test123",
    //   "acceptTerms": true,
    //   "reason": "Chat",
    //   "info": "Hey, ich bins!",
    //   "imgPath": '/assets/images/portraits/women/0.jpg',
    //   "img": null
    // },
    // {
    //   "name": "Elfriede",
    //   "email": "Elfriede@gmx.de",
    //   "dateOfBirth": this.helperService.convertStringToDate("01.12.1994"),
    //   "gender": "female",
    //   "password": "test123",
    //   "confirmPassword": "test123",
    //   "acceptTerms": true,
    //   "reason": "Chat",
    //   "info": "Hey, ich bins!",
    //   "imgPath": '/assets/images/portraits/women/_3.jpg',
    //   "img": null
    // },
  ]

  constructor(
    private dbService: DBService,
    private helperService: HelperService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    // let img: any;
    // let img = this.helperService.toDataUrl("src/assets/images/portraits/men/0.jpg"), function name(params:type) {

    // }


    // this.http.get("/assets/images/portraits/men/0.jpg", { responseType: 'blob' })
    //   .subscribe(blob => {
    //     const reader = new FileReader();
    //     const binaryString = reader.readAsDataURL(blob);
    //     reader.onload = (event: any) => {
    //       console.log('Image in Base64: ', event.target.result);
    //       return event.target.result;
    //     };
    //     reader.onerror = (event: any) => {
    //       console.log("File could not be read: " + event.target.error.code);
    //     };

    //   });

    // console.log(img)

    // for (let user of this.users) {
    //   user.img = this.convertImageToBase64(user.img);
    // }

  }


  createUsers() {
    // 95 men
    // 46 women
    for (let user of this.users) {
      this.helperService.getBase64ImageFromUrl(user.imgPath)
        .then(result => user.img = result)
        .catch(err => console.error(err));
      console.log(user)
      this.dbService.addUser(user);
    }



  }

  userimg: any = {
    "img": null,
    "src": null
  };

  log() {
    console.log(this.users)
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
