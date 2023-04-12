package com.example.bespring2.service;

import com.example.bespring2.dto.IWatch;
import com.example.bespring2.dto.WatchDto;
import com.example.bespring2.model.Watch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface IWatchService {
    Page<IWatch> getListWatch(Pageable pageable, int trademarkId, int priceFirst, int priceSecond);

    Watch getWatch(Long idInput);

    void addCart(Integer idUser, Long idWatch, Integer quantity);

    void addOrderDetail(Long idCart, Long idWatch, Integer quantity,Integer idUser);

    void changeQuantity(Integer idUser, Long valueChange, Long idWatch);

    Page<IWatch> getListWatchByName(Pageable pageable, String nameWatch);

    Page<Watch> getListWatchManagement(Pageable pageable);

    void save(Long id, String color, String face, String name,
              String note, String origin, double price, int quantity,
              String strapType, Long trademarkId, Long watchType);
}
