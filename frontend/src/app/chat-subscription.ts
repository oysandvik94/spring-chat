import { IMessage } from '@stomp/rx-stomp';
import { Observable, Subscription } from 'rxjs';
import { ChatMessage, ChatRoom, Notification } from 'src/types/types';
import { RxStompService } from './rx-stomp.service';

export class ChatSubscription {
  private chatRoom: ChatRoom;
  private subscription: Subscription;
  private notifications: Notification[] = [];

  constructor(
    chatRoom: ChatRoom,
    observable: Observable<IMessage>,
    private stompService: RxStompService,
  ) {
    this.chatRoom = chatRoom;
    this.subscription = observable.subscribe(this.messageHandler);
  }

  public getRoomName(): string {
    return this.chatRoom.name;
  }

  public getChatLog(): ChatMessage[] {
    return this.chatRoom.chatMessages;
  }

  public clearNotifications(): void {
    this.notifications = [];
  }

  private messageHandler = (message: IMessage) => {
    let chatMessage = JSON.parse(message.body) as ChatMessage;

    this.chatRoom.chatMessages.push(chatMessage);
  };

  public notify(notification: Notification): void {
    this.notifications.push(notification);
  }

  public getNotificationCount(): number {
    return this.notifications.length;
  }

  public getNotificationIds(): number[] {
    return this.notifications.map((x) => x.id);
  }
}
