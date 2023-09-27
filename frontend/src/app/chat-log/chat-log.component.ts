import { Component } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-chat-log',
  templateUrl: './chat-log.component.html',
  styleUrls: ['./chat-log.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, CardModule],
})
export class ChatLogComponent {
  newMessage: string = "";

  constructor(public stompService: RxStompService) {
  }

  public sendMessage() {
    this.stompService.sendMessage(this.newMessage);
    this.newMessage = "";
  }
}
