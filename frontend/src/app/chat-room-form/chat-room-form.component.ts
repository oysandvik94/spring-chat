import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ListboxModule} from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';


@Component({
  selector: 'app-chat-room-form',
  templateUrl: './chat-room-form.component.html',
  styleUrls: ['./chat-room-form.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [DropdownModule, FormsModule, ListboxModule, InputTextModule, ButtonModule, StyleClassModule]
})
export class ChatRoomFormComponent {
  @Output() activeChat: string = "";
  @Input() chatRooms: string[] = [];

  newRoomName: string = "";

  constructor(public stompService: RxStompService) {
  }

  joinRoom() {
    this.stompService.joinRoom(this.newRoomName);
    this.newRoomName = "";
  }
}
