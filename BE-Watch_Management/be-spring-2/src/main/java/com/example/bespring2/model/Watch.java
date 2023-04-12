package com.example.bespring2.model;


import javax.persistence.*;
import java.util.Set;

@Entity
public class Watch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String origin;
    private String face;
    private String strapType;
    private boolean flag;
    @Column(columnDefinition = "longtext")
    private String note;
    private String color;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "trademarkT_id", nullable = false, referencedColumnName = "id")
    private TrademarkT trademarkT;
    @ManyToOne
    @JoinColumn(name = "watchType_id", nullable = false, referencedColumnName = "id")
    private WatchType watchType;
    @OneToMany(mappedBy = "watch")
    private Set<Image> images;

    public Watch() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }


    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getFace() {
        return face;
    }

    public void setFace(String face) {
        this.face = face;
    }

    public String getStrapType() {
        return strapType;
    }

    public void setStrapType(String strapType) {
        this.strapType = strapType;
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public TrademarkT getTrademarkT() {
        return trademarkT;
    }

    public void setTrademarkT(TrademarkT trademarkT) {
        this.trademarkT = trademarkT;
    }

    public WatchType getWatchType() {
        return watchType;
    }

    public void setWatchType(WatchType watchType) {
        this.watchType = watchType;
    }

    public Set<Image> getImages() {
        return images;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
