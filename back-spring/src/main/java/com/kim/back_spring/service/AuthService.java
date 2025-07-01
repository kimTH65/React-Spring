package com.kim.back_spring.service;

import org.springframework.http.ResponseEntity;

import com.kim.back_spring.dto.request.auth.SignUpRequestDto;
import com.kim.back_spring.dto.response.auth.SignUpResponseDto;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
