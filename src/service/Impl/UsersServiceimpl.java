package service.Impl;

import Dao.Impl.UsersDaoimpl;
import Dao.UsersDao;
import entity.Users;
import service.UsersService;
import util.BaseDao;

import java.util.List;

public class UsersServiceimpl extends BaseDao implements UsersService {
    //对象初始化
    UsersDao usersDao = new UsersDaoimpl();
    //提高返回值作用域
    int num = 0;

    /**
     * 登录
     */
    @Override
    public int login(String name, String pwd) {
        num = usersDao.login(name, pwd);
        return num;
    }

    /**
     * 获取验证吗
     */
    @Override
    public String Obtaintranslate(String phone) {
        String translate = usersDao.Obtaintranslate(phone);
        return translate;
    }

    /**
     * 验证码登录
     */
    @Override
    public int phoneLogin(String phone, String pwd, String translate) {
        num = usersDao.phoneLogin(phone, pwd, translate);
        return num;
    }

    /**
     * 注册
     */
    @Override
    public int register(String phone, String pwd) {
        num = usersDao.register(phone, pwd);
        return num;
    }

    /**
     * 验证手机唯一
     */
    @Override
    public int phoneOnly(String phone) {
        num = usersDao.phoneOnly(phone);
        return num;
    }

    /**
     * 修改密码
     */
    @Override
    public int updatePwd(String phone, String pwd) {
        num = usersDao.updatePwd(phone, pwd);
        return num;
    }

    @Override
    public List<Users> QueryUser(String name) {
        return usersDao.QueryUser(name);
    }
}
