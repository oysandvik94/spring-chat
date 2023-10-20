package com.langeoys.chat.chat.dtos;

import com.langeoys.chat.chat.ChatRoom;

import java.util.List;
import java.util.stream.Collectors;

/** ChatRoomDto */
public record ChatRoomDto(long id, String name, List<ChatMessageDto> chatMessages) {
    public static ChatRoomDto fromEntity(ChatRoom chatRoom) {
        return new ChatRoomDto(
                chatRoom.getId(),
                chatRoom.getName(),
                chatRoom.getChatMessages().stream()
                        .map(ChatMessageDto::fromEntity)
                        .collect(Collectors.toUnmodifiableList()));
    }
}
