package com.example.bespring2.controller;

import com.example.bespring2.model.TrademarkT;
import com.example.bespring2.service.ITrademarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@CrossOrigin("*")
@RequestMapping("api/trademark")
public class TrademarkRepository {

    @Autowired
    private ITrademarkService trademarkService;

    @GetMapping("/list")
    public ResponseEntity<List<TrademarkT>> getListWatch() {
        List<TrademarkT> trademarkList = trademarkService.getListTrademark();
        if (trademarkList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(trademarkList, HttpStatus.OK);
    }
}
