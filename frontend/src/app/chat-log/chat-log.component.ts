import { Component } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-chat-log',
  templateUrl: './chat-log.component.html',
  styleUrls: ['./chat-log.component.css'],
  standalone: true,
  imports: [MatDividerModule, MatCardModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, InputTextModule, CardModule],
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
