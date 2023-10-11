import { Component } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ChatRoom } from 'src/types/types';

@Component({
  selector: 'app-username-splash',
  templateUrl: './username-splash.component.html',
  styleUrls: ['./username-splash.component.css'],
})
export class UsernameSplashComponent {
  username: string = '';

  constructor(
    private stompService: RxStompService,
    private router: Router,
    private dataService: DataService,
  ) {}

  joinChat() {
    this.stompService.activeUser = this.username;
    this.dataService
      .getChatRooms(this.stompService.activeUser)
      .subscribe((data: ChatRoom[]) => {
        data.forEach((room: ChatRoom) => this.stompService.joinRoom(room.name));
      });
    this.router.navigate(['/chat']);
  }
}
