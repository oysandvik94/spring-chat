package com.langeoys.chat;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import com.langeoys.chat.chat.ChatUser;


public class UserHandshakeHandler extends DefaultHandshakeHandler {
    Logger logger = LoggerFactory.getLogger(UserHandshakeHandler.class);

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
            Map<String, Object> attributes) {
        final String randomId = UUID.randomUUID().toString();

        logger.debug("User with ID '{}' connected", randomId);

        return new ChatUser(randomId);
    }
    
}
