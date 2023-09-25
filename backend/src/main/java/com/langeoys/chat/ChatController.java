package com.langeoys.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

/**
 * NextMovieController
 */
@RestController
public class ChatController {

    @MessageMapping("sendChat")
    @SendTo("/topic/chat")
    public String sendChat(String chatMessage) {
        return chatMessage;
    }

}
