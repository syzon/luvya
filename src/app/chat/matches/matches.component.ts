import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/services/db.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  matches = [];

  constructor(private dbService: DBService,
    private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    let account = this.dbService.getAccount()
    for (let index = 0; index < account.matches.length; index++) {
      // let matchAcc = this.dbService.getAccountViaEmail(account.matches[index]).then;
      await this.dbService.getAccountViaEmail(account.matches[index]).then(data => {
        this.matches.push(data)
      })
    }
    console.log(this.matches)

  }

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
