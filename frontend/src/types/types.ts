export interface ChatRoom {
  name: string;
  chatMessages: ChatMessage[];
  users: ChatUser[];
  subscription: any; // TODO Extract this behaviour
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
