package controller;

import Dao.Impl.IndexBannerDaoImpl;
import Dao.IndexBannerDao;
import com.alibaba.fastjson.JSON;
import com.bdqn.jsp.study.utils.annotations.Controller;
import com.bdqn.jsp.study.utils.annotations.RequestMapping;
import com.bdqn.jsp.study.utils.annotations.ResponseBody;
import entity.*;
import service.BuysService;
import service.Impl.BuysServiceImpl;
import service.Impl.OrderServiceImpl;
import service.Impl.UsersServiceimpl;
import service.OrderService;
import service.UsersService;

import javax.servlet.http.HttpServlet;
import java.util.ArrayList;
import java.util.List;


@Controller(name = "/controller")
public class controller extends HttpServlet {
    BuysService buysService = new BuysServiceImpl();
    IndexBannerDao indexBannerDao = new IndexBannerDaoImpl();
    OrderService orderService = new OrderServiceImpl();

    @RequestMapping(name = "/QueryImage.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String Test(BuysImage buysImage) {
        List<BuysImage> list = buysService.QuaryLeftImage(buysImage.getBId());
        return JSON.toJSONString(list);
    }

    @RequestMapping(name = "/QueryList.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String QueryList(Buys buys) {
        List<Buys> list = buysService.QuertList(buys.getBId());
        return JSON.toJSONString(list);
    }

    @RequestMapping(name = "/QueryBanner.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String QueryBanner(Buys buys) {
        List<IndexBanner> list = indexBannerDao.QueryBanner();
        return JSON.toJSONString(list);
    }

    @RequestMapping(name = "/InsertOrder.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String Insertapplication() {

        return "1";
    }

    @RequestMapping(name = "/QueryUsers.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String QueryUsers(Users users) {
        UsersService usersService = new UsersServiceimpl();
        return JSON.toJSONString(usersService.QueryUser(users.getUser_id()));
    }

    @RequestMapping(name = "/QueryOrder.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String QueryOrder(Order order) {
        List<Order> olist = orderService.QueryOrder(order.getUserId());
        return JSON.toJSONString(olist);
    }

    @RequestMapping(name = "/Querybuys.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String Querybuys(Buys buys) {
        buys = buysService.Querybuy(buys.getBId());
        return JSON.toJSONString(buys);
    }

    @RequestMapping(name = "/setPay.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public int setPay(Order order) {
        int num = orderService.setPay(order);
        return num;
    }

    @RequestMapping(name = "/QueryB.do", contentType = "application/json;charset=UTF-8")
    @ResponseBody
    public String QueryB() {
        return JSON.toJSONString(buysService.QueryBuys());
    }
}
