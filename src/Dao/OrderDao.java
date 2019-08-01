package Dao;

import entity.Order;

import java.util.List;

public interface OrderDao {
    //插入订单
    int InsertOrder(Order order);

    //查询订单
    List<Order> QueryOrder(String id);

    //修改支付状态
    int setPay(Order order);
}
