package edu.pnu.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import edu.pnu.domain.ImageLoad;
import edu.pnu.domain.Members;
import edu.pnu.domain.Todolist;
import edu.pnu.persistence.ImageLoadRepository;
import edu.pnu.persistence.MemberRepository;
import edu.pnu.persistence.TodoRepository;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class TodoService {
	
	@Autowired
	private TodoRepository tr;

	@Autowired
	private MemberRepository mr;
	
	@Autowired
	private ImageLoadRepository ir;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
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

	public ResponseEntity<String> successTodo(Todolist tl, Long id) {
		System.out.println(id);
		List<Todolist> ltd = (List<Todolist>) tr.findAll();
		for(Todolist td : ltd) {
			if(td.getId()==id) {
				if(td.getSuccess()==null) {
					td.setSuccess("success");
					tr.save(td);
					return ResponseEntity.ok().body("success");
				}
			}
		}
		return ResponseEntity.badRequest().body("Ntime");
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
		String numn = String.valueOf(sb);
		System.out.println(numn);
		String key1 = "key1";
		for(Members ms : lmb) {
			if(ms.getMemail().equals(memail)) {
				
				map.put(key1, numn);
				sendMail(ms.getMemail(), "인증번호 발송", "인증번호는 : " + numn);
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
}

