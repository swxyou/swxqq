//package controller;
//
//import com.alibaba.fastjson.JSON;
//import com.bdqn.jsp.study.utils.annotations.Controller;
//import com.bdqn.jsp.study.utils.annotations.RequestMapping;
//import com.bdqn.jsp.study.utils.annotations.ResponseBody;
//import entity.Buys;
//import entity.BuysImage;
//import service.BuysService;
//import service.Impl.BuysServiceImpl;
//
//import javax.servlet.http.HttpServlet;
//import java.util.List;
//
//
//@Controller(name = "/controller")
//public class controllersss extends HttpServlet {
//    BuysService buysService = new BuysServiceImpl();
//
//    @RequestMapping(name = "/QueryLeftImage.do", contentType = "application/json;charset=UTF-8")
//    @ResponseBody
//    String QueryLeftImage(BuysImage buysImage) {
//        System.out.println("执行方法1");
//        List<BuysImage> list = buysService.QuaryLeftImage(buysImage.getBId());
//        return JSON.toJSONString(list);
//    }
//
//    @RequestMapping(name = "/QueryList.do", contentType = "application/json;charset=UTF-8")
//    @ResponseBody
//    String QueryList(BuysImage buysImage) {
//        System.out.println("执行方法2");
//        List<Buys> list = buysService.QuertList(buysImage.getBId());
//        return JSON.toJSONString(list);
//    }
//}
