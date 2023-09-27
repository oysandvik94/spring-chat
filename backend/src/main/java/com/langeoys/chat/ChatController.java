package com.langeoys.chat;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

/**
 * NextMovieController
 */
@RestController
public class ChatController {

    @MessageMapping("{roomId}/sendChat")
    @SendTo("/topic/chat/{roomId}")
    public ChatMessage sendChat(@DestinationVariable String roomId, ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("join")
    public void join(String roomName) {
        System.out.println(roomName);
    }
}
