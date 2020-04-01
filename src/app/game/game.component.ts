import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/services/db.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  constructor(private dbService: DBService) { }

  ngOnInit() {
  }

  getRandomUser(gender: String) {
    this.dbService.getRandomUserByGender(gender).then((foundRandomUser: any) => {
      if (foundRandomUser != undefined) {
        console.log(foundRandomUser);
      }
    });
  }

}
