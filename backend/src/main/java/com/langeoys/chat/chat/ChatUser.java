package com.langeoys.chat.chat;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

/**
 * User
 */
@Entity
public class ChatUser implements Principal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public String getUsername() {
        return username;
    }

    private String username;

    @OneToMany(mappedBy = "chatUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications = new ArrayList<>();

    @ManyToMany
    @JoinTable(name="chatroom_user",
            joinColumns=@JoinColumn(name="chatuser_id"),
            inverseJoinColumns=@JoinColumn(name="chatroom_id")
     )
    private List<ChatRoom> chatRooms = new ArrayList<>();

    public ChatUser(String username) {
        this.username = username;
    }

    protected ChatUser() {
    }

    public void joinRoom(ChatRoom chatRoom) {
        chatRooms.add(chatRoom);
    }

    @Override
    public String getName() {
        return getUsername();
    }

    /**
     * Get rooms that user has joined
     *
     * @return
     */
    public List<ChatRoom> getRooms() {
        return chatRooms;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Notification> getUnreadNotifications() {
        return notifications
            .stream()
            .filter(x -> !x.isRead())
            .toList();
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public List<ChatRoom> getChatRooms() {
        return chatRooms;
    }

    public void setChatRooms(List<ChatRoom> chatRooms) {
        this.chatRooms = chatRooms;
    }
}
