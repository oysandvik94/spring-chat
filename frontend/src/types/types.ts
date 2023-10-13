export interface ChatRoom {
  name: string;
  chatMessages: ChatMessage[];
  users: ChatUser[];
}

export interface ChatMessage {
  Id: number;
  body: string;
  fromUser: string;
  chatroom: ChatRoom;
}

export interface ChatUser {
  username: string;
}
