import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { ChatMessage } from 'src/types/chat';

type ChatRoom = {
  roomName: string,
  subscription: any,
  chatLog: ChatMessage[]
};

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor() {
    super();
  }

  activeChat!: ChatRoom;
  chatSubscriptions: ChatRoom[] = [];
  activeUser!: string;

  public getChatRooms(): string[] {
    return this.chatSubscriptions.map(x => x.roomName);
  }

  public joinRoom(newRoomName: string): void {
    let subscription = this.watch("/topic/chat/" + newRoomName).subscribe((message) => {
      let chatMessage = JSON.parse(message.body) as ChatMessage;
      this.chatSubscriptions.filter(x => x.roomName == chatMessage.roomName)[0].chatLog.push(chatMessage);
    });

    let newChatRoom = { roomName: newRoomName, subscription: subscription, chatLog: [] };
    this.chatSubscriptions.push(newChatRoom);
    this.activeChat = newChatRoom;
  }

  public getActiveChatLog(): ChatMessage[] {
    if (this.chatSubscriptions.length < 1) return [];

    return this.activeChat.chatLog;
  }

  public sendMessage(newMessageString: string): void {
    let newMessage: ChatMessage = { body: newMessageString, from: this.activeUser, roomName: this.activeChat.roomName };
    this.publish({ destination: '/topic/chat/' + this.activeChat.roomName, body: JSON.stringify(newMessage) })
  }
}

