import { Component } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { RxStompService } from './rx-stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  private stompService: RxStompService;
  chatLog: string[] = [];
  newMessage: string = "";

  constructor(private rxStompService: RxStompService) {
    this.stompService = rxStompService;
    this.stompService.watch("/topic/chat").subscribe((message) => {
      this.chatLog.push(message.body);
    });
  }


  public sendMessage(): void {
    this.stompService.publish({ destination: '/topic/chat', body: this.newMessage })
  }
}
