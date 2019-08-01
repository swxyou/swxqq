package Dao.Impl;

import Dao.OrderDao;
import com.sun.org.apache.xpath.internal.operations.Or;
import entity.Order;
import util.BaseDao;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class OrderDaoImpl extends BaseDao implements OrderDao {
    int num = 0;//提高返回值作用域
    /**
     * 插入订单信息
     * */
    @Override
    public int InsertOrder(Order order) {
        String sql = "insert into `order`(o_id, b_id, o_lxrName, o_lxrPhone, user_id,pay,money,star_time,b_title) VALUE (?,?,?,?,?,0,?,?,?)";
        Object[] o = {order.getOId(),order.getBId(),order.getOLxrName(),order.getOLxrPhone(),order.getUserId(),order.getMoney(),order.getStar_time(),order.getB_title()};
        num = this.exceuteUpdate(sql,o);
        return num;
    }

    @Override
    public List<Order> QueryOrder(String id) {
        String sql = "select * from `order` where user_id = ?";
        List<Order> list = new ArrayList<>();
        ResultSet rs = this.exceuteQuery(sql,id);
        try {
            while (rs.next()){
                Order o = new Order();
                o.setBId(rs.getString("b_id"));
                o.setOLxrName(rs.getString("o_lxrName"));
                o.setOLxrPhone(rs.getString("o_lxrPhone"));
                o.setUserId(rs.getString("user_id"));
                o.setPay(rs.getString("pay"));
                o.setMoney(rs.getString("money"));
                o.setStar_time(rs.getString("star_time"));
                o.setOId(rs.getString("o_id"));
                o.setB_title(rs.getString("b_title"));
                list.add(o);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    @Override
    public int setPay(Order order) {
        String sql = "update `order` set pay = 1 where o_id = ?";
        num = this.exceuteUpdate(sql,order.getOId());
        return num;
    }
}
