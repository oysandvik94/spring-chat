package com.langeoys.chat;

/**
 * ChatMessage
 */
public class ChatMessage {

    private String body;
    private String from;
    private String roomName;

    public String getBody() {
        return body;
    }

    public ChatMessage(String body, String from, String roomName) {
        this.body = body;
        this.from = from;
        this.roomName = roomName;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
