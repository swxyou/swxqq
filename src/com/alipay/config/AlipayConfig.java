package com.alipay.config;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */


public class AlipayConfig {

    //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

    // 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
    public static String app_id = "2016091700534905";

    // 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSEkbNTg1TH2iaPRQK52HBbxQW+OrDKvUvpdzcWX+eqzqlVENAtq9JGt0YBnjXIudE5PvVXlvvuna2pn/6tBhf68vdUkA7u6zCV66Enu1YDkBXwmItkcso5hpUfHOnGgcZxwQYYkPqNmY78xv9iGgaSZ+rL8p+hCv/DIMcunculowEGaScUNranK2ibFw3Q/JSLEvsX9EyP1FFms/R+uVvq+SGhjWA8wLvrIeaFmomeg0uz0kM6ZXPRLWAhJRG4WKhOaGZUtf36gIQ8rfZJHX7PIewVmdPCAZaslSamWX3Gy7mdzvGUNKMWJtroYminb73/2YmHsJMA2Cid6jZgD7HAgMBAAECggEAOkwpDc9U6hPi/4vY7/Egxr66WeDGcVY3vOiJmTfvAzh7k3hpzu4aTyb1jp0mpVY8zvZEvAeI0citkIArG7e88qt9Fbu5/x0L+hRchnmXaElnzJ676EwDtTMA1y9ESTDOHK+dJs4xJMzJSKviQ/Go+rTfkMbmHlBJ7uTjfxe8cU7sRFlii//QYDV5sAHJ9NsgFMjyoCtsSCR538cyWeq60FQEtYRifjRI0mYocI3GL0mK9z6lrqc2WVzPuJcTE+w6/LZTR43X5e+QzsfHWF5EsrLTnRDqknB67IH/XDX3dzzgaYtUCOrKw3QbMuTGNxYsmWgXG4HAq2Ij2i3onWn1YQKBgQD9vY4xZZYdOIuJPWDSjptoJF0Tppdb4KPAEn29On7aVMl/xhcX/OvkeoJ6d5f+zZfJ6GY5A0+C0m9b78+tpFIrc/Ji3TtI2t96QVrKMZUniRUKO2fcgzWGCEjWblVkzXmlq6rEq68TJoi6kyrNJ94A1QGTRK1cFZvIoFKvHDfItQKBgQCTX0VsCSzbxzOxW7uJH72/7rCmT78EzobqYVbCKtVgOcjvo84Non+Nk9QXA1kfOtHMQI+xwJQxIJXWoogT5uHpEF96k4WdP6eciYyD1NcYuRkjfeRT4BxxFUBPA9mjTxgLsSackWJoEmUhVb5AfmLX8MFzKdyM4Z43Eg+ml46DCwKBgQCsCx6id5K09WYHA8rmeTL+BcnmTQpLjaD51o/TAhqIxvxo2lNGPINlQ3u8teIlLhlBGYZWGdyLg0tmNs/FmKjuNYufZQmReHYWWsHIXp4XVGcjrOvbJEviOTPJ0L2tv3Q/1InRF+d5QKNsfeSDfgiU39hVljdFPJGIEsx9VtCsEQKBgG9oGyvzt7ShX2OZTCj6FNCuWV4wdN/mXLl8QkDgbpOiu1LlitRl3nUhpriK8GmaZpU4zSf7xEtrLbqm/aXF6Uvt86/PK7fXMhc1KENUuBJZgzaAagY6KmYWQZo59+Hr3eqgzeaYRUMVfNv5XKyWnpRNzYAIylC6EofhIHG4qqRHAoGAFegElc/QCFGdtL6Fl2HOCbtdM0Z32yjylRlJiAH6GeFhXrq3KyBbCTC2bCqrMhnh3rWiXUOWk9e4LjtsP9hxQ/4NtZLxrsVN5jaWRZT+pBiwGoCOAnocWK+I9coNgzYLMu7BSHyrEsnez7quM7ZiHZviedO3Ex7O9raUDu9ztbk=";

    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkhJGzU4NUx9omj0UCudhwW8UFvjqwyr1L6Xc3Fl/nqs6pVRDQLavSRrdGAZ41yLnROT71V5b77p2tqZ/+rQYX+vL3VJAO7uswleuhJ7tWA5AV8JiLZHLKOYaVHxzpxoHGccEGGJD6jZmO/Mb/YhoGkmfqy/KfoQr/wyDHLp3LpaMBBmknFDa2pytomxcN0PyUixL7F/RMj9RRZrP0frlb6vkhoY1gPMC76yHmhZqJnoNLs9JDOmVz0S1gISURuFioTmhmVLX9+oCEPK32SR1+zyHsFZnTwgGWrJUmpll9xsu5nc7xlDSjFiba6GJop2+9/9mJh7CTANgoneo2YA+xwIDAQAB";

    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String notify_url = "http://localhost:8080/ZhiFu.html";

    // 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
    public static String return_url = "http://localhost:8080/ZhiFu.html";

    // 签名方式
    public static String sign_type = "RSA2";

    // 字符编码格式
    public static String charset = "utf-8";

    // 支付宝网关
    public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";

    // 支付宝网关
    public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /**
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     *
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis() + ".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
