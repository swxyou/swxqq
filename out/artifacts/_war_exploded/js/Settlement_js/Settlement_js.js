var Adultnum = 0;//成人数量
var Childnum = 0;//儿童数量
var $Adult = 11571;//成人单价
var $Child = 7871;//儿童单价
var difference = 4000;//单房差
var countMoney = 0;//总价
var id = "";//商品ID
var city = "";//出发城市
var startime = "";//出发时间
var title = "";//商品
var lxrName = "";
var lxrPhone = "";
var comeTrue = false;
var cost = {
    0: [{id: "日本财险境外旅游升级版(适用于出游8~10天)", money: "195"}],
    1: [{id: "人保财出境游旅意险全面方案（出游8~10天）", money: "300"}],
    2: [{id: "日本财险境外旅游经典版(适用于出游9天)", money: "156"}],
    3: [{id: "人保财出境游旅意险经典方案（出游8~10天）", money: "160"}],
    4: [{id: "太平洋旅程取消险方案11", money: "300"}],
}
$(document).ready(function () {
    //数据初始化
    init();
    //提交
    $('#sub').click(function () {
        tijiao();
    })
    //减少
    $('a[class="tn_fontface minus"]').click(function () {
        var _index = $('a[class="tn_fontface minus"]').index(this);
        var _value = $('input[class=value]:eq(' + _index + ')').val();
        if (_value == 0) {
        } else {
            $('input[class=value]:eq(' + _index + ')').val(_value - 1)
            if (_index == 0) {
                Adultnum -= 1;
            } else if (_index == 1) {
                Childnum -= 1;
            }
            RemoveExcursion(_index);//移除出游人
            sumMoney();//计算团费
            SumCost();//计算保险费
            showcountMoney();//计算总价
        }
    })
    //增加
    $('a[class="tn_fontface plus"]').click(function () {
        var _index = $('a[class="tn_fontface plus"]').index(this);
        var _value = $('input[class=value]:eq(' + _index + ')').val()
        $('input[class=value]:eq(' + _index + ')').val(parseInt(_value) + 1)
        if (_index == 0) {
            Adultnum = parseInt(Adultnum) + 1
        } else if (_index == 1) {
            Childnum = parseInt(Childnum) + 1;
        }
        addExcursion(Adultnum, Childnum)//增加出游人
        sumMoney();//计算团费
        SumCost();//计算保险费
        showcountMoney();//计算总价
    })

    var bxflag = 0;
    //更多保险
    $('.more-insurance span').click(function () {
        $('.hide').toggle()
        if (bxflag % 2 == 0) {
            $('.more-insurance span').html('收起<i class="icon less-select-icon"></i>')
        } else {
            $('.more-insurance span').html('更多保险<i class="icon more-select-icon"></i>')
        }
        bxflag++;
    })

    //查看保险详细
    $('.bx_click').click(function () {
        var _index = $('.bx_click').index(this);
        $('.detail-wrapper:eq(' + _index + ') .resources-detail').show();
    })

    //关闭保险详细信息
    $('.close-detail').click(function () {
        var _index = $('.close-detail').index(this);
        $('.detail-wrapper:eq(' + _index + ') .resources-detail').hide();
    })

    //单选按钮
    $('input[name=lr]').change(function () {
        //#ff8800
        $('input[name=lr]').parent().css("color", "black")
        $('input[name=lr]:checked').parent().css("color", "#ff8800")
    })

    //选中保险信息
    $('input[name=bx]').change(function () {
        SumCost();
    })

    //单选按钮
    $('input[name=fp]').change(function () {
        $('input[name=fp]').parent().css("color", "black")
        $('input[name=fp]:checked').parent().css("color", "#ff8800")
    })

    //联系人姓名判断开始
    $('#lxrName').blur(function () {
        lxrName = $('#lxrName').val();
        if (lxrName == "") {
            $('div[class=error-tips]:eq(' + 0 + ') i').addClass("error-icon")
            $('div[class=error-tips]:eq(' + 0 + ') span').html('姓名为空!');
        } else if (lxrName.length < 4 || lxrName.length > 20) {
            $('div[class=error-tips]:eq(' + 0 + ') i').addClass("error-icon")
            $('div[class=error-tips]:eq(' + 0 + ') span').html('姓名不符合4~20字符!');
        } else {
            $('div[class=error-tips]:eq(' + 0 + ') i').removeClass("error-icon")
            $('div[class=error-tips]:eq(' + 0 + ') span').html('');
        }
    })
    //联系人姓名判断结束

    //联系人手机号判断开始
    $('#lxrPhone').blur(function () {
        lxrPhone = $('#lxrPhone').val();
        if (lxrPhone == "") {
            $('div[class=error-tips]:eq(' + 1 + ') i').addClass("error-icon")
            $('div[class=error-tips]:eq(' + 1 + ') span').html('手机号为空!');
        } else if (new RegExp(/^1\d{10}$/).test(lxrPhone) == false) {
            $('div[class=error-tips]:eq(' + 1 + ') i').addClass("error-icon")
            $('div[class=error-tips]:eq(' + 1 + ') span').html('手机号不符合11位数!');
        } else {
            $('div[class=error-tips]:eq(' + 1 + ') i').removeClass("error-icon")
            $('div[class=error-tips]:eq(' + 1 + ') span').html('');
        }
    })


})
//$(doccument).ready()结束
//初始化
var Session = "";
function init() {
    Session = selectSession();
    Intercept();
    //input框赋值开始
    $('input[class=value]:eq(' + 0 + ')').val(parseInt(Adultnum));
    $('input[class=value]:eq(' + 1 + ')').val(parseInt(Childnum));
    //input框赋值结束

    //Ajax请求获取数值开始
    var bus = {"bId": id}
    $.getJSON("controller/QueryList.do", bus, function (data) {
        title = data[0].bTitile;
        $('p[class=name]').text(data[0].bTitile);
    })
    $('div[class="s_cnum s_cnum_onlyone"] p').html(city);
    //todo:需要初始化
    $('p[class="f-ol s_ccon"]').html(startime);


    addExcursion(Adultnum, Childnum);//初始化出游人
    sumMoney();//初始化右侧结算信息
    SumCost();//初始化保险费用信息
    blues();
}

//增加出行人信息
function addExcursion(Cnum, Enum) {
    var str = getstr(Cnum, Enum)
    $('#tianchong').html(str)
}

//删除出游人信息
function RemoveExcursion(type) {
    if (type == 0) {
        $('div[class="bottom"]').last().parent().parent().parent().remove();
    } else if (type == 1) {
        $('div[class="bottom child"]').last().parent().parent().parent().remove();
    }
}

//字符串拼接
function getstr(Cnum, Enum) {
    var str = ""
    var num = 0;
    for (var i = 0; i < Cnum; i++) {
        ++num;
        str += "<div class=\"J_tourist_info\" id=\"J_Passes\">\n" +
            "                        <div>\n" +
            "                            <div class=\"tourist_info mt20 expanded\" data-type=\"adult\">\n" +
            "                                <div class=\"fl-panel\">\n" +
            "                                    <div class=\"top\">\n" +
            "                                        <input class=\"field_input touristType\" type=\"hidden\">第<span class=\"num\">" + num + "</span>位\n" +
            "                                    </div>\n" +
            "                                    <div class=\"bottom\">\n" +
            "                                        成人\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "\n" +
            "                                <div class=\"fr-panel\">\n" +
            "                                    <div class=\"field J_name\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>中文姓名：</label>\n" +
            "                                        <input class=\"field_input \" name='zwm' onblur='blues()' placeholder=\"请与证件保持一致\" type=\"text\">\n" +
            "                                        <!--填写说明-->\n" +
            "                                        <div class=\"instructions write-tips-hover\">填写说明\n" +
            "                                            <div class=\"write_tips_box\">\n" +
            "                                                <div class=\"cardImg\">\n" +
            "                                                    <ul class=\"change_card_img_tab\">\n" +
            "                                                        <li class=\"card_name activity\" data-cardimg=\"oldHuzhao\">老版护照\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"card_name\" data-cardimg=\"newHuzhao\">新版护照</li>\n" +
            "                                                        <li class=\"card_name\" data-cardimg=\"gangao\">港澳通行证</li>\n" +
            "                                                        <li class=\"card_name\" data-cardimg=\"taiwan\">台湾通行证</li>\n" +
            "                                                    </ul>\n" +
            "                                                    <ul class=\"card_img\">\n" +
            "                                                        <li class=\"oldHuzhao_img\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_oldhuzhao.png\">\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"newHuzhao_img hide\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_newhuzhao.png\">\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"gangao_img hide\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_gangao.png\">\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"taiwan_img hide\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_taiwan.png\">\n" +
            "                                                        </li>\n" +
            "                                                    </ul>\n" +
            "\n" +
            "                                                </div>\n" +
            "                                                <div class=\"write_note\">\n" +
            "                                                    <p class=\"rule_tips\">*请严格按照所选证件线上的信息填写</p>\n" +
            "                                                    <p class=\"notes\">填写说明</p>\n" +
            "                                                    <ul>\n" +
            "                                                        <li>1.乘客姓名需与所选证件上的名字一致。</li>\n" +
            "                                                        <li>2.中文姓名:\n" +
            "                                                            <p>·若持护照登机,必须确认护照上有中文姓名。</p>\n" +
            "                                                            <p>·生僻字可用拼音代替,例如:\"王赟\"可输入为\"王yun\"。</p>\n" +
            "                                                        </li>\n" +
            "                                                        <li>3.英文姓名:\n" +
            "                                                            <p>大陆籍游客,英文名为中文名拼音,若持护照登机,必须按照护照顺序区分姓与名,按照图示填写英文名。</p>\n" +
            "                                                        </li>\n" +
            "                                                        <li>4.英文名字的长度不可超过26个字符,\n" +
            "                                                            如名字过长请使用缩写,乘客的姓氏不能缩写,名可以缩写。姓氏中如包括空格请在输入时删掉空格。\n" +
            "                                                        </li>\n" +
            "                                                    </ul>\n" +
            "                                                </div>\n" +
            "                                                <span class=\"q\">◆</span>\n" +
            "                                                <span class=\"w\">◆</span>\n" +
            "                                            </div>\n" +
            "                                        </div>" +
            "                               <span style='display: none' class=\"error-tips\"><span class=\"icon error-icon\"></span></span>" +

            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J-english-name\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>英文姓名：</label>\n" +
            "                                        <div class=\"englishNameBar T_first\">\n" +
            "                                            <input class=\"field_input english-surname\" name='pyx' onblur='blues()' placeholder=\"拼音姓\" type=\"text\">\n" +
            "                                            <div class=\"lastNameList hide\"></div>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"englishNameBar\">\n" +
            "                                            <input class=\"field_input english-name\" name='pym' onblur='blues()' placeholder=\"拼音名\" type=\"text\">\n" +
            "                                            <div class=\"firstNameList hide\"></div>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"name-tips jtxz-detail-hover\">\n" +
            "                                            <i class=\"icon notice2-icon\"></i>\n" +
            "                                            <div class=\"jtxz-detail2 T_width2\">\n" +
            "                                                <p class=\"YD_mgb\">特别提醒：大陆籍游客，英文姓名为中文姓名拼音，如姓名为张小明，则在“姓(拼音或英文)”栏中输入ZHANG;\n" +
            "                                                    在“名(拼音或英文)”栏中输入XIAOMING</p>\n" +
            "                                                <span class=\"z\">◆</span>\n" +
            "                                                <span class=\"j\">◆</span>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "<span style='display: none' class=\"error-tips\"><span class=\"icon error-icon\"></span></span>" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_card_type J_card_no\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>证件类型：</label>\n" +
            "                                        <select class=\"field_select\">\n" +
            "\n" +
            "                                            <option value=\"2\" selected=\"selected\">护照</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "\n" +
            "                                        <input class=\"field_input card_no\" name='zjhm' onblur='blues()' placeholder=\"证件号码\" type=\"text\">\n" +
            "\n" + "<span style='display: none' class=\"error-tips\"><span class=\"icon error-icon\"></span></span>" +
            "\n" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_sex\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>性别：</label>\n" +
            "                                        <select class=\"field_select sex\" name='sex'>\n" +
            "                                            <option value=\"女\" selected=\"selected\">女</option>\n" +
            "                                            <option value=\"男\">男</option>\n" +
            "                                        </select>\n" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_card_valid_date \">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>证件有效期：</label>\n" +
            "                                        <select class=\"field_select_date\" name='zjyxq_n' data-year=\"\">\n" +
            "\n" +
            "                                            <option>2016</option>\n" +
            "\n" +
            "                                            <option>2017</option>\n" +
            "\n" +
            "                                            <option>2018</option>\n" +
            "\n" +
            "                                            <option selected=\"selected\">2019</option>\n" +
            "\n" +
            "                                            <option>2020</option>\n" +
            "\n" +
            "                                            <option>2021</option>\n" +
            "\n" +
            "                                            <option>2022</option>\n" +
            "\n" +
            "                                            <option>2023</option>\n" +
            "\n" +
            "                                            <option>2024</option>\n" +
            "\n" +
            "                                            <option>2025</option>\n" +
            "\n" +
            "                                            <option>2026</option>\n" +
            "\n" +
            "                                            <option>2027</option>\n" +
            "\n" +
            "                                            <option>2028</option>\n" +
            "\n" +
            "                                            <option>2029</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date\" name='zjyxq_y' data-month=\"\">\n" +
            "\n" +
            "                                            <option>1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option selected=\"selected\">5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date\" name='zjyxq_r' data-day=\"\">\n" +
            "\n" +
            "                                            <option selected=\"selected\">1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option>5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                            <option>13</option>\n" +
            "\n" +
            "                                            <option>14</option>\n" +
            "\n" +
            "                                            <option>15</option>\n" +
            "\n" +
            "                                            <option>16</option>\n" +
            "\n" +
            "                                            <option>17</option>\n" +
            "\n" +
            "                                            <option>18</option>\n" +
            "\n" +
            "                                            <option>19</option>\n" +
            "\n" +
            "                                            <option>20</option>\n" +
            "\n" +
            "                                            <option>21</option>\n" +
            "\n" +
            "                                            <option>22</option>\n" +
            "\n" +
            "                                            <option>23</option>\n" +
            "\n" +
            "                                            <option>24</option>\n" +
            "\n" +
            "                                            <option>25</option>\n" +
            "\n" +
            "                                            <option>26</option>\n" +
            "\n" +
            "                                            <option>27</option>\n" +
            "\n" +
            "                                            <option>28</option>\n" +
            "\n" +
            "                                            <option>29</option>\n" +
            "\n" +
            "                                            <option>30</option>\n" +
            "\n" +
            "                                            <option>31</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "<span style='display: none' class=\"error-tips\"><span class=\"icon error-icon\"></span></span>" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_birth_date\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>出生日期：</label>\n" +
            "                                        <select class=\"field_select_date \" name='csrq_n' data-year=\"\">\n" +
            "\n" +
            "                                            <option class=\"bir\">1920</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1921</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1922</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1923</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1924</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1925</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1926</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1927</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1928</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1929</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1930</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1931</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1932</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1933</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1934</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1935</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1936</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1937</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1938</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1939</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1940</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1941</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1942</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1943</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1944</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1945</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1946</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1947</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1948</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1949</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1950</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1951</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1952</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1953</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1954</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1955</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1956</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1957</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1958</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1959</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1960</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1961</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1962</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1963</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1964</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1965</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1966</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1967</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1968</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1969</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1970</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1971</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1972</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1973</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1974</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1975</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1976</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1977</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1978</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1979</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1980</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1981</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1982</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1983</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1984</option>\n" +
            "\n" +
            "                                            <option selected=\"selected\" class=\"bir\">1985</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1986</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1987</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1988</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1989</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1990</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1991</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1992</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1993</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1994</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1995</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1996</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1997</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1998</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1999</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2000</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2001</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2002</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2003</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2004</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2005</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2006</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2007</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2008</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2009</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2010</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2011</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2012</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2013</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2014</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2015</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2016</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date \" name='csrq_y' data-month=\"\">\n" +
            "\n" +
            "                                            <option selected=\"selected\">1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option>5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date last\" name='csrq_r' data-day=\"\">\n" +
            "\n" +
            "                                            <option selected=\"selected\">1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option>5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                            <option>13</option>\n" +
            "\n" +
            "                                            <option>14</option>\n" +
            "\n" +
            "                                            <option>15</option>\n" +
            "\n" +
            "                                            <option>16</option>\n" +
            "\n" +
            "                                            <option>17</option>\n" +
            "\n" +
            "                                            <option>18</option>\n" +
            "\n" +
            "                                            <option>19</option>\n" +
            "\n" +
            "                                            <option>20</option>\n" +
            "\n" +
            "                                            <option>21</option>\n" +
            "\n" +
            "                                            <option>22</option>\n" +
            "\n" +
            "                                            <option>23</option>\n" +
            "\n" +
            "                                            <option>24</option>\n" +
            "\n" +
            "                                            <option>25</option>\n" +
            "\n" +
            "                                            <option>26</option>\n" +
            "\n" +
            "                                            <option>27</option>\n" +
            "\n" +
            "                                            <option>28</option>\n" +
            "\n" +
            "                                            <option>29</option>\n" +
            "\n" +
            "                                            <option>30</option>\n" +
            "\n" +
            "                                            <option>31</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"field J_mobile_no\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>手机号码：</label>\n" +
            "                                        <input class=\"field_input internation_code_box\" name='phones' readonly=\"readonly\"\n" +
            "                                               placeholder=\"国际区号\" value=\"0086\" data-telcountryid=\"40\" type=\"text\">-\n" +
            "                                        <input class=\"field_input mobile_box\" name='phone' onblur='blues()' type=\"text\">\n" +
            "<span style='display: none' class=\"error-tips\"><span class=\"icon error-icon\"></span></span>" +
            "                                    </div>\n" +
            "                                    <p class=\"tel_tips\">因机票订票需要，除12岁(不含)以下儿童、70岁(含)以上老人外，所有出游人需填写手机号</p>\n" +
            "                                    <p class=\"save-to-common\"><label class=\"input_checkbox \"><span\n" +
            "                                            class=\"tn_fontface\"></span>保存到常旅</label></p>\n" +
            "                                    <!--绑定资源-->\n" +
            "                                </div>\n" +
            "                                <div class=\"function_box\">\n" +
            "                                    <span class=\"function_btn cleat_btn\">清空</span>\n" +
            "                                </div>\n" +
            "                                <div class=\"bottom_function_box\">\n" +
            "                                </div>\n" +
            "                                <div class=\"clear-float\">\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>";
    }
    for (var i = 0; i < Enum; i++) {
        ++num;
        str += "<div class=\"J_tourist_info\" id=\"J_Passes\">\n" +
            "                        <div>\n" +
            "                            <div class=\"tourist_info mt20 expanded\" data-type=\"adult\">\n" +
            "                                <div class=\"fl-panel\">\n" +
            "                                    <div class=\"top\">\n" +
            "                                        <input class=\"field_input touristType\" type=\"hidden\">第<span class=\"num\">" + num + "</span>位\n" +
            "                                    </div>\n" +
            "                                    <div class=\"bottom child\">\n" +
            "                                        儿童\n" +
            "                                    </div>\n" +
            "                                </div>\n" +
            "\n" +
            "                                <div class=\"fr-panel\">\n" +
            "                                    <div class=\"field J_name\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>中文姓名：</label>\n" +
            "                                        <input class=\"field_input \" name='zwm' onblur='blues()' placeholder=\"请与证件保持一致\" type=\"text\">\n" +
            "                                        <!--填写说明-->\n" +
            "                                        <div class=\"instructions write-tips-hover\">填写说明\n" +
            "                                            <div class=\"write_tips_box\">\n" +
            "                                                <div class=\"cardImg\">\n" +
            "                                                    <ul class=\"change_card_img_tab\">\n" +
            "                                                        <li class=\"card_name activity\" data-cardimg=\"oldHuzhao\">老版护照\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"card_name\" data-cardimg=\"newHuzhao\">新版护照</li>\n" +
            "                                                        <li class=\"card_name\" data-cardimg=\"gangao\">港澳通行证</li>\n" +
            "                                                        <li class=\"card_name\" data-cardimg=\"taiwan\">台湾通行证</li>\n" +
            "                                                    </ul>\n" +
            "                                                    <ul class=\"card_img\">\n" +
            "                                                        <li class=\"oldHuzhao_img\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_oldhuzhao.png\">\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"newHuzhao_img hide\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_newhuzhao.png\">\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"gangao_img hide\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_gangao.png\">\n" +
            "                                                        </li>\n" +
            "                                                        <li class=\"taiwan_img hide\">\n" +
            "                                                            <img src=\"images/Settlement_image/huzhao/card_img_taiwan.png\">\n" +
            "                                                        </li>\n" +
            "                                                    </ul>\n" +
            "\n" +
            "                                                </div>\n" +
            "                                                <div class=\"write_note\">\n" +
            "                                                    <p class=\"rule_tips\">*请严格按照所选证件线上的信息填写</p>\n" +
            "                                                    <p class=\"notes\">填写说明</p>\n" +
            "                                                    <ul>\n" +
            "                                                        <li>1.乘客姓名需与所选证件上的名字一致。</li>\n" +
            "                                                        <li>2.中文姓名:\n" +
            "                                                            <p>·若持护照登机,必须确认护照上有中文姓名。</p>\n" +
            "                                                            <p>·生僻字可用拼音代替,例如:\"王赟\"可输入为\"王yun\"。</p>\n" +
            "                                                        </li>\n" +
            "                                                        <li>3.英文姓名:\n" +
            "                                                            <p>大陆籍游客,英文名为中文名拼音,若持护照登机,必须按照护照顺序区分姓与名,按照图示填写英文名。</p>\n" +
            "                                                        </li>\n" +
            "                                                        <li>4.英文名字的长度不可超过26个字符,\n" +
            "                                                            如名字过长请使用缩写,乘客的姓氏不能缩写,名可以缩写。姓氏中如包括空格请在输入时删掉空格。\n" +
            "                                                        </li>\n" +
            "                                                    </ul>\n" +
            "                                                </div>\n" +
            "                                                <span class=\"q\">◆</span>\n" +
            "                                                <span class=\"w\">◆</span>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J-english-name\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>英文姓名：</label>\n" +
            "                                        <div class=\"englishNameBar T_first\">\n" +
            "                                            <input class=\"field_input english-surname\" name='pyx' onblur='blues()' placeholder=\"拼音姓\" type=\"text\">\n" +
            "                                            <div class=\"lastNameList hide\"></div>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"englishNameBar\">\n" +
            "                                            <input class=\"field_input english-name\" name='pym' onblur='blues()' placeholder=\"拼音名\" type=\"text\">\n" +
            "                                            <div class=\"firstNameList hide\"></div>\n" +
            "                                        </div>\n" +
            "                                        <div class=\"name-tips jtxz-detail-hover\">\n" +
            "                                            <i class=\"icon notice2-icon\"></i>\n" +
            "                                            <div class=\"jtxz-detail2 T_width2\">\n" +
            "                                                <p class=\"YD_mgb\">特别提醒：大陆籍游客，英文姓名为中文姓名拼音，如姓名为张小明，则在“姓(拼音或英文)”栏中输入ZHANG;\n" +
            "                                                    在“名(拼音或英文)”栏中输入XIAOMING</p>\n" +
            "                                                <span class=\"z\">◆</span>\n" +
            "                                                <span class=\"j\">◆</span>\n" +
            "                                            </div>\n" +
            "                                        </div>\n" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_card_type J_card_no\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>证件类型：</label>\n" +
            "                                        <select class=\"field_select\">\n" +
            "\n" +
            "                                            <option value=\"2\" selected=\"selected\">护照</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "\n" +
            "                                        <input class=\"field_input card_no\" onblur='blues()' placeholder=\"证件号码\" type=\"text\">\n" +
            "\n" +
            "\n" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_sex\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>性别：</label>\n" +
            "                                        <select class=\"field_select sex\" name='sex'>\n" +
            "                                            <option value=\"女\" selected=\"selected\">女</option>\n" +
            "                                            <option value=\"男\">男</option>\n" +
            "                                        </select>\n" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_card_valid_date \">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>证件有效期：</label>\n" +
            "                                        <select class=\"field_select_date\" name='zjyxq_n' data-year=\"\">\n" +
            "\n" +
            "                                            <option>2016</option>\n" +
            "\n" +
            "                                            <option>2017</option>\n" +
            "\n" +
            "                                            <option>2018</option>\n" +
            "\n" +
            "                                            <option selected=\"selected\">2019</option>\n" +
            "\n" +
            "                                            <option>2020</option>\n" +
            "\n" +
            "                                            <option>2021</option>\n" +
            "\n" +
            "                                            <option>2022</option>\n" +
            "\n" +
            "                                            <option>2023</option>\n" +
            "\n" +
            "                                            <option>2024</option>\n" +
            "\n" +
            "                                            <option>2025</option>\n" +
            "\n" +
            "                                            <option>2026</option>\n" +
            "\n" +
            "                                            <option>2027</option>\n" +
            "\n" +
            "                                            <option>2028</option>\n" +
            "\n" +
            "                                            <option>2029</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date\" name='zjyxq_y' data-month=\"\">\n" +
            "\n" +
            "                                            <option>1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option selected=\"selected\">5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date\" name='zjyxq_r' data-day=\"\">\n" +
            "\n" +
            "                                            <option selected=\"selected\">1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option>5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                            <option>13</option>\n" +
            "\n" +
            "                                            <option>14</option>\n" +
            "\n" +
            "                                            <option>15</option>\n" +
            "\n" +
            "                                            <option>16</option>\n" +
            "\n" +
            "                                            <option>17</option>\n" +
            "\n" +
            "                                            <option>18</option>\n" +
            "\n" +
            "                                            <option>19</option>\n" +
            "\n" +
            "                                            <option>20</option>\n" +
            "\n" +
            "                                            <option>21</option>\n" +
            "\n" +
            "                                            <option>22</option>\n" +
            "\n" +
            "                                            <option>23</option>\n" +
            "\n" +
            "                                            <option>24</option>\n" +
            "\n" +
            "                                            <option>25</option>\n" +
            "\n" +
            "                                            <option>26</option>\n" +
            "\n" +
            "                                            <option>27</option>\n" +
            "\n" +
            "                                            <option>28</option>\n" +
            "\n" +
            "                                            <option>29</option>\n" +
            "\n" +
            "                                            <option>30</option>\n" +
            "\n" +
            "                                            <option>31</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                    </div>\n" +
            "\n" +
            "\n" +
            "                                    <div class=\"field J_birth_date\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>出生日期：</label>\n" +
            "                                        <select class=\"field_select_date \" name='csrq_n' data-year=\"\">\n" +
            "\n" +
            "                                            <option class=\"bir\">1920</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1921</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1922</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1923</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1924</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1925</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1926</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1927</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1928</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1929</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1930</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1931</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1932</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1933</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1934</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1935</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1936</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1937</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1938</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1939</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1940</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1941</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1942</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1943</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1944</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1945</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1946</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1947</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1948</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1949</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1950</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1951</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1952</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1953</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1954</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1955</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1956</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1957</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1958</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1959</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1960</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1961</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1962</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1963</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1964</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1965</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1966</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1967</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1968</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1969</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1970</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1971</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1972</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1973</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1974</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1975</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1976</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1977</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1978</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1979</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1980</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1981</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1982</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1983</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1984</option>\n" +
            "\n" +
            "                                            <option selected=\"selected\" class=\"bir\">1985</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1986</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1987</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1988</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1989</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1990</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1991</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1992</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1993</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1994</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1995</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1996</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1997</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1998</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">1999</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2000</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2001</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2002</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2003</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2004</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2005</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2006</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2007</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2008</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2009</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2010</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2011</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2012</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2013</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2014</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2015</option>\n" +
            "\n" +
            "                                            <option class=\"bir\">2016</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date \" name='csrq_y' data-month=\"\">\n" +
            "\n" +
            "                                            <option selected=\"selected\">1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option>5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                        <select class=\"field_select_date last\" name='csrq_r' data-day=\"\">\n" +
            "\n" +
            "                                            <option selected=\"selected\">1</option>\n" +
            "\n" +
            "                                            <option>2</option>\n" +
            "\n" +
            "                                            <option>3</option>\n" +
            "\n" +
            "                                            <option>4</option>\n" +
            "\n" +
            "                                            <option>5</option>\n" +
            "\n" +
            "                                            <option>6</option>\n" +
            "\n" +
            "                                            <option>7</option>\n" +
            "\n" +
            "                                            <option>8</option>\n" +
            "\n" +
            "                                            <option>9</option>\n" +
            "\n" +
            "                                            <option>10</option>\n" +
            "\n" +
            "                                            <option>11</option>\n" +
            "\n" +
            "                                            <option>12</option>\n" +
            "\n" +
            "                                            <option>13</option>\n" +
            "\n" +
            "                                            <option>14</option>\n" +
            "\n" +
            "                                            <option>15</option>\n" +
            "\n" +
            "                                            <option>16</option>\n" +
            "\n" +
            "                                            <option>17</option>\n" +
            "\n" +
            "                                            <option>18</option>\n" +
            "\n" +
            "                                            <option>19</option>\n" +
            "\n" +
            "                                            <option>20</option>\n" +
            "\n" +
            "                                            <option>21</option>\n" +
            "\n" +
            "                                            <option>22</option>\n" +
            "\n" +
            "                                            <option>23</option>\n" +
            "\n" +
            "                                            <option>24</option>\n" +
            "\n" +
            "                                            <option>25</option>\n" +
            "\n" +
            "                                            <option>26</option>\n" +
            "\n" +
            "                                            <option>27</option>\n" +
            "\n" +
            "                                            <option>28</option>\n" +
            "\n" +
            "                                            <option>29</option>\n" +
            "\n" +
            "                                            <option>30</option>\n" +
            "\n" +
            "                                            <option>31</option>\n" +
            "\n" +
            "                                        </select>\n" +
            "                                    </div>\n" +
            "                                    <div class=\"field J_mobile_no\">\n" +
            "                                        <label class=\"field_label\"><em class=\"stars\">* </em>手机号码：</label>\n" +
            "                                        <input class=\"field_input internation_code_box\" readonly=\"readonly\"\n" +
            "                                               placeholder=\"国际区号\" value=\"0086\" data-telcountryid=\"40\" type=\"text\">-\n" +
            "                                        <input class=\"field_input mobile_box\" name='phone' onblur='blues()' type=\"text\">\n" +
            "                                    </div>\n" +
            "                                    <p class=\"tel_tips\">因机票订票需要，除12岁(不含)以下儿童、70岁(含)以上老人外，所有出游人需填写手机号</p>\n" +
            "                                    <p class=\"save-to-common\"><label class=\"input_checkbox \"><span\n" +
            "                                            class=\"tn_fontface\"></span>保存到常旅</label></p>\n" +
            "                                    <!--绑定资源-->\n" +
            "                                </div>\n" +
            "                                <div class=\"function_box\">\n" +
            "                                    <span class=\"function_btn cleat_btn\">清空</span>\n" +
            "                                </div>\n" +
            "                                <div class=\"bottom_function_box\">\n" +
            "                                </div>\n" +
            "                                <div class=\"clear-float\">\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>";
    }
    return str;
}

//计算出游团费价格
var $Group = 0;

//计算价格
function sumMoney() {
    var Adultmonry = parseInt($Adult) * parseInt(Adultnum);//成人费用
    var Childmoney = $Child * Childnum;//儿童费用
    $Group = 0;
    $Group = Adultmonry + Childmoney;//团费
    var Insurance = 0;//保险费用
    var Total = 0;//总价
    var bx = $('input[name=bx]:checked');

    //出游团费开始
    var str = "<p class=\"price-detail-title\">\n" +
        "<span class=\"title\">出游团费</span>\n" +
        "<span class=\"main\" id='tf'>" + $Group + "</span>\n" +
        "</p>\n" +
        "<p class=\"price-detail\" >成人￥" + $Adult + "x" + Adultnum + "</p>"
    if (Childnum != 0) {
        str += "<p class=\"price-detail\">儿童￥" + $Child + "×" + Childnum + "</p>";
    }
    $('#Adult').html(str);
    //出游团费结束

    //单房差开始
    if ((parseInt(Adultnum) + parseInt(Childnum)) % 2 == 0) {
        $('#dfc').hide()
        $('#m-schedule-info').hide()
        difference = 0;
    } else {
        $('#dfc').show()
        $('#m-schedule-info').show()
        difference = 4000;
    }
    //单房差结束
}

//选中保险事件
var sumprice = 0;

function SumCost() {
    var inputChecked = $('input[name=bx]:checked')
    var _index = [];
    var str = "";
    sumprice = 0;
    $(inputChecked).each(function (i) {
        _index.push($('input[name=bx]').index(inputChecked[i]))
    })
    $(_index).each(function (i) {
        sumprice += parseInt(cost[_index[i]][0].money);
    })
    sumprice = sumprice * parseInt(parseInt(Adultnum) + parseInt(Childnum));

    str += "<p class=\"price-detail-title\">\n" +
        "<span class=\"title\">保险费用</span>\n" +
        "<span class=\"main\" id='bxf'>￥" + sumprice + "</span>\n" +
        "</p>";
    $(_index).each(function (i) {
        str += "<p class=\"price-detail\">\n" +
            "<span class=\"subtitle\" title=\"" + cost[_index[i]][0].id + "\">" + cost[_index[i]][0].id + "</span>\n" +
            "￥" + cost[_index[i]][0].money + "x" + (parseInt(Adultnum) + parseInt(Childnum)) + "\n" +
            "</p>"
    })
    $('#bxxx').html(str);
    if (_index.length == 0) {
        $('#bxxx').hide()
    } else {
        $('#bxxx').show()
    }
    showcountMoney();//计算总价
}

//显示房价
function showcountMoney() {
    countMoney = 0;
    countMoney = ($Group + sumprice + difference)
    $('#countMoney').html(parseInt(countMoney));
}

//获取基本信息
function Intercept() {
    var url = location.search;
    var Request = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1)　//去掉?号
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    id = Request["id"];
    city = decodeURI(getQueryVariable("city"), "utf-8");
    startime = decodeURI(getQueryVariable("startime"), "utf-8");
    title = decodeURI(Request["title"]);
    Adultnum = Request["Adultnum"];
    Childnum = Request["Childnum"];
    user_id = decodeURI(Request["uname"]);
    $.getJSON("Servlet",{"opr":"QueryUsers","user_id":user_id},function (data) {
        user_id = data[0].user_id;
    })
}
var user_id;
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

//提交订单按钮单击事件
function tijiao() {
    var _data = 'user_id='+user_id+'&startime=' + startime + '&title=' + title + '&money=' + countMoney + '&opr=InsertOrder&bid=' + id + '&lxrName=' + lxrName + "&lxrPhone=" + lxrPhone + "&" + $('#tianchongform').serialize();

    $.ajax({
        url: 'Servlet',
        type: 'POST',
        data: _data,
        dataType: 'json',
        success: function (data) {
            if (data == 0) {
                alert("订单创建失败，请检查输入信息或与管理员联系")
            } else if (data > 0) {
                alert("订单创建成功，请尽快付款。")
                window.location.href = "pay/alipay.trade.page.pay.jsp?oid=" + data + "&money=" + countMoney;
            }
        },
        error: function (xhr) {
            alert('error');
        }
    });
}

//表单验证开始
var cyrName = []//联系人姓名
var cyrPhone = []//联系人电话
var pyx_value = []//拼音性
var pym_value = []//拼音名
var sexs = [];//性别
var zjhm = []//证件号码
var zjyxq = [];//证件有效期
var csrq = [];//出生日期
var nums = "";

function blues() {
    cyrName = [];
    cyrPhone = [];
    pyx_value = [];
    pym_value = [];
    sexs = [];
    zjhm = [];
    zjyxq = [];
    csrq = [];
    var name = $('input[name=zwm]');
    nums = $('.J_tourist_info').length;
    $(name).each(function (i) {
        cyrName.push(name[i].value)
    })
    var ph = $('input[name=phone]');
    $(ph).each(function (i) {
        cyrPhone.push(ph[i].value)
    })

    var pyx = $('input[name=pyx]');
    $(pyx).each(function (i) {
        pyx_value.push(pyx[i].value)
    })
    var pym = $('input[name=pym]');
    $(pym).each(function (i) {
        pym_value.push(pym[i].value)
    })
    var hz = $('input[name=zjhm]')
    $(hz).each(function (i) {
        zjhm.push(hz[i].value)
    })
    var xb = $('select[name=sex]');
    $(xb).each(function (i) {
        sexs.push(xb[i].value)
    })
    var rq_n = $('select[name=zjyxq_n]');
    var rq_y = $('select[name=zjyxq_y]')
    var rq_r = $('select[name=zjyxq_r]')
    $(rq_n).each(function (i) {
        var result = (rq_n[i].value + "-" + rq_y[i].value + "-" + rq_r[i].value)
        zjyxq.push(result)
    })
    var cs_n = $('select[name=csrq_n]');
    var cs_y = $('select[name=csrq_y]');
    var cs_r = $('select[name=csrq_r]');
    $(cs_n).each(function (i) {
        var result = (cs_n[i].value + "-" + cs_y[i].value + "-" + cs_r[i].value);
        csrq.push(result)
    })

    for (var i = 0; i < nums; i++) {
        //姓名判断开始
        if (cyrName[i] == "") {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 0 + ')').show()
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 0 + ')').html('<span class="icon error-icon"></span>姓名为空!');
        } else if (cyrName[i] != "") {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 0 + ')').hide()
        }
        //姓名判断结束
        //拼音姓名判断开始
        if (pyx_value[i] == "" || pym_value[i] == "") {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 1 + ')').show()
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 1 + ')').html('<span class="icon error-icon"></span>请填写姓名的拼音或英文!');
        } else {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 1 + ')').hide()
        }
        //拼音姓名判断结束
        //护照判断开始
        if (zjhm[i] == "") {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 2 + ')').show()
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 2 + ')').html('<span class="icon error-icon"></span>请填写姓名的拼音或英文!');
        } else {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 2 + ')').hide()
        }
        //护照判断结束
        //证件有效期判断开始
        // alert(endtime.getMonth())
        // if (zjyxq<(endtime.getMonth()))
        //证件有效期判断结束

        //手机号码判断开始
        if (cyrPhone[i] == "") {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 4 + ')').show()
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 4 + ')').html('<span class="icon error-icon"></span>请填写正确的手机号!');
        } else {
            $('.J_tourist_info:eq(' + i + ') .error-tips:eq(' + 4 + ')').hide()
        }
        //手机号码判断结束
    }
}
