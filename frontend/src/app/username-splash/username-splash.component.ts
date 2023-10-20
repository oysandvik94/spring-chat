import { Component } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ChatRoom, ChatUser } from 'src/types/types';
import { catchError, throwError } from 'rxjs';

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
    this.dataService
      .getChatUser(this.username)
      .pipe(
        catchError((error: any) => {
          if (error.status === 404) {
            this.dataService
              .createUser(this.username)
              .subscribe((data: ChatUser) => {
                this.stompService.login(data);
                this.router.navigate(['/chat']);
              });
          }
          return throwError(() => error);
        }),
      )
      .subscribe((data: ChatUser) => {
        this.stompService.login(data);

        this.dataService
          .getChatRooms(data.username)
          .subscribe((data: ChatRoom[]) => {
            data.forEach((room: ChatRoom) =>
              this.stompService.joinRoom(room.name),
            );
          });
        this.router.navigate(['/chat']);
      });
  }
}
