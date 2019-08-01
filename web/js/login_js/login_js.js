var s = 0;
$(document).ready(function () {
    $("[name='submit_login']").on("click", function () {
        var name = $('#normal_tel').val();
        var password = $('#pwd').val();
        var phone = $('#telNum').val()
        if (name != "" && phone == "") {
            $.post('Servlet', {"opr": "login", "name": name, "pwd": password}, function (data) {
                if (data == 1) {
                    window.location.href = "Index.html";
                } else {
                    $('#login_error').show();
                    $('#login_error').html("用户名或密码错误！")
                }
            })
        } else if (name == "" && phone != "") {
            var Obtain = $('#Obtain').val();
            if (Obtain == "") {
                $('#login_error3').html("1").show()
            } else {
                if (Obtain==s){
                    window.location.href = "Index.html";
                } else{
                    $('#login_error3').html("验证码错误!").show();
                }
                $('#login_error3').html("").hide();
            }
        }
    });
    //登录单击获取验证码
    $('a[class="code-len get-code"]').click(function () {
        var phone = $('#telNum').val();
        if (phone != "") {
            $.post('Servlet', {"opr": "dxObtain", "phone": phone}, function (data) {
                s=data;
            })
        }
    })
})