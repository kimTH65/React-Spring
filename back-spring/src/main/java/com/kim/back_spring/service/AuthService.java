package com.kim.back_spring.service;

import org.springframework.http.ResponseEntity;

import com.kim.back_spring.dto.request.auth.SignInRequestDto;
import com.kim.back_spring.dto.request.auth.SignUpRequestDto;
import com.kim.back_spring.dto.response.auth.SignUpResponseDto;
import com.kim.back_spring.dto.response.auth.SignInResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
