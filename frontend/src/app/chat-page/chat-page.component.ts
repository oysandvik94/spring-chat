import { Component } from '@angular/core';
import { ChatLogComponent } from '../chat-log/chat-log.component';
import { ChatRoomFormComponent } from '../chat-room-form/chat-room-form.component';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
  standalone: true,
  imports: [ ChatLogComponent, ChatRoomFormComponent ]
})
export class ChatPageComponent {

}
