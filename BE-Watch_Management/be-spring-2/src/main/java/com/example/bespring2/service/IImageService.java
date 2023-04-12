package com.example.bespring2.service;


import com.example.bespring2.model.Image;

import java.util.List;

public interface IImageService {

    List<Image> getListImage(Long id);
}
