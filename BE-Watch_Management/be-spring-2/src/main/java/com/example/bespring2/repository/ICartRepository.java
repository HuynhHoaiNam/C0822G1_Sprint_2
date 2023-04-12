package com.example.bespring2.repository;

import com.example.bespring2.dto.IOrderDetail;
import com.example.bespring2.dto.IUser;
import com.example.bespring2.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ICartRepository extends JpaRepository<Cart, Long> {
    @Query(value = "select * from `cart` where user_id = :idUser order by id desc limit 1", nativeQuery = true)
    Cart getCartByIdUser(@Param("idUser") Integer idUser);

    @Query(value = "select od.id                 as idOrder,\n" +
            "       od.watch_id           as idWatch,\n" +
            "       w.name                as watchName,\n" +
            "       w.price               as price,\n" +
            "       od.quantity           as quantity,\n" +
            "       i.url                 as url,\n" +
            "       c.create_date         as createDate,\n" +
            "       w.price * od.quantity as money\n" +
            "from user\n" +
            "         join cart c on user.id = c.user_id\n" +
            "         join order_detail od on c.id = od.cart_id\n" +
            "         join watch w on od.watch_id = w.id\n" +
            "         join image i on w.id = i.watch_id\n" +
            "where user.id = :idUser\n" +
            "  and c.flag = true\n" +
            "group by od.id", nativeQuery = true)
    List<IOrderDetail> getWatchInCart(@Param("idUser") Integer idUser);

    @Query(value = "select od.id                 as idOrder,\n" +
            "       od.watch_id           as idWatch,\n" +
            "       w.name                as watchName,\n" +
            "       w.price               as price,\n" +
            "       od.quantity           as quantity,\n" +
            "       i.url                 as url,\n" +
            "       c.create_date         as createDate,\n" +
            "       w.price * od.quantity as money\n" +
            "from user\n" +
            "         join cart c on user.id = c.user_id\n" +
            "         join order_detail od on c.id = od.cart_id\n" +
            "         join watch w on od.watch_id = w.id\n" +
            "         join image i on w.id = i.watch_id\n" +
            "where user.id = :idUser\n" +
            "  and c.flag = false\n" +
            "group by od.id", nativeQuery = true)
    List<IOrderDetail> getCartHistory(@Param("idUser") Integer idUser);


    @Modifying
    @Query(value = "update cart\n" +
            "set name        = :name,\n" +
            "    address=:address,\n" +
            "    create_date=:createDate,\n" +
            "    phone_number=:phoneNumber,\n" +
            "    email=:email,\n" +
            "    flag= false\n" +
            "where flag = true\n" +
            "  and user_id = :idUser", nativeQuery = true)
    void payWatch(@Param("idUser") Integer idUser, @Param("name") String name,
                  @Param("createDate") String createDate, @Param("email") String email,
                  @Param("phoneNumber") String phoneNumber, @Param("address") String address);

    @Modifying
    @Query(value = "update order_detail\n" +
            "set quantity=quantity + 1\n" +
            "where order_detail.id = :idOrderDetail", nativeQuery = true)
    void increaseQuantity(@Param("idOrderDetail") Long idOrderDetail);

    @Modifying
    @Query(value = "update order_detail\n" +
            "set quantity=quantity + :quantity\n" +
            "where order_detail.id = :idOrderDetail", nativeQuery = true)
    void increaseQuantityInput(@Param("idOrderDetail") Long idOrderDetail, @Param("quantity") Integer quantity);


    @Modifying
    @Query(value = "update order_detail\n" +
            "set quantity=quantity - 1\n" +
            "where order_detail.id = :idOrderDetail", nativeQuery = true)
    void reduceQuantity(@Param("idOrderDetail") Long idOrderDetail);

    @Modifying
    @Query(value = "delete\n" +
            "from order_detail\n" +
            "where order_detail.id = :idOrderDetail", nativeQuery = true)
    void deleteWatchByIdOrder(@Param("idOrderDetail") Integer idOrderDetail);


    @Query(value = "select *\n" +
            "from cart\n" +
            "where user_id = :idUser\n" +
            "  and flag = true", nativeQuery = true)
    List<Cart> getListCartCheck(@Param("idUser") Integer idUser);

    @Query(value = "select od.id                 as idOrder,\n" +
            "       od.watch_id           as idWatch,\n" +
            "       w.name                as watchName,\n" +
            "       w.price               as price,\n" +
            "       od.quantity           as quantity,\n" +
            "       i.url                 as url,\n" +
            "       c.create_date         as createDate,\n" +
            "       w.price * od.quantity as money\n" +
            "from user\n" +
            "         join cart c\n" +
            "              on user.id = c.user_id\n" +
            "         join order_detail od on c.id = od.cart_id\n" +
            "         join watch w on od.watch_id = w.id\n" +
            "         join image i on w.id = i.watch_id\n" +
            "where od.cart_id = :idCart\n" +
            "  and c.flag = false\n" +
            "group by od.id", nativeQuery = true)
    List<IOrderDetail> getDetailHistory(@Param("idCart") Integer idCart);

    @Query(value = "select *\n" +
            "from cart\n" +
            "where user_id = :idUser\n" +
            "  and flag = false ", nativeQuery = true)
    List<Cart> getHistory(@Param("idUser") Integer idUser);


    @Query(value = "select *\n" +
            "    from cart\n" +
            "    where flag = false", nativeQuery = true)
    List<Cart> getHistoryAdmin();


    @Modifying
    @Query(value = "update watch\n" +
            "set quantity = quantity - :quantityInCart\n" +
            "where id = :idWatch", nativeQuery = true)
    void updateQuantityByPayment(@Param("quantityInCart") int quantityInCart, @Param("idWatch") Long idWatch);

}
