package entity;


public class Buys {

  private String bId;
  private String bTitile;
  private String bPrice;
  private String bCityId;
  private String b_bgimg;
  private String b_Banimg;
  private String b_type;

  public String getB_Banimg() {
    return b_Banimg;
  }

  public void setB_Banimg(String b_Banimg) {
    this.b_Banimg = b_Banimg;
  }

  public String getB_type() {
    return b_type;
  }

  public void setB_type(String b_type) {
    this.b_type = b_type;
  }

  public String getBId() {
    return bId;
  }

  public void setBId(String bId) {
    this.bId = bId;
  }


  public String getBTitile() {
    return bTitile;
  }

  public void setBTitile(String bTitile) {
    this.bTitile = bTitile;
  }


  public String getBPrice() {
    return bPrice;
  }

  public void setBPrice(String bPrice) {
    this.bPrice = bPrice;
  }


  public String getBCityId() {
    return bCityId;
  }

  public void setBCityId(String bCityId) {
    this.bCityId = bCityId;
  }

  public String getB_bgimg() {
    return b_bgimg;
  }

  public void setB_bgimg(String b_bgimg) {
    this.b_bgimg = b_bgimg;
  }
}
