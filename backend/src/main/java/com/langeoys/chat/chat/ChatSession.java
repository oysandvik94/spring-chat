package com.langeoys.chat.chat;

import java.util.concurrent.ConcurrentHashMap;

public class ChatSession {

    ConcurrentHashMap<String, String> sessions = new ConcurrentHashMap<>();

    public void addUserToSession(String username, String sessionId) {
        sessions.put(username, sessionId);
    }

    public String getSessionFromUsername(String username) {
        return sessions.get(username);
    }

    public String getUsernameFromSession(String name) {
        return sessions.keySet().stream()
                .filter(key -> sessions.get(key).equals(name))
                .findFirst()
                .orElse(null);
    }
}
