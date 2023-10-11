package com.langeoys.chat.chat;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

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
}
