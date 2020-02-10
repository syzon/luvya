import { Component, OnInit, OnChanges } from '@angular/core';
import { User } from 'src/models/user';
import { DBService } from 'src/services/db.service';
import { error } from 'util';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  // TODO: Typ anpassen
  user: any = {
    name: '',
    reason: '',
    info: ''
  };

  statusMessage: string = 'Loading data. Please wait...';

  reasons = ['Chats', 'Acquaintances', 'Dates'];

  constructor(private dbService: DBService) {
  }

  ngOnInit() {
    this.dbService.getLoggedInUser(this.dbService.getLoggedInUserId)
      .then((data) => {
        console.log(data)
        if (data) {
          this.user.name = data.name;
        }
      },
      );
  }

  updataData(data: any) {
    console.log(data)
  }

  log() {
    console.log(this.user)
  }
}
