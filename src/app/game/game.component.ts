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
    // superlike implementieren
    // if (action === 'like') {
    //   this.dbService.getAccount().liked.push(this.foundRandomUser.email)
    // } else {
    //   this.dbService.getAccount().disliked.push(this.foundRandomUser.email)
    // }

    // this.dbService.updateUserData(this.user);
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
