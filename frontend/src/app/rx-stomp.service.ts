import { Injectable } from "@angular/core";
import { RxStomp } from "@stomp/rx-stomp";
import { ChatRoom, ChatMessage } from "src/types/types";
import { ChatSubscription } from "./chat-subscription";

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor() {
    super();
  }

  activeRoom!: ChatSubscription;
  chatSubscriptions: ChatSubscription[] = [];
  activeUser!: string;

  public getChatRooms(): string[] {
    return this.chatSubscriptions.map((x) => x.getRoomName());
  }

  public joinRoom(newRoomName: string): void {
    const observable = this.watch('/topic/' + newRoomName, { "username": this.activeUser});

    // TODO retrieve chatroom from api
    let newChatRoom: ChatRoom = {
        name: newRoomName,
        chatMessages: [],
        users: [],
    };
    const newChatSubscription = new ChatSubscription(newChatRoom, observable);
    this.chatSubscriptions.push(newChatSubscription);
    this.activeRoom = newChatSubscription;
  }

  public getActiveChatLog(): ChatMessage[] {
    if (this.chatSubscriptions.length < 1 || !this.activeRoom) return [];

    return this.activeRoom.getChatLog();
  }

  public sendMessage(newMessageString: string): void {
    this.publish({
      destination: '/app/' + this.activeRoom.getRoomName(),
      body: newMessageString,
      headers: {
        "username": this.activeUser,
      }
    });
  }
}
