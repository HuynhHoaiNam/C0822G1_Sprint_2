package com.example.bespring2.service.impl;

import com.example.bespring2.model.WatchType;
import com.example.bespring2.repository.IWatchTypeRepository;
import com.example.bespring2.service.IWatchTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchTypeService implements IWatchTypeService {
    @Autowired
    private IWatchTypeRepository iWatchTypeRepository;

    @Override
    public List<WatchType> getListWatchType() {
        return iWatchTypeRepository.getListWatchType();
    }
}
