package com.langeoys.chat.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

/**
 * ChatMessage
 */
@Entity
public class ChatMessage {

    /**
     *
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String body;
    private String fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatroom;

    public String getBody() {
        return body;
    }

    public ChatMessage(String body, String fromUser) {
        this.body = body;
        this.fromUser = fromUser;
    }

    protected ChatMessage() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getFromUser() {
        return fromUser;
    }

    public void setFromUser(String from) {
        this.fromUser = from;
    }

    public void setChatroom(ChatRoom chatRoom2) {
        this.chatroom = chatRoom2;

    }

}
