package com.example.bespring2.controller;


import com.example.bespring2.dto.IOrderDetail;
import com.example.bespring2.dto.IWatch;
import com.example.bespring2.dto.CartDto;
import com.example.bespring2.dto.WatchDto;
import com.example.bespring2.model.Cart;
import com.example.bespring2.model.Image;
import com.example.bespring2.model.Watch;
import com.example.bespring2.model.WatchType;
import com.example.bespring2.service.ICartService;
import com.example.bespring2.service.IImageService;
import com.example.bespring2.service.IWatchService;
import com.example.bespring2.service.IWatchTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/watch")
public class WatchRestController {
    @Autowired
    private IWatchService watchService;
    @Autowired
    private IImageService iImageService;
    @Autowired
    private IWatchTypeService iWatchTypeService;
    @Autowired
    private ICartService cartService;


    @GetMapping("/list/{trademarkId}/{priceFirst}/{priceSecond}")
    public ResponseEntity<Page<IWatch>> getListWatch(@PageableDefault(page = 0, size = 4) Pageable pageable,
                                                     @PathVariable("trademarkId") int trademarkId,
                                                     @PathVariable("priceFirst") int priceFirst,
                                                     @PathVariable("priceSecond") int priceSecond) {
        Page<IWatch> listWatch = watchService.getListWatch(pageable, trademarkId, priceFirst, priceSecond);

        return new ResponseEntity<>(listWatch, HttpStatus.OK);
    }

    @GetMapping("/listByName")
    public ResponseEntity<Page<IWatch>> getListWatchByName(@PageableDefault(page = 0, size = 4) Pageable pageable, @RequestParam(value = "nameWatch", defaultValue = "") String nameWatch) {
        Page<IWatch> watchPage = watchService.getListWatchByName(pageable, nameWatch);
        return new ResponseEntity<>(watchPage, HttpStatus.OK);
    }

    @GetMapping("/watch-ob/{idInput}")
    public ResponseEntity<Watch> getWatch(@PathVariable("idInput") Long idInput) {
        Watch watch = watchService.getWatch(idInput);
        return new ResponseEntity<>(watch, HttpStatus.OK);
    }


    @GetMapping("/list-image/{id}")
    public ResponseEntity<List<Image>> getListImage(@PathVariable("id") Long id) {
        List<Image> imageList = iImageService.getListImage(id);

        return new ResponseEntity<>(imageList, HttpStatus.OK);
    }


    @GetMapping("/watch-type")
    public ResponseEntity<List<WatchType>> getListWatchType() {
        List<WatchType> watchTypeList = iWatchTypeService.getListWatchType();
        return new ResponseEntity<>(watchTypeList, HttpStatus.OK);
    }

    @GetMapping("/addOderDetail/{idWatch}/{idUser}/{quantity}")
    public ResponseEntity<?> addCart(@PathVariable("idWatch") Long idWatch, @PathVariable("idUser") Integer idUser,
                                     @PathVariable("quantity") Integer quantity) {
        if (idUser != null && idWatch != null) {
            Watch watch = watchService.getWatch(idWatch);
            if (watch.getQuantity() < quantity) {
                return new ResponseEntity<>("too much", HttpStatus.OK);
            }
            List<Cart> cartList = cartService.getCartCheck(idUser);
            for (Cart cart : cartList) {
                if (cart.getUser().getId() == idUser && cart.isFlag()) {
                    watchService.addOrderDetail(cart.getId(), idWatch, quantity, idUser);
                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
            watchService.addCart(idUser, idWatch, quantity);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get-cart/{idUser}")
    public ResponseEntity<Cart> getCart(@PathVariable("idUser") Integer idUser) {
        Cart cart = cartService.getCartByIdUser(idUser);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/get-watch-in-cart/{idUser}")
    public ResponseEntity<List<IOrderDetail>> getWatchInCart(@PathVariable("idUser") Integer idUser) {
        List<IOrderDetail> orderDetailList = cartService.getWatchInCart(idUser);
        return new ResponseEntity<>(orderDetailList, HttpStatus.OK);
    }


    @GetMapping("/change-quantity/{idUser}/{valueChange}/{idWatch}")
    public ResponseEntity<?> changeQuantity(@PathVariable("idUser") Integer idUser,
                                            @PathVariable("valueChange") Long valueChange,
                                            @PathVariable("idWatch") Long idWatch) {
        watchService.changeQuantity(idUser, valueChange, idWatch);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-watch-management")
    public ResponseEntity<Page<Watch>> getWatchInCart(@PageableDefault(value = 5) Pageable pageable) {
        Page<Watch> watchDtoPage = watchService.getListWatchManagement(pageable);
        return new ResponseEntity<>(watchDtoPage, HttpStatus.OK);
    }

    @PutMapping("/update-watch")
    public ResponseEntity<?> updateWatch(@RequestBody Watch watch) {
        watchService.save(watch.getId(), watch.getColor(), watch.getFace(), watch.getName(),
                watch.getNote(), watch.getOrigin(), watch.getPrice(), watch.getQuantity(),
                watch.getStrapType(), watch.getTrademarkT().getId(), watch.getWatchType().getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
