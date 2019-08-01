package service.Impl;

import Dao.ExcursionDao;
import Dao.Impl.ExcursionDaoImpl;
import Dao.Impl.OrderDaoImpl;
import Dao.OrderDao;
import entity.Excursion;
import entity.Order;
import service.OrderService;

import java.util.List;

public class OrderServiceImpl implements OrderService {
    int num = 0;//提高返回值作用域
    OrderDao orderDao = new OrderDaoImpl();//订单Dao层
    ExcursionDao excursionDao = new ExcursionDaoImpl();//出游人Dao层
    Excursion excursion = new Excursion();

    //插入订单
    @Override
    public int InsertOrder(Order order, List<Excursion> list) {
        for (int i = 0; i < list.size(); i++) {
            excursion = new Excursion();
            excursion = list.get(i);
            excursionDao.InsertExcursion(excursion);
        }
        num = orderDao.InsertOrder(order);
        return num;
    }

    @Override
    public List<Order> QueryOrder(String id) {
        return orderDao.QueryOrder(id);
    }

    @Override
    public int setPay(Order order) {
        return orderDao.setPay(order);
    }
}
