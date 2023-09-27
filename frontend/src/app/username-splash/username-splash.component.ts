import { Component } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username-splash',
  templateUrl: './username-splash.component.html',
  styleUrls: ['./username-splash.component.css']
})
export class UsernameSplashComponent {
  username: string = "";

  constructor(private stompService: RxStompService, private router: Router){}

  joinChat() {
    this.stompService.activeUser = this.username;
    this.router.navigate(['/chat']);
  }
}
