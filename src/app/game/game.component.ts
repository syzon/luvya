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

  account: any;
  foundRandomUsers: any[];
  displayedUser: any;
  age: number;

  constructor(private dbService: DBService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRandomUsers();
    // console.log(this.dbService.findByKeyAndValueAccount('gender', 'female'));
    // this.dbService.updateMany();
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  postMatchAction(action: string) {
    let account = this.account = this.dbService.getAccount();

    // TODO: optimize code here
    switch (action) {
      case "like":
        account['liked'] = account['liked'] || [];
        if (account['liked'].indexOf(this.displayedUser.email) === -1) {
          account['liked'].push(this.displayedUser.email)
        };
        // match-case
        if (this.displayedUser.liked !== undefined) {
          for (let index = 0; index < this.displayedUser.liked.length; index++) {
            if (account.email === this.displayedUser.liked[index]) {
              // add match to both users match-array
              // own acc
              if (!account.hasOwnProperty('matches')) {
                account.matches = [];
              }

              account.matches.push(this.displayedUser.email);
              this.dbService.updateUserData(account)



              // match-acc
              this.dbService.findAccount(this.displayedUser.email).then((foundAccount: any) => {
                console.log(JSON.stringify(this.displayedUser.email));
                console.log(JSON.stringify(foundAccount));
                // let matchAccount = this.dbService.getAccountViaEmail(this.displayedUser.email);
                if (!foundAccount.hasOwnProperty('matches')) {
                  foundAccount.matches = [];
                }
                foundAccount.matches.push(this.account.email);
                console.log(JSON.stringify(foundAccount));
                this.dbService.updateUserData(foundAccount)
              });






              this.openDialog()
            }
          }
        }
        this.getNewUser();
        break;
      case "dislike":
        account['disliked'] = account['disliked'] || [];
        if (account['disliked'].indexOf(this.displayedUser.email) === -1) {
          account['disliked'].push(this.displayedUser.email)
        };
        this.dbService.updateUserData(account)
        this.getNewUser();
        break;
      // superlike implementieren
      case "superlike":
        account['superliked'] = account['superliked'] || [];
        if (account['superliked'].indexOf(this.displayedUser.email) === -1) {
          account['superliked'].push(this.displayedUser.email)
        };
        this.dbService.updateUserData(account)
        this.getNewUser();
        break;
      default:
        console.log("ERROR");
    }

    // this.dbService.updateUserData(account)
    // this.getNewUser();
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
      user: this.account,
      matchedWithUser: this.displayedUser,
    };

    this.dialog.open(MatchDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(MatchDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.closeAll();
      console.log("Dialog output:", result);
      if (result === 0) {
        // go to chat
        console.log("CHAT")
      }
      else {
        console.log("NEW USER")
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
