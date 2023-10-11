import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { ChatMessage, ChatRoom } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor() {
    super();
  }

  activeRoom!: ChatRoom;
  chatSubscriptions: ChatRoom[] = [];
  activeUser!: string;

  public getChatRooms(): string[] {
    return this.chatSubscriptions.map((x) => x.name);
  }

  public joinRoom(newRoomName: string): void {
    let subscription = this.watch('/topic/' + newRoomName, { "username": this.activeUser}).subscribe(
      (message) => {
        let chatMessage = JSON.parse(message.body) as ChatMessage;
        this.chatSubscriptions
          .filter((x) => x.name == this.activeRoom.name)[0]
          .chatMessages.push(chatMessage);
      },
    );

    let newChatRoom: ChatRoom = {
        name: newRoomName,
        subscription: subscription,
        chatMessages: [],
        users: []
    };
    this.chatSubscriptions.push(newChatRoom);
    this.activeRoom = newChatRoom;
  }

  public getActiveChatLog(): ChatMessage[] {
    if (this.chatSubscriptions.length < 1 || !this.activeRoom) return [];

    return this.activeRoom.chatMessages;
  }

  public sendMessage(newMessageString: string): void {
    let newMessage = {
      body: newMessageString,
      fromUser: this.activeUser,
      roomName: this.activeRoom.name,
    };
    this.publish({
      destination: '/app/' + this.activeRoom.name,
      body: JSON.stringify(newMessage),
    });
  }
}
