import { Component } from '@angular/core';
import { RxStompService } from './rx-stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  activeChat: string = "";
  newMessage: string = "";

  roomName: string = "";

  constructor(public stompService: RxStompService) {
  }

}
