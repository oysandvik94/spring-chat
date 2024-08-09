package com.langeoys.chat.chat;

import java.security.Principal;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import com.langeoys.chat.ChatHeaders;
import com.langeoys.chat.chat.dtos.NotificationDto;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Controller
public class StompController {

    Logger logger = LoggerFactory.getLogger(StompController.class);

    @Autowired private ChatRepository chatRepository;

    @Autowired private EntityManager entityManager;

    @Autowired private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired private ChatUserRepository chatUserRepository;

    @Autowired private ChatSession chatSession;


    @SubscribeMapping("/{roomName}")
    @Transactional
    public void subscribeToRoom(
            @DestinationVariable String roomName,
            @Header(ChatHeaders.USERNAME_HEADER_KEY) String username) {
        logger.debug(String.format("User %s subscribed to room %s", username, roomName));

        ChatRoom chatroom = chatRepository.findByName(roomName);

        if (chatroom == null) {
            chatroom = chatRepository.save(new ChatRoom(roomName));
        }

        Optional<ChatUser> user = chatUserRepository.getByUsername(username);

        if (!user.isPresent()) {
            throw new IllegalArgumentException("User with username " + username + " not found");
        }

        ChatUser savedUser = user.get();
        if (!chatroom.containsUser(savedUser)) {
            savedUser.joinRoom(chatroom);
            entityManager.persist(savedUser);
        }
    }

    @MessageMapping("/{roomName}")
    @Transactional
    public ChatMessage sendChat(
            @DestinationVariable String roomName,
            String messageBody,
            @Header(ChatHeaders.USERNAME_HEADER_KEY) String username,
            Principal userA) {
        logger.debug(String.format("Received message: %s, room: %s", messageBody, roomName));

        ChatRoom chatRoom = chatRepository.findByName(roomName);

        ChatMessage chatMessage = new ChatMessage(messageBody, username);
        chatRoom.sendMessage(chatMessage);
        entityManager.persist(chatRoom);

        for (ChatUser user : chatRoom.getUsers()) {
            if (user.getUsername().equals(username)) {
                continue;
            }

            Notification notification = new Notification(user, roomName);
            entityManager.persist(notification);

            String sessionUserId = chatSession.getSessionFromUsername(user.getUsername());

            if (sessionUserId == null) {
                continue;
            }

            logger.debug(String.format("Sending message to user: %s", sessionUserId));
            simpMessagingTemplate.convertAndSendToUser(
                    sessionUserId,
                    "/topic/notifications",
                    NotificationDto.fromEntity(notification));
        }
        return chatMessage;
    }
}
