
(function(){
    $(function(){

        /**
         * 轮播图
         */
        $('#tn-slide').tn_slide({
            width: 920,
            height: 420,
            timeSpace: 4000
        });


        /**
         * 我的特权
         */
        var rights = $("#user_rights"),
            rightDesc = $("#user_right_desc"),
            rightsList = rights.find("i"),
            rightsNumber = rightsList.length, rightsIndex = 0,
            leftScroll = true, rightScroll = true;
        function checkState() {
            if (rightsIndex <= 0) {
                leftScroll = false;
                $("#user_right_btn_l").removeClass("user_right_btn_active");
            } else {
                leftScroll = true;
                $("#user_right_btn_l").addClass("user_right_btn_active");
            }
            if (rightsIndex * 3 + 3 >= rightsNumber) {
                rightScroll = false;
                $("#user_right_btn_r").removeClass("user_right_btn_active");
            } else {
                rightScroll = true;
                $("#user_right_btn_r").addClass("user_right_btn_active");
            }
        }

        function changeOne(dir) {
            rightsIndex += 1 * dir;
            checkState();
            rights.scrollLeft(Math.min(rightsIndex * 3, rightsNumber) * 53- (rightScroll ? 0 : (rightsIndex * 3 + 3 - rightsNumber) * 53));
        }

        checkState();
        $("#user_right_btn_l").click(function() {
            leftScroll && changeOne(-1);
        });
        $("#user_right_btn_r").click(function() {
            rightScroll && changeOne(1);
        });
        rightsList.each(function() {
            $(this).hover(function() {
                rightDesc.text($(this).attr("data-desc"));
            });
        });




        /**
         * [活动切换]
         * 
         */
        function tab(){
            $(".txt").mouseenter(function(){
                $(this).trigger('click');
            });

            $(".txt").click(function(){
                if($(".triangle")){
                    $(".triangle").remove();
                }
                $(this).append("<img src='//images.tuniucdn.com/img/201511121700/user_center_v2/triangle.png' class='triangle' alt='triangle'/>");
            });

            function bgChange(sel,activepic){
                $(sel).click(function(){
                    $('.active_pic').hide();
                    $(activepic).show();
                });   
            }

            bgChange('.txt_first','.active_pic1');
            bgChange('.txt_second','.active_pic2');
            bgChange('.txt_third','.active_pic3');

            $('.txt_first').trigger('click')
        }

        tab();
        withdraw.initPrdList();
    });

    
    /**
     * [windowResize]
     * @return {[type]} [description]
     */
    function windowResize(){
        $(window).resize(function(){
            var w = $(window).width();
            if( w >= 1200 ){
                if( !$('body').hasClass('index1200') ){
                    $('body').addClass('index1200');
                    $('body').removeClass('index1000');
                }
            }else{
                if( !$('body').hasClass('index1000') ){
                    $('body').addClass('index1000');
                    $('body').removeClass('index1200');
                }
            }
        });
    }
    
    windowResize();
    $(window).resize();

    /*
     * 新版会员俱乐部特惠商品
     */
    var withdraw = withdraw || {};
    $.extend(withdraw, {
        initPrdList: function (cityCode) {
            var cityCode = cityCode || 200;
            this.getData(cityCode);
        },
        changeCity:function(cityCode){
            this.initPrdList(cityCode);
        },
        getData:function(cityCode){
            var url = '/club/getAllPrd';
            var cityCode = cityCode;
            $.get(url,{cityCode:cityCode},function(res){
                var withdraw_content = template('withdraw_product', res);
                $('.memOnly').html(withdraw_content);
                //$('.thr_trav').css({'*height': '62px'});
                $('.select_city').bind('change',function(){
                    var code = $(this).val();
                    withdraw.changeCity(code);
                });
            },"json")
        }
    })
})();

    var utils = {
        getNextMonth:function(){
            var time = new Date();
            var day = time.getDate();
            var month = time.getMonth();
            var year = time.getFullYear();
            if(day>15){
                if(month>10){
                    $('.showTime').html((year+1)+'年1月15日');
                    $('.memDay').html((year+1)+'年1月16日');
                    $('.beginTime').html((year)+'年12月16日');
                }else{
                    $('.showTime').html(year+'年'+(month+2)+'月15日');
                    $('.memDay').html(year+'年'+(month+2)+'月16日');
                    $('.beginTime').html(year+'年'+(month+1)+'月16日');
                }
            }else{
                if(month==0){
                    $('.showTime').html(year+'年'+(month+1)+'月15日');
                    $('.memDay').html(year+'年'+(month+1)+'月16日');
                    $('.beginTime').html((year-1)+'年12月16日');
                }else{
                    $('.showTime').html(year+'年'+(month+1)+'月15日');
                    $('.memDay').html(year+'年'+(month+1)+'月16日');
                    $('.beginTime').html(year+'年'+(month)+'月16日');

                }

            }
        }
    };
/*
 * PC版签到
 */
({
    init:function(){
        this.$btn = $('.sign-button');
        /**************露出的话把下面的注释给去掉******************/
        this.getRightType();
        /*****************************************************/
        this.fetchData();
        this.click();
    },
    fetchData:function(){
        var self = this;
        $.ajax({
            url: '/clubajax/showStatus',
            dataType: 'json',
            cache: false,
            success: function (res) {
               self.showStatus(res);
            }
        });
    },
    showStatus:function(res){
        var self = this;
        if(!res.success){
            self.isSign = 2;
            var str = [
                '<p class="beforeSign g_point">',
                '<span>签到越多，奖励越多</span>',
                '</p>'
            ];
            $('.showStatus').html(str.join(''));
            $('.an_mo_sign').attr('liWithHan','user_sign_unlogin');
            self.showRule();
        }else{
            self.isSign = res.isSign;
            self.regionTotalDays = res.regionTotalDays;
            if(self.isSign && res.regionTotalDays){
                var msg = '本月累计签到'+res.regionTotalDays+'天';
                self.$btn.html(msg);
                var str = [
                    '<p class="club-sign-p2">'
                ];
                var get = [];
                if(res.giftName){
                    //get.push('牛大头+'+res.niuNum+',<br/>');
                    get.push('恭喜你获得'+res.giftName+'！<br/>');
                }
                //get.push('共有旅游券面额￥'+self.signDaysOfMonth+'，记得<span class="showTime"></span><br/>来途牛旅游APP兑换哦!</p>');
                get.push('优惠券仅客户端查看并使用！</p>');
                str.push(get.join(''));
                $('.showStatus').html(str.join(''));
                utils.getNextMonth();
            }else{
                var str = [
                    '<p class="beforeSign g_point">',
                    '<span>签到越多，奖励越多</span>',
                    '</p>'
                ];
                $('.showStatus').html(str.join(''));
                self.showRule();

            }
        }

    },
    click:function(){
        var self = this;
        self.$btn.bind('click',function(){
            self.sign();
        })

    },
    sign:function(){
        var self = this;
        if(self.isSign==1){
            return false;
        }else if(self.isSign==2){
            window.location.href = '/club/passport';
            return false;
        }
        $.ajax({
            url: '/clubajax/sign',
            dataType: 'json',
            cache: false,
            success: function (res) {
                if(res){
                    self.showGet(res);
                    self.isSign = 1;
                }else{
                    layer.alert('已签到');
                }

            }
        });
    },
    showGet:function(res){
        var self = this;
        if(res){
            var str = [
                '<p class="club-sign-p2">'
            ];
            var get = [];
            if(res.giftName){
                //get.push('牛大头+'+res.niuNum+',<br/>');
                get.push('恭喜你获得'+res.giftName+'！<br/>');
            }
            //if(res.coinNum){
                //get.push('夺宝币+'+res.coinNum+',');
            //}
            //get.push('旅游券+1<br/>');
            get.push('优惠券仅客户端查看并使用！</p>');
            str.push(get.join(''));
            $('.showStatus').html(str.join(''));
            utils.getNextMonth();
            var msg = '本月累计签到'+(self.regionTotalDays+1)+'天';
            self.$btn.html(msg);
        }

    },
    showRule:function(){
        $('.beforeSign').click(function(){
            var pagei = $.layer({
                type: 1,   //0-4的选择,
                title: false,
                border: [0],
                closeBtn: [0],
                shadeClose: true,
                area: ['460px', '280px'],
                page: {
                    html: "<div class='alert_box'><div class='info_box'><h1>签到领礼包</h1><div class='alert_para'><h2>活动规则</h2><p><span>1.坚持每天签到，领取对应礼包；</span><span>2.礼包仅限当天领取；</span><span>3.若中途中断，按照累计天数领取对应礼包；</span><span>（例如，累签3天后，若第4天中断，第5天签到后，可领取4天礼包）</span></p></div><button>朕知道了</button></div></div>"//此处放了防止html被解析，用了\转义，实际使用时可去掉
                },
                success:function(){
                    utils.getNextMonth();
                    $('.alert_box button').click(function(){
                        $('.xubox_shade,.alert_box,.xubox_main').hide();
                    })
                }
            });
        });
    },
    //礼包页面入口
    getRightType: function(){
        $.ajax({
            url: '/usercenter/userclubajax/getRightType',
            dataType: 'json',
            cache: false,
            success: function (res) {
                var str = '';
                if(res.length){
                    $.each(res,function(key,val){
                        if(val=="RES_WIFI"){
                            str = str + '<a href="/club/mygift" class="user_gift_wifi"  title="Wifi礼包"></a>';
                        }else if(val=="RES_VOUCHER"){
                            str = str + '<a href="/club/mygift" class="user_gift_birthday"  title="生日礼包"></a>';
                        } else if (val=="RES_HEALTH") {
                            str = str + '<a href="/club/mygift" class="user_gift_health"  title="健康礼包"></a>';
                        }else if(val == "RES_VIP_ROOM"){
                            str = str + '<a href="/club/mygift" class="user_gift_VIP"  title="贵宾室礼包"></a>';
                        }
                    });
                }else{
                    str = '<div class="no-right">好礼不在，尚需等待</div>';
                }

                $(".user_gifts_inner").html(str);
                /**
                 * 我的礼包
                 */
                var gifts = $("#user_gifts"),
                    giftDesc = $("#user_gift_desc"),
                    giftsList = gifts.children(".user_gifts_inner").find("a"),
                    giftsNumber = giftsList.length, giftsIndex = 0,
                    leftScroll1 = true, rightScroll1 = true;
                function checkState1() {
                    if (giftsIndex <= 0) {
                        leftScroll1 = false;
                        $("#user_gift_btn_l").removeClass("user_gift_btn_active");
                    } else {
                        leftScroll1 = true;
                        $("#user_gift_btn_l").addClass("user_gift_btn_active");
                    }
                    if (giftsIndex * 3 + 3 >= giftsNumber) {
                        rightScroll1 = false;
                        $("#user_gift_btn_r").removeClass("user_gift_btn_active");
                    } else {
                        rightScroll1 = true;
                        $("#user_gift_btn_r").addClass("user_gift_btn_active");
                    }
                }

                function changeOne1(dir) {
                    giftsIndex += 1 * dir;
                    checkState1();
                    var dis = Math.min(giftsIndex * 3, giftsNumber) * 53- (rightScroll1 ? 0 : (giftsIndex * 3 + 3 - giftsNumber) * 53);
                    gifts.scrollLeft(dis);
                }

                checkState1();
                $("#user_gift_btn_l").click(function() {
                    leftScroll1 && changeOne1(-1);
                });
                $("#user_gift_btn_r").click(function() {
                    rightScroll1 && changeOne1(1);
                });
                giftsList.each(function() {
                    $(this).hover(function() {
                        rightDesc.text($(this).attr("data-desc"));
                    });
                });
            }
        });
    },
}).init();






