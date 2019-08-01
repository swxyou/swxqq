package Dao.Impl;

import Dao.UsersDao;
import entity.Users;
import util.BaseDao;
import util.Dx;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UsersDaoimpl extends BaseDao implements UsersDao {
    //提高返回值作用域
    int num = 0;

    /**
     * 登录
     */
    @Override
    public int login(String name, String pwd) {
        String sql = "select * from users where (user_Name=? or user_Account=? or user_Phone = ? or user_Email = ?) and user_Password = ?";
        Object[] o = {name, name, name, name, pwd};
        ResultSet rs = this.exceuteQuery(sql, o);
        try {
            if (rs.next()) {
                num = 1;
            } else {
                num = 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return num;
    }

    /**
     * 获取验证吗
     */
    @Override
    public String Obtaintranslate(String phone) {
        Dx dx = new Dx();
        String translate = dx.string(phone);
        return translate;
    }

    /**
     * 验证码登录
     */
    @Override
    public int phoneLogin(String phone, String pwd, String translate) {
        if (pwd.equals(translate)) {
            System.out.println("登陆成功");
        }
        return num;
    }

    /**
     * 注册
     */
    @Override
    public int register(String phone, String pwd) {
        String sql = "insert into users(user_Phone,user_Account,user_Password) value (?,?,?)";
        int account = (int) ((Math.random() * 9 + 1) * 10000);
        Object[] o = {phone, account, pwd};
        num = this.exceuteUpdate(sql, o);
        return num;
    }

    /**
     * 验证手机唯一完整性
     */
    public int phoneOnly(String phone) {
        String sql = "select * from users where user_Phone = ?";
        Object[] o = {phone};
        ResultSet rs = this.exceuteQuery(sql, o);
        try {
            if (rs.next()) {
                num = 1;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return num;
    }

    /**
     * 修改密码
     */
    @Override
    public int updatePwd(String phone, String pwd) {
        String sql = "update users set user_password = ? where user_phone = ?";
        Object[] o = {pwd, phone};
        num = this.exceuteUpdate(sql, o);
        return num;
    }

    /**
     * 登录
     */
    @Override
    public List<Users> QueryUser(String name) {
        List<Users> list = new ArrayList<>();
        String sql = "select * from users where (user_Name=? or user_Account=? or user_Phone = ? or user_Email = ?)";
        Object[] o = {name, name, name, name};
        ResultSet rs = this.exceuteQuery(sql, o);
        try {
            Users users = new Users();
            while (rs.next()){
                users.setUser_id(rs.getString("user_Id"));
                users.setUser_Name(rs.getString("user_Name"));
                users.setUser_Sex(rs.getString("user_Sex"));
                users.setUser_Account(rs.getString("user_Account"));
                users.setUser_Phone(rs.getString("user_Phone"));
                users.setUser_Birthday(rs.getString("user_Birthday"));
                users.setUser_Email(rs.getString("user_Email"));
                users.setUser_Address(rs.getString("user_Address"));
                users.setUser_Marriage(rs.getString("user_Marriage"));
                users.setUser_Job(rs.getString("user_Job"));
                users.setUser_Education(rs.getString("user_Education"));
                list.add(users);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
}
