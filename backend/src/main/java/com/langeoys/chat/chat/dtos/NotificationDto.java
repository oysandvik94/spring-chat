package com.langeoys.chat.chat.dtos;

import com.langeoys.chat.chat.Notification;

/** NotificationDto */
public record NotificationDto(long id, String roomName) {
    public static NotificationDto fromEntity(Notification notification) {
        return new NotificationDto(notification.getId(), notification.getRoomName());
    }
}
