package com.todolist.server.service;

import java.net.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;


public class SendAlarmMessage {
	public void sendMessageWithWebClient(String accessToken, String message) {
	    WebClient webClient = WebClient.create();

	    String response = webClient.post()
	            .uri("https://kapi.kakao.com/v2/api/talk/memo/default/send")
	            .header("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	            .header("Authorization", "Bearer " + accessToken)
	            .body(BodyInserters.fromFormData("template_object", message))
	            .retrieve()
	            .bodyToMono(String.class)
	            .block();

	    // Handle response
	    if (response != null) {
	        System.out.println("Message sent successfully: " + response);
	    } else {
	        System.out.println("Failed to send message");
	    }
	}
}
