import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { RxStompService } from '../rx-stomp.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat-room-form',
  templateUrl: './chat-room-form.component.html',
  styleUrls: ['./chat-room-form.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    BadgeModule,
    DropdownModule,
    FormsModule,
    CommonModule,
    ListboxModule,
    InputTextModule,
    ButtonModule,
    StyleClassModule,
  ],
})
export class ChatRoomFormComponent {
  @Output() activeChat: string = '';
  @Input() chatRooms: string[] = [];

  newRoomName: string = '';

  constructor(public stompService: RxStompService, private dataService: DataService) {}

  joinRoom() {
    this.stompService.joinRoom(this.newRoomName);
    this.newRoomName = '';

    this.setRoomAsRead();
  }

  setRoomAsRead() {
    this.dataService.acknowledgeNotifications(
      this.stompService.activeUser.id,
      this.stompService.activeRoom.getNotificationIds()
    );

    this.stompService.activeRoom.clearNotifications();
  }
}
