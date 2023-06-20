package com.todolist.server.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Sort;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.todolist.server.domain.ImageLoad;
import com.todolist.server.domain.Members;
import com.todolist.server.domain.Todolist;
import com.todolist.server.persistence.ImageLoadRepository;
import com.todolist.server.persistence.MemberRepository;
import com.todolist.server.persistence.TodolistRepository;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;

@Service
public class TodoService {
	
	@Autowired
	private TodolistRepository tr;

	@Autowired
	private MemberRepository mr;
	
	@Autowired
	private ImageLoadRepository ir;
	

	@Autowired
	private JavaMailSender javaMailSender;
	
	private static final Logger logger = LoggerFactory.getLogger(TodoService.class);
	
	public List<Todolist> gettodo() {

		return (List<Todolist>) tr.findAll();
	}

	public ResponseEntity<String> insertTodo(List<Todolist> todoList) {
		for(int i=0; i<todoList.size(); i++) {
			tr.save(todoList.get(i));
		}
		return ResponseEntity.ok().body("success");
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

	public ResponseEntity<String> insertMembers(Members mb, String mid, List<Members> memberList) {
		System.out.println(mb.getMid());
		List<Members> lmb = (List<Members>) mr.findAll();
		System.out.println(lmb.size());
		boolean alreadyExist = false;
		for(Members ms : lmb) {
			if(ms.getMid().equals(mb.getMid())) {
				alreadyExist = true;
			    return ResponseEntity.badRequest().body("등록 실패");
			}
		}
		if(!alreadyExist) {
			mr.save(mb);
		}
		return ResponseEntity.ok().body("등록 성공");	    			
	}

	public ResponseEntity<Map<String, String>> getMembers(Members mb, String id, String password) {
		System.out.println(id + password);
		Map<String, String> map = new HashMap<>();
	    List<Members> lcs = (List<Members>) mr.findAll();
	    for(Members ms : lcs) {
	    	System.out.println(ms.getMid());
	    	if(ms.getMid().equals(id)) {
	    		if(ms.getPassword().equals(password)) {
	    			map.put("key1", "로그인 성공");
	    			map.put("key2", ms.getMid());
		    		return ResponseEntity.ok().body(map);	    			
	    		}
	    	}
	    }
	    map.put("key1", "로그인 실패");
	    return ResponseEntity.badRequest().body(map);

	}

	public ResponseEntity<String> successTodo(Todolist tl, Long id, String success) {
		System.out.println(id);
		List<Todolist> ltd = (List<Todolist>) tr.findAll();
		for(Todolist td : ltd) {
			if(td.getId()==id) {
				System.out.println(td.getSuccess());
				if(td.getSuccess()==null) {
					td.setSuccess("success");
					tr.save(td);
					return ResponseEntity.ok().body("success");
				}
			}
		}
		System.out.println("중복");
		return ResponseEntity.ok().body("Ntime");
	}
    public void sendMail(String to, String subject, String text) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(text);

        javaMailSender.send(mailMessage);
    }

	public ResponseEntity<String> findlogin(Members mb) {
		String memail = mb.getMemail();
		List<Members> lmb = (List<Members>) mr.findAll();
		for(Members ms : lmb) {
			if(ms.getMemail().equals(memail)) {
				sendMail(ms.getMemail(), "Todolist ID, PASSWORD 확인", "Your ID : " + ms.getMid() + " / Password : " + ms.getPassword());
				System.out.println(ms.getPassword());
				return ResponseEntity.ok().body("mailsuccess");
			}
		}

		return ResponseEntity.badRequest().body("no");
	}
	//인증번호 발송
	public ResponseEntity<Map<String,String>> authenInfo(Members mb) {
		String memail = mb.getMemail();
		List<Members> lmb = (List<Members>) mr.findAll();
		Map<String, String> map = new HashMap<>();
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for(int i=0; i<6; i++) {
			int randomn = random.nextInt(9)+1;
			sb.append(String.valueOf(randomn));
		}
		String authenNum = String.valueOf(sb);
		System.out.println(authenNum);
		String key1 = "key1";
		for(Members ms : lmb) {
			if(ms.getMemail().equals(memail)) {
				
				map.put(key1, authenNum);
				sendMail(ms.getMemail(), "인증번호 발송", "인증번호는 : " + authenNum);
				return ResponseEntity.ok().body(map);
			}
		}
		return null;
	}

	public ResponseEntity<String> updateInfo(Members mb) {
		String newid = mb.getMid();
		String memail = mb.getMemail();


//		List<Members> lmb = (List<Members>) mr.findAll();
		List<Members> lms = mr.findByMemail(mb.getMemail());
		System.out.println("lms"+lms);
		for(Members ms : lms) {
			System.out.println(ms.getMemail());
			if(!ms.getMid().equals(newid)) {
				System.out.println(ms.getMid());
				ms.setMid(newid);
				ms.setPassword(mb.getPassword());
				mr.save(ms);
				return ResponseEntity.ok().body("수정 성공");
			}
		}
		return ResponseEntity.badRequest().body("duplicate");	

		
	}
	public String insertimage(MultipartFile file, String cdate, String mid, int num) throws IOException{
		System.out.println("service");
		String folder = "D:/김형찬/upload/";
		byte[] bytes = file.getBytes();
		Path path = Paths.get(folder + file.getOriginalFilename());
		Files.write(path, bytes);
		
		ImageLoad image = new ImageLoad();
		image.setPath(path.toString());
		image.setCdate(cdate);
		image.setMid(mid);
		image.setNum(num);
		ir.save(image);
		return "success";
	}

	public ResponseEntity<Resource> getimage(String mid, String cdate, int num) throws MalformedURLException {
		System.out.println("service");

        ImageLoad image = ir.findByMidAndCdateAndNum(mid, cdate, num).get(0);       
    	System.out.println(image);
        Path path = Paths.get(image.getPath());
        Resource resource = new UrlResource(path.toUri());
        System.out.println(resource);
   
	    return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/png"))  // 적절한 MIME 타입으로 변경하세요
                .body(resource);
        
    }

	public List<Todolist> getanalysis(Todolist td) {
		List<Integer> it = new ArrayList<>();
		List<Todolist> tdl = tr.findByMid(td.getMid());
		System.out.println(tdl);
		// yyyy-mm-dd 타입의 string간 비교를 통한 오름차순
		tdl.sort(Comparator.comparing(t -> LocalDate.parse(t.getCdate())));
		// 현재는 date() 타입의 날짜와 시간이 저장되어 있어 시간순으로도 정렬하려면 아래와 같이 정렬할 수 있음
		// Date를 LocalDateTime으로 변환하고 이를 기준으로 오름차순 정렬
	    //tdl.sort(Comparator.comparing(t -> t.getCdate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()));
		return tdl;
	}
	@Scheduled(fixedRate = 600000)
	public void sortByDate() {
		// 10분마다 db 안의 데이터를 정렬하고 저장하려고 했으나, 이보다 데이터를 호출할 떄 정렬하는 게 나아 10분마다 db 사이즈를 콘솔에 남기는 test용
		List<Todolist> makeSort = tr.findAll(Sort.by(Sort.Direction.ASC, "cdate"));
		logger.info("sort by date : " + makeSort.size());
	}

}
