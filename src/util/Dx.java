package util;

import org.apache.commons.codec.digest.DigestUtils;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Dx {
    /**
     * 开发者ID
     */
    private String ACCOUNT_SID = "b27718c8f2da489f9bf90f30ce78338a";//SID
    /**
     * 密匙
     */
    private String TOKEN = "643417d1f64f4d36862d59d6b02ff3d9"; //pwd
    /**
     * 生成随机验证码
     */
    private int s = (int) ((Math.random() * 9 + 1) * 100000);
    private String name = "【南京途旅科技有限公司】您的验证码为" + s + "，请于5分钟内正确输入，如非本人操作，请忽略此短信。";
    /*
     * 请求地址
     * **/
    private String path = "https://api.miaodiyun.com/20150822/industrySMS/sendSMS";



    private String to = "";
    private String time = getDateContent(new Date());
    //自己  MD5格式加密 (ID+密匙+时间戳)
    private String sig = DigestUtils.md5Hex(ACCOUNT_SID + TOKEN + time);


    public String string(String phone) {
        //赋值
        to = phone;
        String params = "accountSid={accountSid}" + //密匙id
                "&smsContent={smsContent}" + //短信内容
                "&to={to}" + // 发送到的手机号
                "&timestamp={time}" + //时间戳
                "&sig={sig}" +  //经过加密后的签名
                "&respDataType=JSON"; // 返回值类型
        params = params.replace("{accountSid}", ACCOUNT_SID);
        params = params.replace("{smsContent}", name);
        params = params.replace("{to}", to);
        params = params.replace("{time}", time);
        params = params.replace("{sig}", sig);
        System.out.println(params);

        try {
            URL url = new URL(path);

            HttpURLConnection http = (HttpURLConnection) url.openConnection();

            http.setRequestMethod("POST");
            // http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
            // 设置连接参数
            http.setDoOutput(true);
            http.setDoInput(true);

            http.setConnectTimeout(5000);//超时时间
            http.setReadTimeout(20000);
            // http.connect();  读取socket发送的信息  接收信息
            OutputStream os = http.getOutputStream();
            os.write(params.getBytes("UTF-8"));// 发送数据
            os.flush();
            os.close();

            // 获取返回信息
            InputStream is = http.getInputStream();
            int size = is.available();
            byte[] jsonBytes = new byte[size];
            is.read(jsonBytes);
            String message = new String(jsonBytes, "UTF-8");
            // {"respCode":"00000","respDesc":"请求成功。","failCount":"0","failList":[],"smsId":"2e1c571f6c134784a0081c4bf6768703"}
            System.out.println("返回信息：" + message);
            return s + "";

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";

    }

    public static String getDateContent(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String timestamp = sdf.format(date);
        return timestamp;
    }

}
