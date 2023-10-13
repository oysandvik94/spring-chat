import { IMessage } from '@stomp/rx-stomp';
import { Observable, Subscription } from 'rxjs';
import { ChatRoom, ChatMessage } from 'src/types/types';

export class ChatSubscription {
  private chatRoom: ChatRoom;
  private subscription: Subscription;
  public unreadMessages: number = 0;

  constructor(chatRoom: ChatRoom, observable: Observable<IMessage>) {
    this.chatRoom = chatRoom;
    this.subscription = observable.subscribe(this.messageHandler);
  }

  public getRoomName(): string {
    return this.chatRoom.name;
  }

  public getChatLog(): ChatMessage[] {
    return this.chatRoom.chatMessages;
  }

  private messageHandler = (message: IMessage) => {
    let chatMessage = JSON.parse(message.body) as ChatMessage;

    this.chatRoom.chatMessages.push(chatMessage);
    this.unreadMessages++;
  };
}
