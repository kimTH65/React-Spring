package com.kim.back_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kim.back_spring.entity.SearchLogEntity;

public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {

}