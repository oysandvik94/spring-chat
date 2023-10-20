package com.langeoys.chat.chat;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

/**
 * Chatroom
 */
@Entity
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String name;

    @OneToMany(mappedBy = "chatroom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @ManyToMany(mappedBy = "chatRooms")
    private List<ChatUser> users = new ArrayList<>();

    public List<ChatUser> getUsers() {
        return users;
    }

    protected ChatRoom() {
    }

    public ChatRoom(String name) {
        this.name = name;
    }

    public List<ChatMessage> getChatMessages() {
        return chatMessages;
    }

    public void sendMessage(ChatMessage chatMessage) {
        chatMessages.add(chatMessage);
        chatMessage.setChatroom(this);
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * Checks if a user is already in the chatroom
     *
     * @param user
     * @return
     */
    public boolean containsUser(ChatUser user) {
        for (ChatUser chatUser : users) {
            if (user.getUsername().equals(chatUser.getUsername())) {
                return true;
            }
        }
        return false;
    }
}
