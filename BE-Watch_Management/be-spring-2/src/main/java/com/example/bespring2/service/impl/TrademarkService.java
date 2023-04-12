package com.example.bespring2.service.impl;

import com.example.bespring2.model.TrademarkT;
import com.example.bespring2.repository.ITrademarkRepository;
import com.example.bespring2.service.ITrademarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrademarkService implements ITrademarkService {

    @Autowired
    private ITrademarkRepository iTrademarkRepository;
    @Override
    public List<TrademarkT> getListTrademark() {
        return iTrademarkRepository.getListTrademark();
    }
}
