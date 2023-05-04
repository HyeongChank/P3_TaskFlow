package edu.pnu.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Members;
import edu.pnu.domain.Todolist;
import edu.pnu.persistence.MemberRepository;
import edu.pnu.persistence.TodoRepository;

@Service
public class TodoService {
	
	@Autowired
	private TodoRepository tr;

	@Autowired
	private MemberRepository mr;
	
	public List<Todolist> gettodo() {

		return (List<Todolist>) tr.findAll();
	}

	public List<Todolist> insertTodo(List<Todolist> todoList) {
		for(int i=0; i<todoList.size(); i++) {
			tr.save(todoList.get(i));
		}
		return todoList;
	}

	public List<Todolist> deleteTodo(List<Todolist> todoList) {
		System.out.println("delete connect==========");
		for(Todolist td: todoList) {
			System.out.println(td);
			System.out.println(td.getId());
			tr.deleteById(td.getId());
		}
		return todoList;
	}

	public List<Todolist> updateTodo(List<Todolist> todoList) {
		for(Todolist td: todoList) {
			Optional<Todolist> optd = tr.findById(td.getId());
			if(optd.isPresent()) {
				Todolist findtd = optd.get();
				findtd.setTodo(td.getTodo());
				findtd.setContent(td.getContent());
				tr.save(findtd);
				
			}

		}
		return todoList;
	}

	public List<Members> insertMembers(List<Members> memberList) {
		for(int i=0; i<memberList.size();i++) {
			Long seq = memberList.get(i).getSeq();
			String rid = memberList.get(i).getMid();
			if(mr.findById(seq).isEmpty()) {
				if(mr.findBymid(rid) != null) {
					mr.save(memberList.get(i));					
				}
				
			}

		}
		return memberList;
	}

	public ResponseEntity<String> getMembers(Members mb, String id, String password) {
		System.out.println(id + password);
	    List<Members> lcs = (List<Members>) mr.findAll();
	    for(Members ms : lcs) {
	    	System.out.println(ms.getMid());
	    	if(ms.getMid().equals(id)) {
	    		if(ms.getPassword().equals(password)) {
		    		return ResponseEntity.ok().body("로그인 성공");	    			
	    		}
	    	}
	    }
	    return ResponseEntity.badRequest().body("로그인 실패");

	}
}
