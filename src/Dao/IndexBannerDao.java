package Dao;

import entity.IndexBanner;

import java.util.List;

public interface IndexBannerDao {
    /**
     * 查询所有Banner
     */
    List<IndexBanner> QueryBanner();
}
