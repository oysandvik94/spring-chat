import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  private webSocket: WebSocket;
  chatLog: string[] = [];
  newMessage: string = "";

  constructor() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket.onmessage = (event) => {
      this.chatLog.push(event.data);
    }
  }

  public sendMessage(): void {
    this.webSocket.send(this.newMessage);
  }
}
