import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { DomSanitizer } from '@angular/platform-browser';

class ImageSnipped {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  selectedImage: ImageSnipped;

  constructor(private dbService: DBService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getRandomUser('female')
  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getRandomUser(gender: String) {
    this.dbService.getRandomUserByGender(gender).then((foundRandomUser: any) => {
      if (foundRandomUser != undefined) {
        this.selectedImage = foundRandomUser.img;
      } else {
        this.getRandomUser(gender);
      }
    });
  }

}
