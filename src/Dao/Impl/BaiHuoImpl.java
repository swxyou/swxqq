package Dao.Impl;

import Dao.BaiHuodao;
import entity.BaiHuo;
import util.BaseDao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BaiHuoImpl extends BaseDao implements BaiHuodao {
    @Override
    public List<BaiHuo> bh(String type) {
        String sql = "select * from baihuoshouye where bh_type=?";
        List<BaiHuo> listbh=new ArrayList<BaiHuo>();
        ResultSet rs = this.exceuteQuery(sql, type);
        try {
            while (rs.next()) {
                BaiHuo bh=new BaiHuo();
                bh.setBh_id(rs.getInt("bh_id"));
                bh.setBh_img("images/Shopping_image/"+rs.getString("bh_img"));
                listbh.add(bh);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return listbh;
    }
}
