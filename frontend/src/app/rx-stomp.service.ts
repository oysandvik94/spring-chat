import { Injectable } from '@angular/core';
import { IMessage, RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { ChatMessage, ChatRoom, ChatUser, Notification } from 'src/types/types';
import { ChatSubscription } from './chat-subscription';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor(private dataService: DataService) {
    super();
  }

  activeRoom!: ChatSubscription;
  chatSubscriptions: ChatSubscription[] = [];
  activeUser!: ChatUser;

  public login(user: ChatUser) {
    this.activeUser = user;
    this.configure(this.buildConfig(user.username));
    this.activate();

    this.dataService
      .getChatRooms(user.username)
      .subscribe((data: ChatRoom[]) => {
        data.forEach((room: ChatRoom) => this.joinRoom(room.name));
      });

    this.watch('/user/topic/notifications', {
      username: user.username,
    }).subscribe((message: IMessage) => {
      const notification: Notification = JSON.parse(message.body);

      this.notificationHandler(notification);
    });

    this.dataService
      .getNotificationsForUser(user.id)
      .subscribe((data: Notification[]) => {
        data.forEach((notification: Notification) =>
          this.notificationHandler(notification),
        );
      });
  }

  private notificationHandler(notification: Notification): void {
    const targetRoom: ChatSubscription | undefined =
      this.chatSubscriptions.find(
        (x: ChatSubscription) => x.getRoomName() === notification.roomName,
      );

    if (!targetRoom) {
      return;
    }

    if (targetRoom.getRoomName() === this.activeRoom?.getRoomName()) {
      this.dataService.acknowledgeNotifications(this.activeUser.id, [
        notification.id,
      ]);

      return;
    }

    targetRoom.notify(notification);
  }

  public getChatRooms(): string[] {
    return this.chatSubscriptions.map((x) => x.getRoomName());
  }

  public joinRoom(newRoomName: string): void {
    const observable = this.watch('/topic/' + newRoomName, {
      username: this.activeUser.username,
    });

    // TODO retrieve chatroom from api
    let newChatRoom: ChatRoom = {
      name: newRoomName,
      chatMessages: [],
      users: [],
    };
    const newChatSubscription = new ChatSubscription(
      newChatRoom,
      observable,
      this,
    );
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
        username: this.activeUser.username,
      },
    });
  }

  private buildConfig(username: string): RxStompConfig {
    return {
      brokerURL: `ws://localhost:8080/chat`,

      connectHeaders: {
        username: username,
      },

      heartbeatIncoming: 0,

      heartbeatOutgoing: 20000,

      reconnectDelay: 200,

      debug: (msg: string): void => {
        console.log(new Date(), msg);
      },
    };
  }
}
