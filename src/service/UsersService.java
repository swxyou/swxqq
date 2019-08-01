package service;

import entity.Users;

import java.util.List;

public interface UsersService {
    /**
     * 登录
     */
    int login(String name, String pwd);

    /**
     * 获取验证吗
     */
    String Obtaintranslate(String phone);

    /**
     * 验证码登录
     */
    int phoneLogin(String phone, String pwd, String translate);

    /**
     * 注册
     */
    int register(String phone, String pwd);

    /**
     * 验证手机唯一完整性
     */
    int phoneOnly(String phone);

    /**
     * 修改密码
     */
    int updatePwd(String phone, String Pwd);
    /**
     * 查询用户信息
     * */
    public List<Users> QueryUser(String name);
}
