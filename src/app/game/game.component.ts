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
    this.displayedUser = this.getRandomUserFromRandomUsers();
    console.log(this.displayedUser)
    // if (this.foundRandomUsers.length === 0) {
    //       this.getRandomUsers()
    // }
  }

  getRandomUsers() {
    this.dbService.getRandomUsersByGender(10, this.dbService.getAccount().lookingFor).then((foundRandomUsers: any) => {
      if (foundRandomUsers != undefined) {
        console.log(foundRandomUsers)
        this.foundRandomUsers = foundRandomUsers;
        this.displayedUser = this.getRandomUserFromRandomUsers();
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

}
