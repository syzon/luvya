import { Component, OnInit, Inject } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchDialogComponent } from './match-dialog/match-dialog.component';

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
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRandomUsers();
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  postMatchAction(action: string) {
    let account = this.dbService.getAccount();


    this.openDialog();

    // TODO: optimize code here
    switch (action) {
      case "like":
        account['liked'] = account['liked'] || [];
        if (account['liked'].indexOf(this.displayedUser.email) === -1) {
          account['liked'].push(this.displayedUser.email)
        };
        // match-case
        // if (this.displayedUser.liked !== undefined) {
        //   for (let index = 0; index < this.displayedUser.liked.length; index++) {
        //     if (account.email === this.displayedUser.liked[index]) {
        //       this.openDialog()
        //     }
        //   }
        // }
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

    // console.log(this.displayedUser)

  }

  getNewUser() {
    // delete displayedUser from foundRandomUsers
    this.foundRandomUsers = this.foundRandomUsers.filter(user => user.email !== this.displayedUser.email);
    console.log(this.foundRandomUsers);
    console.log(this.foundRandomUsers.length);
    if (this.foundRandomUsers.length > 0) {
      this.displayedUser = this.getRandomUserFromRandomUsers();
      this.getAgeOfDisplayedUser();
    } else {
      this.displayedUser = null;
      this.getRandomUsers();
    }
  }

  // openDialog() {
  //   this.dialog.open(MatchDataDialog, {
  //     // data: {
  //     //   animal: 'panda'
  //     // }
  //     data: this.displayedUser.name
  //   });
  // }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      // id: 1,
      // title: 'Angular For Beginners',
      description: 'Congrats! You just matched with',
      matchedWithUser: this.displayedUser,
    };

    this.dialog.open(MatchDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(MatchDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog output:", result);
      if (result === 0) {
        // go to chat
      } else {
        this.getNewUser();
      }
    });
  }




  getRandomUsers() {
    if (!this.dbService.getAccount().hasOwnProperty('liked')) {
      this.dbService.getAccount()['liked'] = [];
    }
    if (!this.dbService.getAccount().hasOwnProperty('disliked')) {
      this.dbService.getAccount()['disliked'] = [];
    }

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
    let timeDiff = Math.abs(Date.now() - this.displayedUser.dateOfBirth.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

}

@Component({
  selector: 'match-data-dialog',
  templateUrl: 'match-data-dialog.html',
})
export class MatchDataDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: 'lol') { }
}
