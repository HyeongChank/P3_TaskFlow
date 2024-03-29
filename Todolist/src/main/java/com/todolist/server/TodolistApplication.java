package com.todolist.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class TodolistApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodolistApplication.class, args);
	}

}
// 서버마다 다른 앱비밀번호 설정해야 함//
//mailsender 오류 시 google 계정 앱비밀번호 새로 생성하여 properties 수정//
