package com.todolist.server.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.todolist.server.domain.Todolist;

public interface TodolistRepository extends CrudRepository<Todolist, Long> {
	List<Todolist> findByMid(String mid);
}
