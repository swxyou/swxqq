package service.Impl;

import Dao.BuysDao;
import Dao.Impl.BuysDaoImpl;
import entity.Buys;
import entity.BuysImage;
import service.BuysService;

import java.util.List;

public class BuysServiceImpl implements BuysService {
    BuysDao buysDao = new BuysDaoImpl();

    @Override
    public List<BuysImage> QuaryLeftImage(String id) {
        return buysDao.QuaryLeftImage(id);
    }

    @Override
    public List<Buys> QuertList(String id) {
        return buysDao.QuertList(id);
    }

    @Override
    public Buys Querybuy(String id) {
        return buysDao.Querybuy(id);
    }

    @Override
    public List<Buys> QueryBuys() {
        return buysDao.QueryBuys();
    }
}
