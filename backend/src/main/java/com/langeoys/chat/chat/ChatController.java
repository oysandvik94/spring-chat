package com.langeoys.chat.chat;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.langeoys.chat.chat.dtos.ChatRoomDto;
import com.langeoys.chat.chat.dtos.ChatUserDto;
import com.langeoys.chat.chat.dtos.NotificationDto;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@RequestMapping("/api")
@RestController
public class ChatController {
    record NotificationtAck(Long userId, List<Long> notificationIds) {
    }

    @Autowired
    private ChatUserRepository chatUserRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private EntityManager entityManager;

    Logger logger = LoggerFactory.getLogger(ChatController.class);

    @GetMapping("/rooms/{username}")
    public List<ChatRoomDto> getRooms(@PathVariable String username) {
        Optional<ChatUser> chatUser = chatUserRepository.getByUsername(username);

        if (chatUser.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User with id " + username + " not found");
        }

        return chatUser.get().getRooms().stream()
                .map(ChatRoomDto::fromEntity)
                .collect(Collectors.toUnmodifiableList());
    }

    @PostMapping("/notifications/read")
    @Transactional
    public void readNotification(@RequestBody NotificationtAck notificationAck) {
        Optional<ChatUser> user = chatUserRepository.findById(notificationAck.userId());

        if (user.isEmpty()) {
            throw new IllegalArgumentException(
                    "User with id " + notificationAck.userId() + " not found");
        }

        for (Long notificationId : notificationAck.notificationIds()) {
            Optional<Notification> notification = notificationRepository.findById(notificationId);

            notification.ifPresent(notif -> {
                notif.setRead(true);
                entityManager.persist(notification.get());
            });
        }

        entityManager.persist(user.get());
    }

    @GetMapping("/users/{username}")
    public ChatUserDto getUser(@PathVariable String username) {
        Optional<ChatUser> user = chatUserRepository.getByUsername(username);

        if (user.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User with username " + username + " not found");
        }

        return ChatUserDto.fromEntity(user.get());
    }

    @PostMapping("/users")
    public ChatUserDto addUser(@RequestBody String username) {
        logger.debug("Adding user: " + username);
        return ChatUserDto.fromEntity(chatUserRepository.save(new ChatUser(username)));
    }

    @GetMapping("/notifications/{userId}")
    public List<NotificationDto> getNotifications(@PathVariable Long userId) {
        logger.debug("Getting notifications for user: " + userId);

        Optional<ChatUser> chatUser = chatUserRepository.findById(userId);

        if (chatUser.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User with id " + userId + " not found");
        }

        return chatUser.get().getUnreadNotifications().stream()
                .map(NotificationDto::fromEntity)
                .collect(Collectors.toList());
    }
}
