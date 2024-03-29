    /**
 * Created by mrblack on 2016/12/27.
 */
;(function ($, template, Promise, win, doc, undefined){
  template.helper('testPrice', function(price) {
    if (parseInt(price) > 0) {
      return true;
    }else {
      return false;
    }
  });

  var getBt = function(str){
      var char = str.match(/[^\x00-\xff]/ig);
      return str.length + (char == null ? 0 : char.length);
  }

  template.helper('getFullTitle', function(titles) {
    var fullTitle = '';
    for (var i = 0; i<titles.length; i++) {
      fullTitle += titles[i];
    }
    return fullTitle;
  })

  template.helper('titleEdit', function(title, len) {
    if (getBt(title) >= len) {
      for (var i = 0; i <= title.length; i++) {
        if (getBt(title.slice(0, i)) >= len) {
          return title.slice(0, i) + '...';
        }
      }   
    }else {
      return title;
    }
  });
    template.helper('testOrderType', function(type) {
        if (parseInt(type) > 0 && ~[1,2,66,52,74,88,62,51,52,53,11,89,90].indexOf(type)) {
            return true;
        } else {
            return false;
        }
    });

    template.helper('getPrdLink', function(type, productId) {
        return type == 51 ? 'http://www.tuniu.com/visa/visa_' + productId : 'http://www.tuniu.com/tour/' + productId;
    });
  //获取cookie
  var getCookie = function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  }

  //list tab切换
  $(".list-header li").live("click", function () {
    var name = $(this).attr("name");
    $(this).addClass("focus").siblings().removeClass("focus");
    $("#"+name).removeClass("hide").siblings("div").addClass("hide");
  });

  //会员推荐切换
  $(".recommend-point li").live("click", function () {
    var index = $(this).index(),
        recommend = index == 0 ? "first" : "second";
    $(this).addClass("focus").siblings().removeClass("focus");
    $(".recommend."+recommend).animate({"right": 0}).siblings(".recommend").css({"right": "-100%"});
  });

  var t;
  var change = function() {
    t = setInterval(function() {
       var index = $('.recommend-point .focus').index(),
          recommend = index == 0 ? "second" : "first";
      $('.recommend-point .focus').removeClass("focus").siblings().addClass("focus");
      $(".recommend."+recommend).animate({"right": 0}).siblings(".recommend").css({"right": "-100%"});
    }, 4000);
  }

  $('#right-top').hover(
    function() {
      clearInterval(t);
    },
    function() {
      change();
    }
  );

  //我的收藏切换
  $("#right-bottom-tab li").live("click", function () {
    if(!$(this).hasClass("focus")) {
      $(this).addClass("focus").siblings().removeClass("focus");
    }
    if($(this).index() == 0) {
      $("#collection-list").removeClass("hide");
      $("#histroy-list").addClass("hide");
    }else {
      $("#collection-list").addClass("hide");
      $("#histroy-list").removeClass("hide");
    }
  })

  $('.close').live('click', function() {
    $('#overlay').addClass('hide');
  })

  $('.btn').live('click', function() {
    $('#overlay').addClass('hide');
  })

  var API = {
    get: function(url, fn, data, $el) {
      $.ajax({
        url: url,
        data: data ? data : [],
        dataType: 'json',
        cache:false,
        beforeSend: function() {
          if($el) {
            $el.find('.loading').removeClass('hide');
          }
        },
        complete: function() {
          if($el) {
            $el.find('.loading').addClass('hide');
          }
        },
        success: function(data) {
          fn(data);
        },
        error: function(err) {
          //console.log(err.msg);
        }
      })
    }
  }

  var orderApi = {
    delOrder: function(orderId, fn) {
      $.ajax({
        url: '/usercenter/usercommonajax/japi/delOrder',
        dataType: 'json',
                  cache:false,
        data: {
          "serviceName": "MOB.MEMBER.InnerOrderController.delOrder",
          "serviceParamsJson": JSON.stringify({
            "orderId": orderId
          })
        },
        success: function(data) {
          fn(data);
        },
        error: function(err) {

        }
      })
    },

    getOrderList: function(dataList, $el, fn) {
      $.ajax({
        url: '/usercenter/usercommonajax/japi/getOrderList', 
        dataType: 'json',
        cache:false,
        data: {
          "serviceName": "MOB.MEMBER.InnerOrderController.getOrderList",
          "serviceParamsJson": JSON.stringify(dataList)
        },
        async: false,
        beforeSend: function() {
          if($el) {
            $el.find('.loading').removeClass('hide');
          }
        },
        complete: function() {
          if($el) {
            $el.find('.loading').addClass('hide');
          }
        },
        success: function(data) {
          fn(data);
        },
        error: function(err) {

        }
      })
    },

    getBtn: function(orderIdList, fn) {
      $.ajax({
        url: '/usercenter/usercommonajax/japi/getButtonList', 
        dataType: 'json',
                  cache:false,
        async: false,
        data: {
          "serviceName": "MOB.MEMBER.InnerOrderController.getButtonList",
          "serviceParamsJson": JSON.stringify(orderIdList)
        },
        success: function(data) {
          fn(data);
        },
        error: function(err) {

        }
      })
    }
  }

  var main = {
    init: function() {
      change();
      $.ajax({
        url: '//m.tuniu.com/event/NewMemberCoupon/CheckUserPrize',
        dataType: 'jsonp',
        success: function(data) {
          if(data.errorCode == 710008) {
            $('#box-left').removeClass('hide');
          }
        },
        error: function(err) {
          //console.log(err.msg);
          console.log(err.msg);
        }
      })
      var $main = this;
      //获取账户详情
      $main.getUserInfo();

      //获取收藏列表
      $main.getCollectionList();

      //猜你喜欢
      //$main.guessLike();

      //我的收藏
      $main.getAllOrder($main);
      $main.getOrderNum();

      template.helper('price', function(priceNum) {
        return priceNum.slice(1);
      });

      template.helper('btnText', function(text) {
        //return text.replace(/[^\u4e00-\u9fa5]/gi,"") == '' ? 'none' : text.replace(/[^\u4e00-\u9fa5]/gi,"");
        return text.slice(3);
      })

      template.helper('credits', function(credit) {
        if(credit > 9999) {
          return (credit+'').slice(0,2)+'...';
        }else {
          return credit;
        }
      });

      template.helper('numCheck', function(num) {
        if(!isNaN(num) && num != "") {
          return true;
        }else {
          return false;
        }
      });

      template.helper('priceChange', function(price) {
        if(price == '' && price.length < 1) {
          return '以实价为准';
        }else {
          return price;
        }
      });

      $('.list-header li').click(function() {
        var $el = $(this),
          index = $el.index();
        switch(index) {
          case 0:
            $main.getAllOrder($main);
            break;
          case 1:
            $main.getPayOrder($main);
            break;
          case 2:
            $main.getGoOrder($main);
            break;
          default: 
            $main.getCommandOrder($main);
            break;
        }

      });

      //浏览历史
      //console.log(getCookie('visit_history'));

      //删除收藏/浏览历史
      var $del;
    $('.del').live('click', function() {
      $del = $(this);
      $('#overlay').removeClass('hide');
    });
    $('#sure').click(function() {
      $main.delCollection($del);
    });
    },

    delCollection: function($el) {
      var col_item = $el.parents("li"),
      col_id = parseInt(col_item.attr("id")),
      col_type = parseInt(col_item.attr("name"));
      API.get("//i.tuniu.com/usercenter/userfocusajax/delFocus", function(data) {
      if (data.success) {
        col_item.remove();
        $.ajax({
          url: '//i.tuniu.com/usercenter/userfocusajax/getFocusList',
          data: {
            'time': Date.parse(new Date()),
            'page': 1,
            'routeType': 0
          },
          dataType: 'json',
          cache:false,
          async: false,
          beforeSend: function() {
            $('#collection-list').find('.loading').removeClass('hide');
          },
          complete: function() {
            $('#collection-list').find('.loading').addClass('hide');
          },
          success: function(data) {
            if(data.success) {
              $('#no-col').addClass('hide').siblings('#col-content').removeClass('hide');
              $('#col-content>div').removeClass('hide');
            var html = template('user-collection', data.data);
            $('#col-content').html(html); 
            }else {
              $('#no-col').removeClass('hide').siblings('#col-content').addClass('hide');
            }
          },
          error: function(err) {
            //console.log(err.msg);
          }
        })
      }else {
        
      }
    }, {
      routeId: col_id,
      route_type: col_type
    });
    },
    //会员头部信息展示
    getUserInfo: function () {
        var japiUrl = "/usercenter/usercommonajax/japi";

        var ajaxParams = {
          "serviceName": "MOB.MEMBERS.InnerController.userInfo",
        };
        $.post(japiUrl,ajaxParams,function(res){
          if(res.data.data){
            var data = res.data.data
            var html = template('user-info-cont', data);
            $('#user-info').html(html);
            API.get("//i.tuniu.com/usercenter/usercenter/userPromotionInfo", function(res) {
              if(res.success) {
                var html = template('user-count', res.data);
                $('.header-right').empty().html(html);
              }
              if(!data.isAdmin){
                $(".cmp-hide-cont").removeClass('hide')
              }
            });
          }
        },"json");
    },

    getCollectionList: function() {
      API.get("//i.tuniu.com/usercenter/userfocusajax/getFocusList", function(data) {
        if(data.success) {
          $('#no-col').addClass('hide').siblings('#col-content').removeClass('hide');
        var html = template('user-collection', data.data);
        $('#col-content').html(html); 
        }else {
          $('#no-col').removeClass('hide').siblings('#col-content').addClass('hide');
        }
      },{
        'time': Date.parse(new Date()),
        'page': 1,
        'routeType': 0
      },$('#collection-list'));
    },

    guessLike: function() {
      /*
      API.get("//i.tuniu.com/usercenter/usercenter/adsGuesscms", function(data) {
        if(data.success) {
          var html = template('user-guess', {guess: data.data[0].gItems[0].mItems});
          $('#guess-list').html(html);
        }else {
         
        }
      }, {}, $('#guess'));
      */
      $('#guess').html('').CrossRecommend();
    },

    getOrder: function(status, el) {
      $('.list-footer').addClass('hide');
      $('#no-'+el).addClass('hide');
      $('#record-list').css('min-height', 'auto');
      API.get("/usercenter/usercommonajax/japi/getRecommendOrder", function(data) {
        if(data.success && data.data.data && data.data.data.length > 0) {
          $('.order-list li').removeClass('hide');
          var html = template(el+'-list', {list: data.data.data});
          $('#'+el+' ul').html(html);
          $('.order-opr-btn + p').addClass('order-opr-btn list-content-right-last');
          $('#guess').html('').CrossRecommend();
          $('.item-operate .btn:not(".del-order")').hover(function() {
            $(this).toggleClass('orange');
          })
        }else {
          $('.list-header li').text('我的订单');
          orderApi.getOrderList({"type":0,"page":1,"status":0,"size":5}, $('#'+el), function(data) {
            if (data.success && data.data.data.orderList && data.data.data.orderList.length > 0) {
                $('.order-list li').removeClass('hide');
                var orderList = data.data.data.orderList || [],
                    orderIdList = [];
                for (var i = 0;i<orderList.length;i++) {
                  orderIdList.push({
                    'orderId': orderList[i].orderId,
                    'productId': 1,
                    'orderType': 1
                  });
                  orderList[i].btnList = orderList[i].btnList ? orderList[i].btnList : [];
                  orderList[i].btnList.sort(function(a, b) {
                    return a.weight - b.weight;
                  }).reverse();
                }
                orderApi.getBtn({orderIdList:orderIdList}, function(data) {
                  if(data.success) {
                    var btnData = data.data.data || [];
                    for(var i = 0;i<btnData.length;i++) {
                      for(var n = 0;n<orderList.length;n++) {
                        if(btnData[i].orderId == orderList[n].orderId) {
                          orderList[n].btnData = btnData[i];
                        }
                      }
                    }
                    var html = template('my-order', {list: orderList});
                    $('#'+el+' ul').html(html);
                    $('.item-operate .btn:not(".del-order")').hover(function() {
                      $(this).toggleClass('orange');
                    })
                  }else {
                    layer.alert(data.msg);
                  }
                });
                for (var i = 0;i<orderList.length;i++) {
                  orderList[i].btnList.sort(function(a, b) {
                    return a.weight - b.weight;
                  }).reverse();
                }
                $('.del-order').on('click', function() {
                  var $this = $(this),
                      orderId = $this.attr('data');
                      layer.confirm("订单删除后不可还原，订单信息将无法查询，确定删除？", function(index){
                      orderApi.delOrder(orderId, function(data) {
                      if (data.success) {
                        layer.alert("删除成功！");
                        setTimeout(function() {
                          location.reload();
                        }, 500)
                      }else {
                        layer.alert("删除失败！");
                      }
                    });
                  }, function (index) {
                  }); 
                });
                $('#guess').html('').CrossRecommend();
              }else {
                $('#no-'+el).removeClass('hide');
                $('#record-list').css('min-height', '360px');
                $('#guess').html('').CrossRecommend();
              }
          })
        }
      }, {
        "serviceName": "MOB.MEMBER.InnerOrderController.getRecommendOrder"
      }, $('#'+el));
    },

    getAllOrder: function($el) {
      $el.getOrder(0, 'order-all');
    },

    getPayOrder: function($el) {
      $el.getOrder(1, 'order-pay');
    },

    getGoOrder: function($el) {
      $el.getOrder(3, 'order-go');
    },

    getCommandOrder: function($el) {
      $el.getOrder(2, 'order-command');
    },

    getOrderNum: function() {
      API.get('/usercenter/usercommonajax/japi/members/user/order/getStatusCnt', function(data) {
        if(data.success) {
          var orderNum = data.data.data,
            cntCanPay = orderNum.toPay,
            cntCanComment = orderNum.toComment,
            cntToTravel = orderNum.toTravel;
          $('.list-header li:eq(1)').find('span').text(cntCanPay);
          $('.list-header li:eq(2)').find('span').text(cntToTravel);
          $('.list-header li:eq(3)').find('span').text(cntCanComment);
        }else {
          
        }
      }, {
        "serviceName": "MOB.MEMBER.InnerOrderController.getStatusCnt"
      })
    }
  }.init();
})(jQuery, template, Promise, window, document);