//package com.todolist.server.domain;
//
//import jakarta.servlet.DispatcherType;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableMethodSecurity
//public class SpringSecurityConfig {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.
//            csrf(csrf -> csrf.disable()).
//            cors(withDefaults())  // <- 이 부분을 변경하였습니다.
//            .authorizeHttpRequests(request -> request
//                .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
//                .requestMatchers("api/insertMembers").permitAll()
//                .anyRequest().authenticated()
//            )
//            .formLogin(login -> login
//                .loginPage("/")
//                .loginProcessingUrl("/api/login")
//                .usernameParameter("mid")
//                .passwordParameter("password")
//                .defaultSuccessUrl("/p", true)
//                .permitAll()
//            )
//            .logout(withDefaults());
//
//        return http.build();
//    }
//}