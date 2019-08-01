package Dao.Impl;

import Dao.BuysDao;
import entity.Buys;
import entity.BuysImage;
import util.BaseDao;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class BuysDaoImpl extends BaseDao implements BuysDao {
    List<BuysImage> imageList = new ArrayList<>();
    BuysImage buysImage = new BuysImage();
    Buys buys = new Buys();
    List<Buys> buysList = new ArrayList<>();

    /**
     * 查询左侧图片
     */
    @Override
    public List<BuysImage> QuaryLeftImage(String id) {
        imageList = new ArrayList<>();
        String sql = "select * from buys_image where b_id = ?";
        ResultSet rs = this.exceuteQuery(sql, id);
        try {
            while (rs.next()) {
                buysImage = new BuysImage();
                buysImage.setBId(rs.getString("b_id"));
                buysImage.setBImg(rs.getString("b_img"));
                buysImage.setB_smallimg(rs.getString("b_smallimg"));
                imageList.add(buysImage);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return imageList;
    }

    /**
     * 查询字段
     */
    @Override
    public List<Buys> QuertList(String id) {
        String sql = "select * from buys where b_id = ?";
        ResultSet rs = this.exceuteQuery(sql, id);
        try {
            while (rs.next()) {
                buysList = new ArrayList<>();
                buys = new Buys();
                buys.setBId(rs.getString("b_id"));
                buys.setBTitile(rs.getString("b_titile"));
                buys.setBPrice(rs.getString("b_Price"));
                buys.setBCityId(rs.getString("b_city_id"));
                buys.setB_bgimg(rs.getString("b_bgimg"));
                buysList.add(buys);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return buysList;
    }

    @Override
    public Buys Querybuy(String id) {
        String sql = "select * from buys where b_id = ?";
        ResultSet rs = this.exceuteQuery(sql, id);
        try {
            while (rs.next()) {
                buys = new Buys();
                buys.setBId(rs.getString("b_id"));
                buys.setBTitile(rs.getString("b_titile"));
                buys.setBPrice(rs.getString("b_Price"));
                buys.setBCityId(rs.getString("b_city_id"));
                buys.setB_bgimg(rs.getString("b_bgimg"));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return buys;
    }

    @Override
    public List<Buys> QueryBuys() {
        buysList = new ArrayList<>();
        String sql = "select * from buys where b_type = 1";
        ResultSet rs = this.exceuteQuery(sql, null);
        try {
            while (rs.next()) {
                buys = new Buys();
                buys.setBId(rs.getString("b_id"));
                buys.setBTitile(rs.getString("b_titile"));
                buys.setBPrice(rs.getString("b_Price"));
                buys.setB_bgimg(rs.getString("b_bgimg"));
                buys.setB_Banimg(rs.getString("b_Banimg"));
                buys.setB_type(rs.getString("b_type"));
                buysList.add(buys);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return buysList;
    }
}
