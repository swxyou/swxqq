package entity;


public class Order {

    private String oId;
    private String bId;
    private String oLxrName;
    private String oLxrPhone;
    private String userId;
    private String pay;
    private String money;
    private String star_time;
    private String b_title;

    public String getB_title() {
        return b_title;
    }

    public void setB_title(String b_title) {
        this.b_title = b_title;
    }

    public String getStar_time() {
        return star_time;
    }

    public void setStar_time(String star_time) {
        this.star_time = star_time;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getPay() {
        return pay;
    }

    public void setPay(String pay) {
        this.pay = pay;
    }

    public String getOId() {
        return oId;
    }

    public void setOId(String oId) {
        this.oId = oId;
    }


    public String getBId() {
        return bId;
    }

    public void setBId(String bId) {
        this.bId = bId;
    }


    public String getOLxrName() {
        return oLxrName;
    }

    public void setOLxrName(String oLxrName) {
        this.oLxrName = oLxrName;
    }


    public String getOLxrPhone() {
        return oLxrPhone;
    }

    public void setOLxrPhone(String oLxrPhone) {
        this.oLxrPhone = oLxrPhone;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
