package com.example.bespring2.service;

import com.example.bespring2.dto.IOrderDetail;
import com.example.bespring2.dto.CartDto;
import com.example.bespring2.model.Cart;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartService {
    Cart getCartByIdUser(Integer idUser);

    List<IOrderDetail> getWatchInCart(Integer iUser);

    void payWatch(Integer idUser, String name,
                  String createDate, String email,
                  String phoneNumber, String address);

    void increaseQuantity(Long idOrderDetail);

    List<Cart> getCartCheck(Integer idUser);

    void deleteInCart(Integer idOrderDetail);

    List<IOrderDetail> getDetailHistory(Integer idCart);

    List<Cart> getHistory(Integer idUser);

    List<Cart> getHistoryAdmin();

}
