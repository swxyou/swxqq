package Dao.Impl;

import Dao.ExcursionDao;
import entity.Excursion;
import util.BaseDao;

public class ExcursionDaoImpl extends BaseDao implements ExcursionDao {
    int num = 0;//提高返回值作用域

    /**
     * 增加出游人信息
     * */
    @Override
    public int InsertExcursion(Excursion excursion) {
        String sql = "insert into excursion(o_id, e_name, e_xing, e_ming, e_zhengjian, e_zhengjianType, e_sex, e_zjyxq, e_csrq, e_phone) VALUE (?,?,?,?,?,?,?,?,?,?)";
        Object[] o ={excursion.getOId(),excursion.getEName(),excursion.getEXing(),excursion.getEMing(),excursion.getEZhengjian(),1,excursion.getESex(),excursion.getEZjyxq(),excursion.getECsrq(),excursion.getEPhone()};
        num = this.exceuteUpdate(sql,o);
        return num;
    }
}
