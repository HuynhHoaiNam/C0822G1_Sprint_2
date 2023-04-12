package com.example.bespring2.repository;

import com.example.bespring2.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IImageRepository extends JpaRepository<Image, Long> {
    @Query(value = "select * from image where watch_id = :id", nativeQuery = true)
    List<Image> getListImage(@Param("id")Long id);
}
