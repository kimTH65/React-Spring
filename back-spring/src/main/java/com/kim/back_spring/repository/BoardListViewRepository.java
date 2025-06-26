package com.kim.back_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kim.back_spring.entity.BoardEntity;

public interface BoardListViewRepository extends JpaRepository<BoardEntity, Integer> {
}