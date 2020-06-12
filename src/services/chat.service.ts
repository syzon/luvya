// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { WebsocketService } from './websocket.service';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {

//   messages: Subject<any>;

//   constructor(private wsService: WebsocketService) {
//     this.messages = <Subject<any>>wsService
//       .connect().pipe(
//         map((response: any): any => {
//           return response;
//         })
//       );
//   }

//   sendMsg(msg) {
//     this.messages.next(msg);
//   }


// }


import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

}