package com.langeoys.chat.chat;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * NextMovieController
 */
@RequestMapping("/api")
@RestController
public class ChatController {
    @Autowired
    private ChatUserRepository chatUserRepository;

    @GetMapping("/rooms/{username}")
    public List<ChatRoom> getRooms(@PathVariable String username) {
        Optional<ChatUser> chatUser = chatUserRepository.getByUsername(username);

        if (chatUser.isEmpty()) {
            throw new IllegalArgumentException("User with id " + username + " not found");
        }

        return chatUser.get().getRooms();
    }


}
