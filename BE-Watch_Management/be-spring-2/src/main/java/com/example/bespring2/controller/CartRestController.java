package com.example.bespring2.controller;

import com.example.bespring2.dto.CartDto;
import com.example.bespring2.dto.IOrderDetail;
import com.example.bespring2.model.Cart;
import com.example.bespring2.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/cart")
public class CartRestController {
    @Autowired
    private ICartService cartService;

    @PutMapping("/pay-watch")
    public ResponseEntity<?> payWatch(@RequestBody CartDto cartDto) {
        if (cartDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        cartService.payWatch(cartDto.getIdUser(), cartDto.getName(),
                cartDto.getCreateDate(), cartDto.getEmail(),
                cartDto.getPhoneNumber(), cartDto.getAddress());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/test/{idUser}")
    public ResponseEntity<?> getCart(@PathVariable("idUser") Integer idUser) {
        List<Cart> cartList = cartService.getCartCheck(idUser);
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{idOrderDetail}")
    public ResponseEntity<?> deleteInCart(@PathVariable("idOrderDetail") Integer idOrderDetail) {
        if (idOrderDetail != null) {
            cartService.deleteInCart(idOrderDetail);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/get-detail-history/{idCart}")
    public ResponseEntity<?> getDetailHistory(@PathVariable("idCart") Integer idCart) {
        List<IOrderDetail> iOrderDetailList = cartService.getDetailHistory(idCart);
        return new ResponseEntity<>(iOrderDetailList, HttpStatus.OK);
    }

    @GetMapping("/history/{idUser}")
    public ResponseEntity<?> getHistory(@PathVariable("idUser") Integer idUser) {
        List<Cart> cartList = cartService.getHistory(idUser);
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }


    @GetMapping("/history-admin")
    public ResponseEntity<?> getHistoryAdmin() {
        List<Cart> cartList = cartService.getHistoryAdmin();
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }
}
