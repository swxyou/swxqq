package Dao;

import entity.Buys;
import entity.BuysImage;

import java.util.List;

public interface BuysDao {

    /**
     * 查询左侧图片
     */
    List<BuysImage> QuaryLeftImage(String id);

    /**
     * 查询字段
     */
    List<Buys> QuertList(String id);

    /**
     * 根据id查询
     */
    Buys Querybuy(String id);

    //查询商品
    List<Buys> QueryBuys();
}
