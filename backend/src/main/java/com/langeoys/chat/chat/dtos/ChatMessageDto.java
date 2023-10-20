package com.langeoys.chat.chat.dtos;

import com.langeoys.chat.chat.ChatMessage;

/** ChatMessageDto */
public record ChatMessageDto(long id, String body, String fromUser) {
    public static ChatMessageDto fromEntity(ChatMessage chatMessage) {
        return new ChatMessageDto(chatMessage.getId(), chatMessage.getBody(), chatMessage.getFromUser());
    }
}
