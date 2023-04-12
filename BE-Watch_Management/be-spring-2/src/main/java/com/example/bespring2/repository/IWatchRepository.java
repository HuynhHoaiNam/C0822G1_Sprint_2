package com.example.bespring2.repository;

import com.example.bespring2.dto.IWatch;
import com.example.bespring2.dto.WatchDto;
import com.example.bespring2.model.Cart;
import com.example.bespring2.model.Watch;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IWatchRepository extends JpaRepository<Watch, Long> {


    @Query(value = "select watch.id         as id,\n" +
            "       watch.face       as face,\n" +
            "       watch.name       as name,\n" +
            "       watch.note       as note,\n" +
            "       watch.origin     as origin,\n" +
            "       watch.price      as price,\n" +
            "       watch.quantity   as quantity,\n" +
            "       watch.strap_type as strapType,\n" +
            "       i.url            as url,\n" +
            "       tr.name          as trademarkName,\n" +
            "       wt.name          as watchTypeName\n" +
            "from `watch`\n" +
            "         left join `image` i on watch.id = i.watch_id\n" +
            "         left join `trademarkt` tr on tr.id = `watch`.trademarkt_id\n" +
            "         left join `watch_type` wt on wt.id = `watch`.watch_type_id\n" +
            "group by `watch`.id\n" +
            "order by `watch`.id desc", nativeQuery = true)
    Page<IWatch> getListWatch(Pageable pageable);


    @Query(value = "select watch.id         as id,\n" +
            "       watch.face       as face,\n" +
            "       watch.name       as name,\n" +
            "       watch.note       as note,\n" +
            "       watch.origin     as origin,\n" +
            "       watch.price      as price,\n" +
            "       watch.quantity   as quantity,\n" +
            "       watch.strap_type as strapType,\n" +
            "       i.url            as url,\n" +
            "       tr.name          as trademarkName,\n" +
            "       wt.name          as watchTypeName\n" +
            "from `watch`\n" +
            "         left join `image` i on watch.id = i.watch_id\n" +
            "         left join `trademarkt` tr on tr.id = `watch`.trademarkt_id\n" +
            "         left join `watch_type` wt on wt.id = `watch`.watch_type_id\n" +
            "where watch.price between :priceFirst and :priceSecond\n" +
            "group by watch.id, watch.price\n" +
            "order by watch.price", nativeQuery = true)
    Page<IWatch> getListWatchPrice(Pageable pageable, @Param("priceFirst") int priceFirst, @Param("priceSecond") int priceSecond);


    @Query(value = "select watch.id         as id," +
            "       watch.face       as face," +
            "       watch.name       as name," +
            "       watch.note       as note," +
            "       watch.origin     as origin," +
            "       watch.price      as price," +
            "       watch.quantity   as quantity," +
            "       watch.strap_type as strapType," +
            "       i.url            as url," +
            "       tr.name          as trademarkName," +
            "       wt.name          as watchTypeName" +
            " from `watch` " +
            "         left join `image` i on watch.id = i.watch_id " +
            "         left join `trademarkt` tr on tr.id = `watch`.trademarkt_id " +
            "         left join `watch_type` wt on wt.id = `watch`.watch_type_id " +
            "where `watch`.trademarkt_id = :trademarkId " +
            "group by watch.id", nativeQuery = true)
    Page<IWatch> getListWatchIdTrademark(Pageable pageable, @Param("trademarkId") int trademarkId);

    @Query(value = "select watch.id         as id," +
            "       watch.face       as face," +
            "       watch.name       as name," +
            "       watch.note       as note," +
            "       watch.origin     as origin," +
            "       watch.price      as price," +
            "       watch.quantity   as quantity," +
            "       watch.strap_type as strapType," +
            "       i.url            as url," +
            "       tr.name          as trademarkName," +
            "       wt.name          as watchTypeName" +
            " from `watch` " +
            "         left join `image` i on watch.id = i.watch_id " +
            "         left join `trademarkt` tr on tr.id = `watch`.trademarkt_id " +
            "         left join `watch_type` wt on wt.id = `watch`.watch_type_id " +
            "where `watch`.price between :priceFirst and :priceSecond " +
            "  and `watch`.trademarkt_id = :trademarkId " +
            "group by `watch`.id", nativeQuery = true)
    Page<IWatch> getListWatchIdTrademarkPrice(Pageable pageable, @Param("priceFirst") int priceFirst, @Param("priceSecond") int priceSecond, @Param("trademarkId") int trademarkId);


    @Query(value = "select * from `watch` where id=:idInput", nativeQuery = true)
    Watch getWatch(@Param("idInput") Long idInput);

    @Modifying
    @Query(value = "INSERT INTO `watch-management`.`cart` (`user_id`,flag) VALUES (:idUser,true)", nativeQuery = true)
    void addCart(@Param("idUser") Integer idUser);

    @Modifying
    @Query(value = "INSERT INTO `watch-management`.`order_detail` (`cart_id`, `watch_id`,flag,quantity) VALUES (:idCart, :idWatch,true,:quantity)", nativeQuery = true)
    void addOrderDetail(@Param("idCart") Long idCart, @Param("idWatch") Long idWatch, @Param("quantity") Integer quantity);

    @Query(value = "select `watch`.id         as id,\n" +
            "       `watch`.face       as face,\n" +
            "       `watch`.name       as name,\n" +
            "       `watch`.note       as note,\n" +
            "       `watch`.origin     as origin,\n" +
            "       `watch`.price      as price,\n" +
            "       `watch`.quantity   as quantity,\n" +
            "       `watch`.strap_type as strapType,\n" +
            "       i.url            as url,\n" +
            "       tr.name          as trademarkName,\n" +
            "       wt.name          as watchTypeName\n" +
            "from `watch`\n" +
            "         left join `image` i on watch.id = i.watch_id\n" +
            "         left join `trademarkt` tr on tr.id = `watch`.trademarkt_id\n" +
            "         left join `watch_type` wt on wt.id = `watch`.watch_type_id\n" +
            "where `watch`.name like concat('%', :nameWatch, '%')\n" +
            "group by `watch`.id", nativeQuery = true)
    Page<IWatch> getListWatchNameWatch(Pageable pageable, @Param("nameWatch") String nameWatch);

    @Query(value = "select * from watch", nativeQuery = true)
    Page<Watch> getListWatchManagement(Pageable pageable);


    @Query(value = "select watch.id         as id,\n" +
            "       watch.face       as face,\n" +
            "       watch.name       as name,\n" +
            "       watch.note       as note,\n" +
            "       watch.origin     as origin,\n" +
            "       watch.price      as price,\n" +
            "       watch.quantity   as quantity,\n" +
            "       watch.strap_type as strapType,\n" +
            "       i.url            as url,\n" +
            "       tr.name          as trademarkName,\n" +
            "       wt.name          as watchTypeName\n" +
            "from `watch`\n" +
            "         left join `image` i on watch.id = i.watch_id\n" +
            "         left join `trademarkt` tr on tr.id = `watch`.trademarkt_id\n" +
            "         left join `watch_type` wt on wt.id = `watch`.watch_type_id\n" +
            "group by `watch`.id\n" +
            "order by `watch`.id desc", nativeQuery = true)
    List<IWatch> getWatchSelling();

    @Modifying
    @Query(value = "update `watch` " +
            "set `watch`.color=:color, " +
            "    `watch`.face=:face, " +
            "    `watch`.name=:name, " +
            "    `watch`.note=:note, " +
            "    `watch`.origin=:origin, " +
            "    `watch`.price=:price, " +
            "    `watch`.quantity=:quantity, " +
            "    `watch`.strap_type=:strapType, " +
            "    `watch`.trademarkt_id=:trademarkId, " +
            "    `watch`.watch_type_id=:watchType " +
            "where watch.id = :id", nativeQuery = true)
    void updateWatch(@Param("id") Long id, @Param("color") String color, @Param("face") String face, @Param("name") String name,
                     @Param("note") String note, @Param("origin") String origin, @Param("price") double price, @Param("quantity") int quantity,
                     @Param("strapType") String strapType, @Param("trademarkId") Long trademarkId, @Param("watchType") Long watchType);


    @Modifying
    @Query(value = "update watch\n" +
            "set flag= true\n" +
            "where id = :idWatch", nativeQuery = true)
    void deleteWatch(@Param("idWatch") Long idWatch);

}
