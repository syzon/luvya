import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // this.chatService.messages.subscribe(msg => {
    //   console.log(msg);
    // })
  }

  sendMessage() {
    console.log("TEST")
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
