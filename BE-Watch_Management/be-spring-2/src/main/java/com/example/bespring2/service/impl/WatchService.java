package com.example.bespring2.service.impl;

import com.example.bespring2.dto.IOrderDetail;
import com.example.bespring2.dto.IWatch;
import com.example.bespring2.model.Cart;
import com.example.bespring2.model.Watch;
import com.example.bespring2.repository.ICartRepository;
import com.example.bespring2.repository.IWatchRepository;
import com.example.bespring2.service.IWatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchService implements IWatchService {
    @Autowired
    private IWatchRepository watchRepository;

    @Autowired
    private ICartRepository iCartRepository;

    @Override
    public Page<IWatch> getListWatch(Pageable pageable, int trademarkId, int priceFirst, int priceSecond) {
        if (trademarkId == -1 && priceFirst == -1) {
            return watchRepository.getListWatch(pageable);
        } else if (priceFirst == -1) {
            return watchRepository.getListWatchIdTrademark(pageable, trademarkId);
        } else if (trademarkId == -1) {
            return watchRepository.getListWatchPrice(pageable, priceFirst, priceSecond);
        }
        return watchRepository.getListWatchIdTrademarkPrice(pageable, priceFirst, priceSecond, trademarkId);
    }

    @Override
    public Watch getWatch(Long idInput) {
        return watchRepository.getWatch(idInput);
    }

    @Override
    public void addCart(Integer idUser, Long idWatch, Integer quantity) {
        List<IOrderDetail> orderDetailList = iCartRepository.getWatchInCart(idUser);
        for (int i = 0; i < orderDetailList.size(); i++) {
            if (orderDetailList.get(i).getIdWatch() == idWatch) {
                iCartRepository.increaseQuantity(orderDetailList.get(i).getIdOrder());
                return;
            }
        }
        watchRepository.addCart(idUser);
        Cart cart = iCartRepository.getCartByIdUser(idUser);
        watchRepository.addOrderDetail(cart.getId(), idWatch, quantity);
    }

    @Override
    public void addOrderDetail(Long idCart, Long idWatch, Integer quantity, Integer idUser) {
        List<IOrderDetail> orderDetailList = iCartRepository.getWatchInCart(idUser);
        for (IOrderDetail orderDetail : orderDetailList) {
            if (orderDetail.getIdWatch() == idWatch) {
                iCartRepository.increaseQuantityInput(orderDetail.getIdOrder(), quantity);
                return;
            }
        }
        watchRepository.addOrderDetail(idCart, idWatch, quantity);
    }

    @Override
    public void changeQuantity(Integer idUser, Long valueChange, Long idWatch) {
        List<IOrderDetail> orderDetails = iCartRepository.getWatchInCart(idUser);
        for (int i = 0; i < orderDetails.size(); i++) {
            if (orderDetails.get(i).getIdWatch() == idWatch && orderDetails.get(i).getQuantity() < 2 && valueChange == 0) {
//                iCartRepository.deleteWatchByIdOrder(orderDetails.get(i).getIdOrder());
                return;
            } else if (orderDetails.get(i).getIdWatch() == idWatch && valueChange == 1) {
                iCartRepository.increaseQuantity(orderDetails.get(i).getIdOrder());
                return;
            } else if (orderDetails.get(i).getIdWatch() == idWatch && valueChange == 0 && orderDetails.get(i).getQuantity() > 1) {
                iCartRepository.reduceQuantity(orderDetails.get(i).getIdOrder());
                return;
            }
        }
    }

    @Override
    public Page<IWatch> getListWatchByName(Pageable pageable, String nameWatch) {
        return watchRepository.getListWatchNameWatch(pageable, nameWatch);
    }

    @Override
    public Page<Watch> getListWatchManagement(Pageable pageable) {
        return watchRepository.getListWatchManagement(pageable);
    }

    @Override
    public void save(Long id, String color, String face, String name,
                     String note, String origin, double price, int quantity,
                     String strapType, Long trademarkId, Long watchType) {
        watchRepository.updateWatch(id, color, face, name, note, origin, price, quantity, strapType, trademarkId, watchType);
    }


}
