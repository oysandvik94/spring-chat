package com.langeoys.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * NextMovieController
 */
@RestController
public class ChatController {

    @GetMapping("test")
    public String sendMessage() {
        return "hei";
    }

}
