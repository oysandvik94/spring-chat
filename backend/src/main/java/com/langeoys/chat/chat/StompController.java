package com.langeoys.chat.chat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Controller
public class StompController {
    private static final String USERNAME_HEADER_KEY = "username";

    Logger logger = LoggerFactory.getLogger(StompController.class);

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private EntityManager entityManager;

    @MessageMapping("/{roomName}")
    @Transactional
    public ChatMessage sendChat(@DestinationVariable String roomName, String messageBody, @Header(USERNAME_HEADER_KEY) String username) {
        logger.debug(String.format("Received message: %s, room: %s", messageBody, roomName));

        ChatRoom chatRoom = chatRepository.findByName(roomName);

        ChatMessage chatMessage = new ChatMessage(messageBody, username);
        chatRoom.sendMessage(chatMessage);
        entityManager.persist(chatRoom);

        return chatMessage;
    }

}
