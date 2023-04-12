package com.example.bespring2.dto;

public interface IOrderDetail {
    Long getIdOrder();

    Long getIdWatch();

    String getWatchName();

    double getPrice();

    int getQuantity();

    String getUrl();

    String getCreateDate();

    double getMoney();
}
