package com.langeoys.chat;

import com.langeoys.chat.chat.ChatSession;
import com.langeoys.chat.chat.ChatUser;
import com.langeoys.chat.chat.ChatUserRepository;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
public class StompConnectListener implements ApplicationListener<SessionConnectEvent> {

  @Autowired private ChatSession chatSession;

  @Autowired private ChatUserRepository chatUserRepository;

  @Override
  @Transactional
  public void onApplicationEvent(SessionConnectEvent event) {
    StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
    String username = headers.getFirstNativeHeader(ChatHeaders.USERNAME_HEADER_KEY);

    chatUserRepository.getByUsername(username);

    Optional<ChatUser> user = chatUserRepository.getByUsername(username);

    if (!user.isPresent()) {
      throw new ResponseStatusException(
          HttpStatus.FORBIDDEN, "User with id " + username + " not found");
    }

    ChatUser authenticatedUser = (ChatUser) headers.getUser();
    chatSession.addUserToSession(username, authenticatedUser.getName());
  }
}
