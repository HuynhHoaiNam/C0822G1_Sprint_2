package com.example.bespring2.repository;


import com.example.bespring2.model.TrademarkT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITrademarkRepository extends JpaRepository<TrademarkT, Long> {

    @Query(value = "select * from trademarkt", nativeQuery = true)
    List<TrademarkT> getListTrademark();
}
