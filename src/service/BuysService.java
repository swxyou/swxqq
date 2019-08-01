package service;

import entity.Buys;
import entity.BuysImage;

import java.util.List;

public interface BuysService {
    /**
     *  查询左侧图片
     * */
    List<BuysImage> QuaryLeftImage(String id);

    /**
     * 查询字段
     * */
    List<Buys> QuertList(String id);

    /**
     * 根据id查询
     * */
    Buys Querybuy(String id);

    List<Buys> QueryBuys();
}
