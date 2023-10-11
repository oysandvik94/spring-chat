package com.langeoys.chat;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import com.langeoys.chat.chat.ChatMessage;
import com.langeoys.chat.chat.ChatRepository;
import com.langeoys.chat.chat.ChatRoom;
import com.langeoys.chat.chat.ChatUser;
import com.langeoys.chat.chat.ChatUserRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Component
public class StompListener implements ApplicationListener<SessionSubscribeEvent> {
    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatUserRepository chatUserRepository;

    @Autowired
    private EntityManager entityManager;


    @MessageMapping("/{roomName}")
    @Transactional
    // TODO dont use chatmessage for input
    public ChatMessage sendChat(@DestinationVariable String roomName, ChatMessage chatMessage) {
        ChatRoom chatRoom = chatRepository.findByName(roomName);
        chatRoom.sendMessage(chatMessage);
        entityManager.persist(chatRoom);

        return chatMessage;
    }

    @GetMapping("/rooms/{username}")
    @Override
    @Transactional
    public void onApplicationEvent(SessionSubscribeEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        String destination = headers.getDestination();
        String roomName = destination.substring(destination.lastIndexOf("/") + 1);

        ChatRoom chatroom = chatRepository.findByName(roomName);

        if (chatroom == null) {
            chatroom = chatRepository.save(new ChatRoom(roomName));
        }

        String username = headers.getFirstNativeHeader("username");
        Optional<ChatUser> user = chatUserRepository.getByUsername(username);

        if (!user.isPresent()) {
            user = Optional.of(chatUserRepository.save(new ChatUser(username)));
            entityManager.persist(user.get());
        }

        ChatUser savedUser = user.get();
        if (!chatroom.containsUser(savedUser)) {
            savedUser.joinRoom(chatroom);
            entityManager.persist(savedUser);
        }

        List<ChatMessage> messages = chatroom.getChatMessages();

        messages.stream().forEach(message -> template.convertAndSend(destination, message));
    }
}
