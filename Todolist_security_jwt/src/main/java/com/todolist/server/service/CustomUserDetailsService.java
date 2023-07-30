package com.todolist.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.todolist.server.domain.Members;
import com.todolist.server.persistence.MemberRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Members member = memberRepository.findByMid(username);
        if (member == null) {
            throw new UsernameNotFoundException("Could not find user");
        }
        
        return member; // Members 인스턴스를 직접 반환
    }
}