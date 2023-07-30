package com.todolist.server.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.todolist.server.domain.Members;

public interface MemberRepository extends CrudRepository<Members, Long> {
	Members findByMid(String mid);
	List<Members> findByMemail(String memail);
}
