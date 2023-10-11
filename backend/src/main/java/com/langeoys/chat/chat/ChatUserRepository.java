package com.langeoys.chat.chat;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

/**
 * ChatUserRepository
 */
public interface ChatUserRepository extends CrudRepository<ChatUser, Long> {
    public Optional<ChatUser> getByUsername(String username); 
        
}
