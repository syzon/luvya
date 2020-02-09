import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { DBService } from 'src/services/db.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  // TODO: Typ anpassen
  user: any;

  reasons = ['Chats', 'Acquaintances', 'Dates'];

  constructor(private dbService: DBService) { }

  ngOnInit() {
    this.user = this.dbService.getLoggedInUser(this.dbService.getLoggedInUserId);
    console.log(this.user)
  }

  log() {
    console.log(user)
  }
}
