package com.example.bespring2.service.impl;

import com.example.bespring2.dto.IOrderDetail;
import com.example.bespring2.dto.CartDto;
import com.example.bespring2.model.Cart;
import com.example.bespring2.repository.ICartRepository;
import com.example.bespring2.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CartService implements ICartService {

    @Autowired
    private ICartRepository iCartRepository;

    @Override
    public Cart getCartByIdUser(Integer idUser) {
        return iCartRepository.getCartByIdUser(idUser);
    }

    @Override
    public List<IOrderDetail> getWatchInCart(Integer idUser) {
        return iCartRepository.getWatchInCart(idUser);
    }

    @Override
    public void payWatch(Integer idUser, String name,
                         String createDate, String email,
                         String phoneNumber, String address) {
        List<IOrderDetail> orderDetailList = iCartRepository.getWatchInCart(idUser);
        for (IOrderDetail orderDetail : orderDetailList) {
            iCartRepository.updateQuantityByPayment(orderDetail.getQuantity(), orderDetail.getIdWatch());
        }
        iCartRepository.payWatch(idUser, name, createDate, email, phoneNumber, address);
    }


    @Override
    public void increaseQuantity(Long idOrderDetail) {
//        List<IOrderDetail> orderDetailList= iCartRepository.getWatchInCart()
    }

    @Override
    public List<Cart> getCartCheck(Integer idUser) {
        return iCartRepository.getListCartCheck(idUser);
    }

    @Override
    public void deleteInCart(Integer idOrderDetail) {
        iCartRepository.deleteWatchByIdOrder(idOrderDetail);
    }

    @Override
    public List<IOrderDetail> getDetailHistory(Integer idCart) {
        return iCartRepository.getDetailHistory(idCart);
    }

    @Override
    public List<Cart> getHistory(Integer idUser) {
        return iCartRepository.getHistory(idUser);
    }

    @Override
    public List<Cart> getHistoryAdmin() {
        return iCartRepository.getHistoryAdmin();
    }
}
