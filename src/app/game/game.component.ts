import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  foundRandomUsers: any[];
  displayedUser: any;
  age: number;

  constructor(private dbService: DBService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getRandomUsers();
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  postMatchAction(action: string) {
    let account = this.dbService.getAccount();

    // TODO: optimize code here
    switch (action) {
      case "like":
        account['liked'] = account['liked'] || [];
        if (account['liked'].indexOf(this.displayedUser.email) === -1) {
          account['liked'].push(this.displayedUser.email)
        };
        break;
      case "dislike":
        account['disliked'] = account['disliked'] || [];
        if (account['disliked'].indexOf(this.displayedUser.email) === -1) {
          account['disliked'].push(this.displayedUser.email)
        };
        break;
      // superlike implementieren
      case "superlike":
        account['superliked'] = account['superliked'] || [];
        if (account['superliked'].indexOf(this.displayedUser.email) === -1) {
          account['superliked'].push(this.displayedUser.email)
        };
        break;
      default:
        console.log("ERROR");
    }

    this.dbService.updateUserData(account)
    // delete displayedUser from foundRandomUsers
    this.foundRandomUsers = this.foundRandomUsers.filter(user => user.email !== this.displayedUser.email);
    console.log(this.foundRandomUsers);

    console.log(this.foundRandomUsers);
    console.log(this.foundRandomUsers.length);
    if (this.foundRandomUsers.length > 0) {
      this.displayedUser = this.getRandomUserFromRandomUsers();
      this.getAgeOfDisplayedUser();
    } else {
      this.displayedUser = null;
      this.getRandomUsers();
    }

    // console.log(this.displayedUser)

  }

  getRandomUsers() {
    if (!this.dbService.getAccount().hasOwnProperty('liked')) {
      this.dbService.getAccount()['liked'] = [];
    }
    if (!this.dbService.getAccount().hasOwnProperty('disliked')) {
      this.dbService.getAccount()['disliked'] = [];
    }

    console.log("GET RANDOM USERS")
    console.log(this.foundRandomUsers)
    this.dbService.getRandomUsersByGender(10, this.dbService.getAccount().lookingFor).then((foundRandomUsers: any) => {
      if (foundRandomUsers != undefined) {
        console.log(foundRandomUsers)
        this.foundRandomUsers = foundRandomUsers;
        this.displayedUser = this.getRandomUserFromRandomUsers();
        if (this.displayedUser !== undefined) {
          this.getAgeOfDisplayedUser();
        }
      }

      // else {
      //   console.log(this.getRandomUsers())
      //   // this.getRandomUser();
      // }
    });

  }

  getRandomUserFromRandomUsers() {
    return this.foundRandomUsers[Math.floor(Math.random() * this.foundRandomUsers.length)];
  }

  getAgeOfDisplayedUser() {
    console.log(this.displayedUser.dateOfBirth);
    console.log(this.displayedUser.dateOfBirth.getTime());
    let timeDiff = Math.abs(Date.now() - this.displayedUser.dateOfBirth.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

}
