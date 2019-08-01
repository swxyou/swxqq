package servlet;

import Dao.BaiHuodao;
import Dao.Impl.BaiHuoImpl;
import Dao.Impl.IndexBannerDaoImpl;
import Dao.IndexBannerDao;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import entity.BaiHuo;
import entity.Buys;
import entity.Excursion;
import entity.Order;
import service.BuysService;
import service.Impl.BuysServiceImpl;
import service.Impl.OrderServiceImpl;
import service.Impl.UsersServiceimpl;
import service.OrderService;
import service.UsersService;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@WebServlet("/Servlet")
public class Servlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        response.setContentType("text/text");//防止乱码
        response.setCharacterEncoding("UTF-8");//编码格式
        response.setContentType("text/html;charset=UTF-8");//解决中文乱码
        request.setCharacterEncoding("utf-8");//解决中文乱码
        response.setContentType("text/html;charset=utf-8");//解决中文乱码
        //判断执行分支
        String opr = request.getParameter("opr");
        //Out对象实现
        PrintWriter out = response.getWriter();
        //用户控制层
        UsersService usersService = new UsersServiceimpl();
        int num = 0;
        //用户账号
        String name = request.getParameter("name");
        //用户密码
        String pwd = request.getParameter("pwd");
        //用户手机号
        String phone = request.getParameter("phone");
        //商品控制层
        BuysService buysService = new BuysServiceImpl();
        //主页
        IndexBannerDao indexBannerDao = new IndexBannerDaoImpl();
        //订单
        OrderService orderService = new OrderServiceImpl();
        switch (opr) {
            case "login"://账户密码登录
                num = usersService.login(name, pwd);
                if (num == 1) {
                    request.getSession().setAttribute("users", name);
                }
                out.print(num);
                break;
            case "dxObtain"://获取验证码
                String translate = usersService.Obtaintranslate(phone);
                out.print(translate);
                break;
            case "register"://注册
                num = usersService.register(phone, pwd);
                out.print(num);
                break;
            case "phoneOnly"://判断手机号是否存在
                num = usersService.phoneOnly(phone);
                out.print(num);
                break;
            case "updatePwd"://修改密码
                num = usersService.updatePwd(phone, pwd);
                out.print(num);
                break;
            case "InsertOrder":
                List<Excursion> list = new ArrayList<>();
                Excursion excursion = new Excursion();
                int Randoms = (int) ((Math.random() * 9 + 1) * 100000);
                Order order = new Order();
                String[] cyrName = request.getParameterValues("zwm");//出游人姓名
                String[] eXing = request.getParameterValues("pyx");//拼音性
                String[] eMing = request.getParameterValues("pym");//拼音名
                String[] eZhengjian = request.getParameterValues("zjhm");//证件号码
                String[] eSex = request.getParameterValues("sex");//性别
                String[] zjyxq_n = request.getParameterValues("zjyxq_n");
                String[] zjyxq_y = request.getParameterValues("zjyxq_y");
                String[] zjyxq_r = request.getParameterValues("zjyxq_r");

                String[] csrq_n = request.getParameterValues("csrq_n");
                String[] csrq_y = request.getParameterValues("csrq_y");
                String[] csrq_r = request.getParameterValues("csrq_r");
                String[] ePhone = request.getParameterValues("phone");

                order.setOId(Randoms + "");
                order.setOLxrName(request.getParameter("lxrName"));
                order.setOLxrPhone(request.getParameter("lxrPhone"));
                order.setPay("0");
                order.setBId(request.getParameter("bid"));
                order.setUserId(request.getParameter("user_id"));
                order.setMoney(request.getParameter("money"));
                order.setStar_time(request.getParameter("startime"));
                order.setB_title(request.getParameter("title"));
                for (int i = 0; i < cyrName.length; i++) {
                    excursion = new Excursion();
                    excursion.setOId(Randoms + "");
                    excursion.setEName(cyrName[i]);
                    excursion.setEXing(eXing[i]);
                    excursion.setEMing(eMing[i]);
                    excursion.setEZhengjian(eZhengjian[i]);
                    excursion.setESex(eSex[i]);
                    excursion.setEZjyxq(zjyxq_n[i] + "-" + zjyxq_y[i] + "-" + zjyxq_r[i]);
                    excursion.setECsrq(csrq_n[i] + "-" + csrq_y[i] + "-" + csrq_r[i]);
                    excursion.setEPhone(ePhone[i]);
                    list.add(excursion);
                }
                num = orderService.InsertOrder(order, list);
                if (num > 0) {
                    num = Integer.valueOf(order.getOId());
                }
                out.print(num);
                break;
            case "selectSession":
                String use = (String) request.getSession().getAttribute("users");
                System.out.println(use);
                out.print(use);
                break;
            case "init":
                BaiHuodao bhdao = new BaiHuoImpl();
                String type = request.getParameter("bh_type");
                List<BaiHuo> listbh = bhdao.bh(type);
                String json = JSON.toJSONString(listbh);
                out.print(json);
                break;
            case "QueryUsers":
                String user_id = request.getParameter("user_id");
                out.print(JSON.toJSONString(usersService.QueryUser(user_id)));
                break;
            case "QueryOrder":
                String uid = request.getParameter("userId");
                List<Order> olist = orderService.QueryOrder(uid);
                out.print(JSON.toJSONString(olist));
                break;
            case "Querybuys":
                String bid = request.getParameter("bId");
                Buys buys = buysService.Querybuy(bid);
                out.print(JSON.toJSONString(buys));
                break;
            case "getOid":
                String oid = (String) request.getSession().getAttribute("oid");
                out.print(oid);
                break;
        }
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        this.doPost(request, response);
    }
}
