$('.tab-title').on('mouseenter', function () {
    var block = $(this).parents('.block'),
        i = $(this).index(),
        color = block.find('.tab-normal').attr('no-select-color'),
        bg = block.find('.tab-normal').attr('no-select-bg'),
        sColor = block.find('.tab-normal').attr('select-color'),
        sBg = block.find('.tab-normal').attr('select-bg');
    block.find('.tab-title').css({'color': color, 'background': bg});
    block.find('.tab-selected').css('opacity', '0');
    $(this).css({'color': sColor, 'background': sBg});
    $(this).find('.tab-selected').css('opacity', '1');
    block.find('.floor-block').addClass('hide');
    block.find('.floor-' + i).removeClass('hide');
});
$('.pic-title').on('mouseenter', function () {
    var block = $(this).parents('.block'),
        i = $(this).index();
    block.find('.pic-title').each(function () {
        $(this).attr('src', $(this).attr('no-select'));
    });
    $(this).attr('src', $(this).attr('select'));
    block.find('.floor-block').addClass('hide');
    block.find('.floor-' + i).removeClass('hide');
});
if ($('.cityPosition').length > 0) {
    $('.moreCity').on('click', function () {
        $('.moreCityList').fadeToggle();
    });
    var navTop = $('.cityPosition').offset().top;
    $(window).on('scroll.cityPosition', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > navTop) {
            $('.cityPosition').css({
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                'z-index': 999,
            });
        } else if (scrollTop <= navTop) {
            $('.cityPosition').css({
                position: 'static'
            });
        }
        ;
    });
}

function getCookie(key) {
    var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));
    if (arr !== null) {
        return (arr[2]);
    } else {
        return '';
    }
}

var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

var code = '';
// 选中当前城市
if (location.pathname.lastIndexOf('/') + 1 < location.pathname.length) {
    var cityCode = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.length);
    $('.cityPosition [href="' + cityCode + '"]').addClass('active');
    code = cityCode.substring(0, cityCode.lastIndexOf('.'))
} else {
    if (getCookie('tuniuuser_citycode')) {
        code = parseInt(base64decode(getCookie('tuniuuser_citycode')));
        if ($('.cityPosition [href="' + code + '.html"]').length > 0) {
            location.href = code + '.html' + location.search;
        } else {
            $.ajax({
                url: 'http://m.tuniu.com/event/mobileCms/GetProvinceCityCodeAjax',
                dataType: 'jsonp',
                method: 'GET',
                data: {
                    cityCode: code,
                },
                jsonp: 'callback',
                success: function (json) {
                    if (json.data.cityCode && $('.cityPosition [href="' + json.data.cityCode + '.html"]').length > 0) {
                        location.href = json.data.cityCode + '.html' + location.search;
                    } else {
                        $.ajax({
                            url: 'http://m.tuniu.com/event/mobileCms/GetNearCityCodeAjax',
                            dataType: 'jsonp',
                            method: 'GET',
                            data: {
                                cityCode: code,
                            },
                            jsonp: 'callback',
                            success: function (json) {
                                if (json.data.cityCode && $('.cityPosition [href="' + json.data.cityCode + '.html"]').length > 0) {
                                    location.href = json.data.cityCode + '.html' + location.search;
                                } else {
                                    if ($('.cityPosition a').length > 0) {
                                        location.href = $('.cityPosition a').eq(0).attr('href') + location.search;
                                    }
                                }
                            },
                        });
                    }
                },
            });

        }
    } else {
        if ($('.cityPosition a').length > 0) {
            location.href = $('.cityPosition a').eq(0).attr('href') + location.search;
        }
    }
}
if ($('.flight-card').length > 0) {
    $.ajax({
        url: 'http://m.tuniu.com/event/newCms/GetFlightDataHtmlAjax',
        dataType: 'jsonp',
        method: 'GET',
        data: {
            act_id: "2rv1rppg",
            city_code: code,
        },
        jsonp: 'callback',
        success: function (json) {
            for (var i = 0; i < json.data.result.length; i++) {
                var floor = json.data.result[i]
                for (id in floor) {
                    $('[name="floor-id-' + id + '"]').find('.flight-card').each(function (index) {
                        if (floor[id][index]) {
                            if (floor[id][index].promotionBeginAt) {
                                floor[id][index].beginDate = floor[id][index].promotionBeginAt.substring(5, 7) + '.' + floor[id][index].promotionBeginAt.substring(8, 10);
                                if (floor[id][index].promotionEndAt) {
                                    floor[id][index].endDate = floor[id][index].promotionEndAt.substring(5, 7) + '.' + floor[id][index].promotionEndAt.substring(8, 10);
                                }
                            } else if (floor[id][index].beginDate) {
                                floor[id][index].beginDate = floor[id][index].beginDate.substring(5, 7) + '.' + floor[id][index].beginDate.substring(8, 10);
                                if (floor[id][index].endDate) {
                                    floor[id][index].endDate = floor[id][index].endDate.substring(5, 7) + '.' + floor[id][index].endDate.substring(8, 10);
                                }
                            }
                            var line = floor[id][index]
                            $(this).find('[name="url"]').attr('href', line.jumpUrl);
                            if (line.imageUrl) {
                                $(this).find('[name="imageUrl"]').attr('style', 'background:url(' + line.imageUrl + ') center no-repeat;background-size:cover;');
                            }
                            if (line.url) {
                                $(this).find('[name="flight-img"]').attr('style', 'background:url(' + line.url + ') center no-repeat;background-size:cover;');
                                $(this).find('[name="imgUrl"]').attr('src', line.url);
                            }
                            $(this).find('[name="flightType"]').addClass('flightType-' + line.flightType);

                            for (key in line) {
                                if (key != 'url' && key != 'jumpUrl' && key != 'flightType' && key != 'imageUrl') {
                                    $(this).find('[name="' + key + '"]').html(line[key]);
                                }
                            }
                            if (line.flightType == 1) {
                                $(this).find('[name="returnTime"]').remove();
                            }
                            if (parseInt(line.flightSource) == 6) {
                                $(this).find('[name="url"]').attr({
                                    'href': 'javascript:void(0);',
                                    'data': '{"solutionId":' + line.solutionId + ',"systemId":52,"orgCityCode":' + line.orgCityCode + ',"dstCityCode":' + line.dstCityCode + ',"beginDate":"' + line.promotionBeginAt + '","endDate":"' + line.promotionEndAt + '","airCompany":"' + line.airCompanyCode + '","flightNo":"' + line.flightNo + '"}'
                                }).addClass('flight-jump');
                            }
                        }
                    });
                }
            }
            $('.flight-jump').on('click', function () {
                var dom = '<div class="air_calendar_wrap" style="width:542px;"></div>'
                $('.air_calendar').append(dom).removeClass('hide');
                var data = [];
                var calendar = $('.air_calendar_wrap');
                var searchData = JSON.parse($(this).attr('data'));
                $.ajax({
                    url: 'http://flight-api.tuniu.com//act/query/queryCalendarPrices',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: JSON.stringify(searchData),
                    success: function (res) {
                        if (res.success) {
                            for (var i = 0; i < res.data.length; i++) {
                                if (res.data[i].seatStatus && res.data[i].seatStatus !== '>9' || res.data[i].seatStatus && res.data[i].seatStatus !== 'A') {
                                    var moreSeat = res.data[i].seatStatus;
                                }
                                data.push({
                                    "date": res.data[i].departureDate,
                                    "price": res.data[i].price + '',
                                    "backDate": null,
                                    "flightNo": res.data[i].flightNo,
                                    "seatCode": res.data[i].seatCode,
                                    "id": i,
                                    "startDate": res.data[i].departureDate,
                                    "title": res.data[i].price + '',
                                    'Moreseat': moreSeat || ''
                                })
                            }
                        }
                        var currentDate = new Date();
                        var year = data[0].date.split('-')[0],
                            months = data[0].date.split('-')[1] - 1,
                            date = data[0].date.split('-')[2];
                        //实例化日历
                        calendar.fullCalendar({
                            header: {
                                left: 'prev',
                                center: 'title',
                                right: 'next'
                            },
                            year: year,
                            month: months,
                            hasPriceMonth: months,
                            date: date,
                            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                            dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                            editable: false,
                            events: data,
                            eventAfterRender: function (event, ele) {
                                if (event.price) {

                                    var day = event.startDate.split('-')[2];
                                    if (day[0] == 0) {
                                        day = day[1];
                                    }
                                    var obj = ele.find('.fc-event-title').parent().parent();
                                    var width = obj.width(),
                                        left = obj.css('left').split('px')[0];
                                    obj.css({'width': width + 4, 'left': left - 2});

                                    var dayObj = '<em style="left:-53px; top:-83px;position:relative;font-size:12px; color:#fff">' + day + '</em>';

                                    obj.addClass('hasPrice');
                                    obj.hover(function () {
                                        $(obj).find('em').remove();
                                        $(obj).append(dayObj);
                                    }, function () {
                                        $(obj).find('em').remove();
                                    });

                                    $(obj).find('em').remove();
                                    ele.find('.fc-event-title').html('<i>&yen;</i>' + event.price + '<span>起</span>');
                                    if (event.Moreseat) {
                                        if (event.Moreseat == 'A') {
                                            ele.find('.fc-event-title').after('<span class="Moreseat">充足</span>');
                                        } else {
                                            ele.find('.fc-event-title').after('<span class="Moreseat">余' + event.Moreseat + '</span>');
                                        }
                                    }

                                }
                                ele.click(function (e) {
                                    e.stopPropagation();
                                    var date = date2Str(event.start);
                                    window.open('http://www.tuniu.com/flight/yearsorder?orgCityCode=' + searchData.orgCityCode + '&dstCityCode=' + searchData.dstCityCode + '&departureDate=' + date + '&flightNo=' + event.flightNo + '&solutionId=' + searchData.solutionId + '&seatCode=' + event.seatCode);
                                    calendar.fullCalendar("unselect");
                                    calendar.fullCalendar("select", str2Date(date));
                                })
                            },
                        })
                        calendar.fullCalendar("select", currentDate);

                        function date2Str(date) {
                            return date.getFullYear() +
                                '-' +
                                justifyNum(date.getMonth() + 1) +
                                '-' +
                                justifyNum(date.getDate());
                        }

                        function str2Date(str) {
                            if (typeof str === 'string') {
                                return new Date(str.replace(/\-/g, '/'));
                            } else {
                                return str;
                            }
                        }

                        function justifyNum(num, digit) {
                            digit = digit || 2;
                            num = parseInt(num) + '';
                            while (num.length < digit) {
                                num = '0' + num;
                            }
                            return num;
                        }
                    },
                    error: function () {

                    }
                });
            });
            $('.air-calendar-mask').on('click', function () {
                $('.air_calendar_wrap').remove();
                $('.air_calendar').addClass('hide');
            });
        }
    });
}
if ($('.temai').length > 0) {
    $.ajax({
        url: 'http://m.tuniu.com/event/newCms/GetTemaiDataHtmlAjax',
        dataType: 'jsonp',
        method: 'GET',
        data: {
            act_id: "2rv1rppg",
            city_code: code,
        },
        jsonp: 'callback',
        success: function (json) {
            for (mi in json.data.result) {
                for (id in json.data.result[mi]) {
                    var floor = json.data.result[mi][id];
                    $('[name="floor-id-' + id + '"]').find('.temai-card').each(function (i) {
                        var url = $(this).closest('a').attr('href')
                        var pid = url.substr(24, url.length)
                        for (index in floor) {
                            if (floor[index].productId == pid) {
                                $(this).find('[name="quota"]').html(floor[index].quota);
                                $(this).find('[name="deposit"]').html(floor[index].campaign_deposit);
                                $(this).find('[name="discount"]').html(floor[index].discount);
                                $(this).find('[name="clicks"]').html(floor[index].clicks);
                                $(this).find('[name="stock"]').html(floor[index].stock);
                                $(this).find('[name="multiple-money"]').html(floor[index].multipleMoney);
                                // $(this).find('[name="sale-price"]').html(floor[index].salePrice);
                                $(this).find('[name="actual-money"]').html(floor[index].actualMoney);
                                $(this).find('[name="final-money"]').html(floor[index].finalMoney);
                                $(this).find('[name="start-time"]').attr('start-time', floor[index].campaign_begin_time);
                                $(this).find('[name="end-time"]').attr('end-time', floor[index].campaign_end_time);
                                // $(this).find('[name="adultPrice"]').html(floor[index].adultPrice);
                                $(this).find('[name="plandateScope"]').html(floor[index].plandateScope);
                                if (floor[index].is_sold_out) {
                                    $(this).find('[name="sold-out"]').removeClass('t-hide');
                                }
                            }
                        }
                    });
                }
            }
            ;
        }
    });
}
if ($('.independent-card').length > 0) {
    $.ajax({
        url: 'http://m.tuniu.com/event/MobileCms/GetFreeTourDataAjax',
        dataType: 'jsonp',
        method: 'GET',
        data: {
            act_id: "2rv1rppg",
            city_code: code,
        },
        jsonp: 'callback',
        success: function (json) {
            for (mi in json.data.result) {
                for (id in json.data.result[mi]) {
                    var floor = json.data.result[mi][id];
                    $('[name="floor-id-' + id + '"]').find('.independent-card').each(function (index) {
                        if (floor[index]) {
                            $(this).removeClass('hide');
                            for (key in floor[index]) {
                                if (key != 'pc_url' && key != 'img' && key != 'traffic_type') {
                                    $(this).find('[name="' + key + '"]').html(floor[index][key]);
                                }
                            }
                            $(this).find('[name="pc_url"]').attr('href', floor[index].pc_url);
                            $(this).find('[name="img"]').attr('src', floor[index].img);
                            $(this).find('[name="traffic_type"]').addClass('trafficType-' + floor[index].traffic_type);
                        }
                    });
                }
            }
            ;
        }
    });
}
if ($('.topic-sidebar-box').length > 0) {
    $('.topic-sidebar-box').css('margin-top', (-$('.topic-sidebar-box').height() / 2 + 'px'));
    $(function () {
        var app = {
            setScrollEvent: function () {
                $(window).on('scroll', function () {
                    var scrollTop;
                    if (navigator.userAgent.indexOf('Firefox') >= 0) {
                        scrollTop = document.documentElement.scrollTop;
                    } else if (navigator.userAgent.indexOf('IE') >= 0) {
                        scrollTop = document.documentElement.scrollTop;
                    } else {
                        scrollTop = $(document).scrollTop();    //$('body').scrollTop();
                    }
                    if (scrollTop > 600) {
                        $('.topic-sidebar-box').fadeIn();
                    } else {
                        $('.topic-sidebar-box').fadeOut();
                    }
                });
            },
            bindEvent: function () {
                $('.topic-sidebar-box').on('mouseenter', 'li.sidebar-item', function () {
                    $(this).find('.item-cur').css('opacity', '1').siblings().hide();
                });
                $('.topic-sidebar-box').on('mouseleave', 'li.sidebar-item', function () {
                    $(this).find('.item-cur').css('opacity', '0').siblings().show();
                });
            },
            init: function () {
                if ($('.topic-sidebar-box').hasClass('autoHide')) {
                    $('.autoHide').hide();
                    this.setScrollEvent();
                }
                this.bindEvent();
            }
        };
        app.init();
    });

    function mao(s, t) {
        var p = -50;
        if (t) {
            p = t;
        }
        $('html,body').stop().animate({scrollTop: $(s).offset().top + p}, 500);
    }
}
//解决banner图片浏览器缩小跑偏的问题
var src = $('.banner img').attr('src');
$('.banner').css('background', 'url(' + src + ') no-repeat top center');
$.fn.unveil = function (threshold, callback) {
    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina ? "data-src-retina" : "data-src",
        images = this,
        loaded;
    this.one("unveil", function () {
        var source = this.getAttribute(attrib);
        source = source || this.getAttribute("data-src");
        var srcImg = this.getAttribute('src');
        if (srcImg == source) return;
        if (source) {
            this.setAttribute("src", source);
            if (typeof callback === "function") callback.call(this);
        }
    });

    function unveil() {
        var inview = images.filter(function () {
            var $e = $(this);
            if ($e.is(":hidden")) return;

            var wt = $w.scrollTop(),
                wb = wt + $w.height(),
                et = $e.offset().top,
                eb = et + $e.height();

            return eb >= wt - th && et <= wb + th;
        });
        loaded = inview.trigger("unveil");
        images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil mousemove.unveil", unveil);
    unveil();
    return this;
};
$('img').unveil();
$('.pop-block').on('click', function () {
    $(this).parent().find('.pop-mask').removeClass('hide');
});
$('.pop-close').on('click', function () {
    $('.pop-mask').addClass('hide');
});
var Lottery = {
    url: {
        lotteryAndSendAjax: 'https://m.tuniu.com/event/lottery/opeLottery/lotteryAndSendAjax',
        getLoginInfoAjax: 'https://m.tuniu.com/event/geLottery/getLoginInfoAjax',
        getTelCodeAjax: 'https://m.tuniu.com/event/raffle/getTelCodeAjax',
        getStyleInfoAjax: 'https://m.tuniu.com/event/innerLink/getStyleInfoAjax'
    },
    init: function () {
        var self = this;
        self.initListener();
        if (parseInt($('#linkId').val())) {
            $.ajax({
                url: self.url.getStyleInfoAjax,
                dataType: 'jsonp',
                data: {
                    id: parseInt($('#linkId').val())
                },
                success: function (json) {
                    if (json && json.success && json.data && json.data.pc) {
                        var style = json.data.pc.style,
                            styleParse = JSON.parse(window.decodeURIComponent(atob(style)));
                        $('body').append(styleParse.demo);
                        $('head').append('<style>' + styleParse.css + '</style>');
                    }
                }
            });
        }
    },
    initListener: function () {
        var self = this;
        $('.lottery-pic').on('click', function () {
            var dom = $(this).parent();
            var data = {
                actId: dom.find('.lottery-mask').attr('lottery-id'),
                mark: dom.find('.lottery-mask').attr('lottery-mark'),
                tel: dom.find('.lottery-mobile').val(),
                checkCode: dom.find('.lottery-code').val(),
                sysType: 1,
                isJsonp: 1,
                type: 1,
                one: 1,
            };
            $.ajax({
                url: self.url.lotteryAndSendAjax,
                dataType: 'jsonp',
                data: data,
                success: function (json) {
                    self.lottery(json, dom);
                }
            });
        });
        $('.lottery-submit').on('click', function () {
            var dom = $(this).parents('.lottery-mask');
            var data = {
                actId: dom.attr('lottery-id'),
                mark: dom.attr('lottery-mark'),
                tel: dom.find('.lottery-tel').val(),
                checkCode: dom.find('.lottery-check-code').val(),
                sysType: 1,
                isJsonp: 1,
                type: 1,
                one: 1,
            };
            $.ajax({
                url: self.url.lotteryAndSendAjax,
                dataType: 'jsonp',
                data: data,
                success: function (json) {
                    self.lottery(json, dom);
                }
            });
        });
        $('.lottery-get-check').on('click', function () {
            var dom = $(this).parents('.lottery-mask');
            if (!$(this).hasClass('sending')) {
                var data = {
                    actId: dom.attr('lottery-id'),
                    mark: dom.attr('lottery-mark'),
                    tel: dom.find('.lottery-tel').val(),
                    isJsonp: 1
                }
                $.ajax({
                    url: self.url.getTelCodeAjax,
                    dataType: 'jsonp',
                    method: 'GET',
                    data: data,
                    success: function (json) {
                        if (json.errorCode == 710000) {
                            dom.find('.lottery-get-check').addClass('sending');
                            self.checkCodeCountdown(60, dom);
                        } else if (json.errorCode == 710002) {
                            self.chokeWarn('您每天最多只能获取三次验证码');
                        } else if (json.errorCode == 710004) {
                            self.chokeWarn('请输入有效的11位手机号');
                        } else {
                            self.chokeWarn('发生错误，请稍后再试');
                        }
                    }
                });
            }
        });
        $('.lottery-get-code').on('click', function () {
            var dom = $(this).parent();
            if (!$(this).hasClass('sending')) {
                var data = {
                    actId: dom.find('.lottery-mask').attr('lottery-id'),
                    mark: dom.find('.lottery-mask').attr('lottery-mark'),
                    tel: dom.find('.lottery-mobile').val(),
                    isJsonp: 1
                }
                $.ajax({
                    url: self.url.getTelCodeAjax,
                    dataType: 'jsonp',
                    method: 'GET',
                    data: data,
                    success: function (json) {
                        if (json.errorCode == 710000) {
                            dom.find('.lottery-get-code').addClass('sending').css('background', 'url(' + dom.find('.lottery-get-code').attr('active') + ') no-repeat');
                            self.checkCodeCountdown(60, dom);
                        } else if (json.errorCode == 710002) {
                            self.chokeWarn('您每天最多只能获取三次验证码');
                        } else if (json.errorCode == 710004) {
                            self.chokeWarn('请输入有效的11位手机号');
                        } else {
                            self.chokeWarn('发生错误，请稍后再试');
                        }
                    }
                });
            }
        });
        $('.lottery-close,.lottery-use').on('click', function () {
            $('.lottery-mask,.lottery-list,.lottery-error,.lottery-apply').addClass('hide');
        });
        $('.lottery-block').on('click', function () {
            var dom = $(this).parent();
            var data = {
                actId: dom.find('.lottery-mask').attr('lottery-id'),
                mark: dom.find('.lottery-mask').attr('lottery-mark'),
                sysType: 1,
                isJsonp: 1,
                type: 0,
                one: 1,
            };
            $.ajax({
                url: self.url.lotteryAndSendAjax,
                dataType: 'jsonp',
                data: data,
                success: function (json) {
                    if (json.errorCode == 710002) {
                        dom.find('.lottery-mask,.lottery-apply').removeClass('hide');
                    } else {
                        self.lottery(json, dom);
                    }
                }
            });
        });
    },
    lottery: function (json, dom) {
        var self = this;
        if (json.errorCode == 710000 && json.data.status == 1) {
            var list = json.data.prizeInfo.package, html = '';

            for (var i = 0; i < list.length; i++) {
                html += '<div class="lottery-item">\
                            <div class="lottery-price-name">¥<span>' + list[i].amount + '</span></div>\
                            <div class="lottery-detail">' + list[i].name + '</div>\
                        </div>';
            }
            dom.find('.lottery-content').html(html);
            dom.find('.lottery-title').html('领取成功!');
            dom.find('.lottery-mask,.lottery-list').removeClass('hide');
            if (list.length == 1) {
                $('.lottery-item').css('margin-top', '60px');
            }
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710008) {
            var list = json.data.prizeInfo.package, html = '';
            for (var i = 0; i < list.length; i++) {
                html += '<div class="lottery-item">\
                            <div class="lottery-price-name">¥<span>' + list[i].amount + '</span></div>\
                            <div class="lottery-detail">' + list[i].name + '</div>\
                        </div>';
            }
            dom.find('.lottery-content').html(html);
            dom.find('.lottery-title').html('已领取');
            dom.find('.lottery-mask,.lottery-list').removeClass('hide');
            if (list.length == 1) {
                $('.lottery-item').css('margin-top', '60px');
            }
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710001) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('参数错误喽~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710002) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('要先登录哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710003) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('活动结束啦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710004) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('抽奖机会用完啦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710005) {
            self.chokeWarn('请输入正确的验证码');
        } else if (json.errorCode == 710006) {
            self.chokeWarn('验证码已过期');
        } else if (json.errorCode == 710007) {
            self.chokeWarn('请输入正确的手机号');
        } else if (json.errorCode == 710012) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('新用户才能领取哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710013) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('注册用户才能领取哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710014) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('星级会员才能领取哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710015) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('非星级会员才能领取哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710009) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('操作失败了哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710011) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('活动还未开始哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710099) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('网络异常啦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710016) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('抱歉，未中奖哦~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else if (json.errorCode == 710025) {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('请勿频繁操作~');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        } else {
            dom.find('.lottery-title').html('领取失败');
            dom.find('.lottery-error').find('span').html('发生错误，请稍后再试');
            dom.find('.lottery-mask,.lottery-error').removeClass('hide');
            $('.lottery-apply').addClass('hide');
        }
    },
    checkCodeCountdown: function (t, dom) {
        var self = this;
        if (t > 0) {
            t--;
            dom.find('.lottery-get-code,.lottery-get-check').html(t + 's');
            setTimeout(function () {
                self.checkCodeCountdown(t, dom);
            }, 1000);
        } else {
            dom.find('.lottery-get-code,.lottery-get-check').html('');
            dom.find('.lottery-get-check').removeClass('sending');
            dom.find('.lottery-get-code').removeClass('sending').css('background', 'url(' + dom.find('.lottery-get-code').attr('normal') + ') no-repeat');
        }
    },
    chokeWarn: function (str) {
        $('.code-warn').html(str).css('display', 'block').addClass('bounceIn');
        setTimeout(function () {
            $('.code-warn').css('display', 'none').removeClass('bounceIn');
        }, 2000);
    },
};
Lottery.init();
$('.slider').each(function () {
    var id = $(this).attr('id'),
        dir = $(this).attr('dir'),
        active = 0,
        as = $('.pagenavi-' + id).find('a');
    var ts = new TouchSlider({
        id: id,
        speed: 600,
        timeout: 3000,
        direction: dir,
        before: function (index) {
            as.get(active).className = '';
            active = index;
            as.get(active).className = 'active';
        }
    });
    as.on('click', function () {
        ts.slide($(this).index(), 600);
    })
});
function taHeaderFunc(content) {
    var tuniuTracker = _tat.getTracker();
    tuniuTracker.setPageName(content);
    tuniuTracker.addOrganic("www.so.com", "u");
    tuniuTracker.addOrganic("www.so.com", "q");
    tuniuTracker.addOrganic("so.360.cn", "u");
    tuniuTracker.addOrganic("so.360.cn", "q");
    tuniuTracker.addOrganic("baidu.com", "w");
    tuniuTracker.addOrganic("baidu.com", "q1");
    tuniuTracker.addOrganic("baidu.com", "q2");
    tuniuTracker.addOrganic("baidu.com", "q3");
    tuniuTracker.addOrganic("baidu.com", "q4");
    tuniuTracker.addOrganic("baidu.com", "q5");
    tuniuTracker.addOrganic("baidu.com", "q6");
    tuniuTracker.addOrganic("m.so.com", "q");
    tuniuTracker.addOrganic("m.sogou.com", "keyword");
    tuniuTracker.addOrganic("wap.sogou.com", "keyword");
    tuniuTracker.addOrganic("wap.soso.com", "key");
    tuniuTracker.addOrganic("m.yisou.com", "q");
    tuniuTracker.addOrganic("m.sm.cn", "q");
    tuniuTracker.addOrganic("sm.cn", "q");
    tuniuTracker.trackPageView();
    tuniuTracker.enableLinkTracking();
}

var _gaq = _gaq || [];

function gaHeaderFunc(content) {
    _gaq.push(["_setAllowHash", false]);
    _gaq.push(["_setAllowAnchor", true]);
    _gaq.push(["_addOrganic", "baidu", "wd"]);
    _gaq.push(["_addOrganic", "baidu", "word"]);
    _gaq.push(["_addOrganic", "google", "q"]);
    _gaq.push(["_addOrganic", "118114", "kw"]);
    _gaq.push(["_addOrganic", "bing", "q"]);
    _gaq.push(["_addOrganic", "soso", "w"]);
    _gaq.push(["_addOrganic", "youdao", "q"]);
    _gaq.push(["_addOrganic", "sogou", "query"]);
    _gaq.push(["_addOrganic", "360", "q"]);
    _gaq.push(["_addOrganic", "baidu", "w"]);
    _gaq.push(["_addOrganic", "baidu", "q1"]);
    _gaq.push(["_addOrganic", "baidu", "q2"]);
    _gaq.push(["_addOrganic", "baidu", "q3"]);
    _gaq.push(["_addOrganic", "baidu", "q4"]);
    _gaq.push(["_addOrganic", "baidu", "q5"]);
    _gaq.push(["_addOrganic", "baidu", "q6"]);
    _gaq.push(["_addOrganic", "baidu", "q6"]);
    _gaq.push(["_addOrganic", "m.so.com", "q"]);
    _gaq.push(["_addOrganic", "m.sogou.com", "keyword"]);
    _gaq.push(["_addOrganic", "wap.sogou.com", "keyword"]);
    _gaq.push(["_addOrganic", "wap.soso.com", "key"]);
    _gaq.push(["_addOrganic", "m.yisou.com", "q"]);
    _gaq.push(["_addOrganic", "m.sm.cn", "q"]);
    _gaq.push(["_addOrganic", "sm.cn", "q"]);
    _gaq.push(["_setDomainName", "tuniu.com"]);
    _gaq.push(["_setAccount", "UA-4782081-5"]);
    _gaq.push(["_trackPageview", content]);
}

function setGaTaForStaticPage(name, label) {
    var taName = 'PC:活动页:活动名称=' + name + ':活动标签=' + label;
    var gaName = '/PC/活动页/' + name;

    taHeaderFunc(taName);
    gaHeaderFunc(gaName);
}