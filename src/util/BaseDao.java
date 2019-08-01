package util;

import java.sql.*;

public class BaseDao {
    public Connection conn;
    public Statement stmt;
    public ResultSet rs;
    public PreparedStatement pstms;

    public Connection getConnection() {
        try {
//            Context ctx = new InitialContext();
////          DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/newss");
////          conn =ds.getConnection();
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/tuniu", "root", "123");
        } catch (Exception e) {
            System.out.println("连接失败!" + e);
        }
        return conn;
    }

    /**
     * 增删改
     */
    public int exceuteUpdate(String sql, Object... prm) {
        PreparedStatement pstmt = null;
        int num = 0;
        conn = this.getConnection();
        try {
            pstmt = conn.prepareStatement(sql);
            // 确定Sql占位符
            if (null != prm) {
                for (int i = 0; i < prm.length; i++) {
                    pstmt.setObject(i + 1, prm[i]);
                }
            }
            //打印SQL语句
            System.out.println(this.printSQL(sql, prm));
            //发送SQL
            num = pstmt.executeUpdate();

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return num;
    }

    /**
     * 查询
     */
    public ResultSet exceuteQuery(String sql, Object... prms) {
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        conn = this.getConnection();
        try {
            conn = this.getConnection();
            pstmt = conn.prepareStatement(sql);
            //  确定Sql占位符
            if (prms != null) {
                for (int i = 0; i < prms.length; i++) {
                    pstmt.setObject(i + 1, prms[i]);
                }
            }
            //打印SQL语句
            System.out.println(this.printSQL(sql, prms));
            //返回一个查询结果集
            rs = pstmt.executeQuery();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return rs;
    }

    /**
     * 产生SQL语句
     */
    private String printSQL(String sql, Object... params) {
        //1 如果没有参数，说明不是动态SQL语句
        if (null == params)
            return sql;

        //2 如果有参数，则是动态的加了条件的SQL语句
        StringBuffer returnSQL = new StringBuffer();
        String[] subSQL = sql.split("\\?");

        for (int i = 0; i < params.length; i++) {
            returnSQL.append(subSQL[i]).append(" '").append(params[i]).append("' ");
        }

        if (subSQL.length > params.length) {
            returnSQL.append(subSQL[subSQL.length - 1]);
        }
        return returnSQL.toString();
    }


//    public List<news> getnews(){
//        List<news> arrlist = new ArrayList();
//        try {
//            getconn();
//            stmt = conn.createStatement();
//            rs = stmt.executeQuery("select * from news");
//            while (rs.next()) {
//                news n = new news();
//                n.setNewsID(rs.getInt("newsid"));
//                n.setAuthor(rs.getString("author"));
//                n.setContent(rs.getString("texts"));
//                n.setDataTime(rs.getString("dataTime"));
//                n.setTatle(rs.getString("tatle"));
//                arrlist.add(n);
//            }
//        } catch (Exception e) {
//            System.out.println(e);
//        }
//        return arrlist;
//    }
}
