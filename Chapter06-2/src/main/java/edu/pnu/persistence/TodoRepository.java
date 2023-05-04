package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import edu.pnu.domain.Todolist;

public interface TodoRepository extends CrudRepository<Todolist, Long> {
	
	

}
