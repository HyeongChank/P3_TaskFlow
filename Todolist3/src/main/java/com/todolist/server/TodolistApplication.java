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
// spring security 를 통한 패스워드 암호화 구현 ㅇ / db에 암호화되어 저장되고 ui에서 raw패스워드로 로그인해도 암호화된 패스워드와 매칭됨
// mailsender 프로젝트당 하나씩 구글 2차 패스워드 받아서 사용해야 함
// mailsender 오류날 시 pom에서 mailsender 지웠다 다시 작성
