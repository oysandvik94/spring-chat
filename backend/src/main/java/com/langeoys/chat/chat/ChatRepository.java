package com.langeoys.chat.chat;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

/**
 * ChatRepository
 */
public interface ChatRepository extends CrudRepository<ChatRoom, Long> {
    ChatRoom findByName(String roomName);

    
}
