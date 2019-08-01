package Dao.Impl;

import Dao.IndexBannerDao;
import entity.IndexBanner;
import util.BaseDao;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class IndexBannerDaoImpl extends BaseDao implements IndexBannerDao {
    /**
     * Banner动态加载
     */
    @Override
    public List<IndexBanner> QueryBanner() {
        String sql = "select * from index_banner where i_type = 1";
        List<IndexBanner> list = new ArrayList<>();
        ResultSet rs = this.exceuteQuery(sql, null);
        try {
            while (rs.next()) {
                IndexBanner indexBanner = new IndexBanner();
                indexBanner.setIId(rs.getString("i_id"));
                indexBanner.setIImage(rs.getString("i_image"));
                indexBanner.setI_href(rs.getString("i_href"));
                list.add(indexBanner);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return list;
    }
}
