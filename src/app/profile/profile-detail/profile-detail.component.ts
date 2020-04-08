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
    lookingFor: '',
    reason: '',
    info: ''
  };

  statusMessage: string = 'Loading data. Please wait...';

  lookingForOptions = ['female', 'male', 'both'];
  reasons = ['Chats', 'Acquaintances', 'Dates'];

  constructor(private dbService: DBService) {
  }

  ngOnInit() {
    console.log(this.dbService.getAccount())

    const account = this.dbService.getAccount();
    this.user.name = account.name;
    this.user.reason = account.reason;
    this.user.lookingFor = account.lookingFor;
    this.user.info = account.info;
  }

  saveData() {
    console.log(this.user)
    // this.dbService.updateUserData(this.dbService.getLoggedInUserEmail(), this.user);
    this.dbService.updateUserData(this.user);
  }

  updataData(data: any) {
    console.log(data)
  }

  log() {
    console.log(this.user)
  }
}
