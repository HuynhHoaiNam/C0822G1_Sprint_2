package com.example.bespring2.service.impl;

import com.example.bespring2.model.Image;
import com.example.bespring2.repository.IImageRepository;
import com.example.bespring2.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IImageService {

    @Autowired
    private IImageRepository iImageRepository;

    @Override
    public List<Image> getListImage(Long id) {
        return iImageRepository.getListImage(id);
    }
}
