package com.langeoys.chat.chat.dtos;

import com.langeoys.chat.chat.ChatUser;

public record ChatUserDto(long id, String username) {
    public static ChatUserDto fromEntity(ChatUser chatUser) {
        return new ChatUserDto(chatUser.getId(), chatUser.getUsername());
    }
}
