export interface ChatRoom {
  name: string;
  chatMessages: ChatMessage[];
  users: ChatUser[];
}

export interface ChatMessage {
  id: number;
  body: string;
  fromUser: string;
  chatroom: ChatRoom;
  unReadByUser: boolean;
}

export interface ChatUser {
  id: number;
  username: string;
}

export interface Notification {
  id: number;
  roomName: string;
}
