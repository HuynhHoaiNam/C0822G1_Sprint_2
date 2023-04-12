package com.example.bespring2.repository;

import com.example.bespring2.model.WatchType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IWatchTypeRepository extends JpaRepository<WatchType, Long> {
    @Query(value = "select * from watch_type", nativeQuery = true)
    List<WatchType> getListWatchType();
}
