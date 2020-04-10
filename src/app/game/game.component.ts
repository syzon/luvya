import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  foundRandomUser: any;

  constructor(private dbService: DBService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getRandomUser()
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  postMatchAction(action: string) {
    let account = this.dbService.getAccount();
    // superlike implementieren
    if (action === 'like') {
      account['liked'] = account['liked'] || [];
      if (account['liked'].indexOf(this.foundRandomUser.email) === -1) {
        account['liked'].push(this.foundRandomUser.email)
      }
      console.log(account);
    } else {
      this.dbService.getAccount().disliked.push(this.foundRandomUser.email)
    }

    this.dbService.updateUserData(account);
    this.getRandomUser()
  }

  getRandomUser() {
    this.dbService.getRandomUserByGender(this.dbService.getAccount().lookingFor).then((foundRandomUser: any) => {
      if (foundRandomUser != undefined) {
        this.foundRandomUser = foundRandomUser;
      } else {
        this.getRandomUser();
      }
    });
  }

}
