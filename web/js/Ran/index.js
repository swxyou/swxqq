//轮播图1
var iNow = 0;
var imgLen = $('#skicontent-box img').length;
$('#ski-container .pre-btn').click(function(){
    iNow = (iNow > 0) ? (--iNow) : (imgLen - 1);
    changeTo(iNow);
    changeImg(iNow)
    // $("#skicontent-box img").eq(iNow+1).fadeIn(200).siblings("img").fadeOut(200);
})
$("#ski-container .next-btn").click(function(){ 
    iNow = (iNow < imgLen - 1) ? (++iNow) : 0;
    changeTo(iNow);
    changeImg(iNow)
    // $("#skicontent-box img").eq(iNow+1).fadeIn(200).siblings("img").fadeOut(200);
});
function changeTo(idx){
    $("#skicontent-box").find("img").removeClass("selected").eq(idx).addClass("selected");  
}
function changeImg(idx){
    $("#skiimg-box").find("img").removeClass("selected").eq(idx).addClass("selected");  
}
//轮播图2
var icount = 0;
var snowLen = $('#snowcontent-box img').length;
$('.snow-container .snow-pre-btn').click(function(){
    icount = (icount > 0) ? (--icount) : (snowLen - 1);
    changeTo2(icount);
    changeImg2(icount)
})
$(".snow-container .snow-next-btn").click(function(){ 
    icount = (icount < snowLen - 1) ? (++icount) : 0;
    changeTo2(icount);
    changeImg2(icount)
});
function changeTo2(idx){
    $("#snowcontent-box").find("img").removeClass("selected").eq(idx).addClass("selected");  
}
function changeImg2(idx){
    $("#snowimg-box").find("img").removeClass("selected").eq(idx).addClass("selected");  
}
//
var windowWidth = $(window).width();
var windowHeight = $(window).height();
if(windowWidth < 1440){
    $('.wrapper').width(990);
}else{
    $('.wrapper').width(1200);
}
if($('.wrapper').width()==1200){
    $('#skicontent-box').css('margin-bottom','130px');
    $('#ski-container .btn').css('top','100%');
}
$('.logo img').css('right',(windowWidth-$('.wrapper').width())/2);
$('#snowimg-box').css('margin-left',((windowWidth-$('.wrapper').width())/2));
// $('#strategy').css('margin-right',(windowWidth-$('.wrapper').width())/2);

$('.blockfirst').css('height',windowHeight);
$('.backfirst').css('background-size','100% '+windowHeight+'px');
$('.blocklast').css('background-size','100% '+windowHeight+'px')

//滚动事件
$(window).scroll(function(){
    if($(this).scrollTop()> $('.backfirst').offset().top ){
        $('.backfirst').css({'background-attachment':'fixed','background-position':'bottom'});
        if( $(this).scrollTop()>$('.blocklast').offset().top-windowHeight){
            $('.backfirst').css('background-attachment','scroll');
            $('.backfirst').css('background-position','bottom');

        }else{
            // if($(this).scrollTop()>$('.tour').offset().top+600) {
            //     $('.backfirst').css('background-position','bottom')
            // }
            $('.backfirst').css('background-position','top')
        }
    }
    else{
        $('.backfirst').css('background-attachment','scroll');
        $('.backfirst').css('background-position','top');
    }

    if( $(this).scrollTop()> $('.blocklast').offset().top ){
        $('.blocklast').css('background-attachment','fixed');
        if($(window).height()+$(document).scrollTop()>=$('.backbottom').offset().top){
            $('.blocklast').css('background-position','bottom');
        }else{
            $('.blocklast').css('background-position','top');
        }

    }else{
        $('.blocklast').css('background-attachment','scroll');
    }
    if($(this).scrollTop()> $('#m_video').offset().top){
        $('#m_video').attr('autoplay',true);
    }
    
    
    
})
//无缝滚动
var oul = $('.travels-img');
var oulHtml = oul.html();
oul.html(oulHtml+oulHtml)
var timeId = null;

// var ali = $('.travels-img li');
// var aliWidth = ali.eq(0).width();
// var aliSize = ali.size();
$('.travels-img img').css('width',$('.wrapper').width()/3.05);
var gap = ($('.wrapper').width()-$('.travels-img img').width()*3)/2
$('.travels-img img').css('marginLeft', gap)
// $('.travels-img').css('transform',"translateX(-"+$('.travels-img img').width()*0.54+"px)");
$(oul).css('width',$('.travels-img img').width()*8.25);
$('.travel-contain').css('height',$('.travels-img img').width());
var ulWidth = $(oul).width();
// oul.width(ulWidth);	
// var speed = 0;
oul.css('left',-ulWidth/2+'px');
// function slider(){
//     if(speed>0){
//         if(oul.css('left')>='0px'){
//         oul.css('left',-ulWidth/2+'px');
//         }
//         oul.css('left','+='+speed+'px');
//     }    
//     }
//     timeId = setInterval(slider,300);

// $('.travel-contain').mouseover(function(){
//     clearInterval(timeId);
// });

// $('.travel-contain').mouseout(function(){
//     timeId = setInterval(slider,30);
// });

var imgW = $('.travels-img img').width();

function slide(){
    if(parseInt(oul.css('left'))>= -imgW){
        oul.css('left',-ulWidth/2+'px');
    }
    oul.animate({ left: parseInt(oul.css('left'))+imgW+8}, "slow");
}
var slides = setInterval(slide,2000);

$('.travel-contain').mouseover(function(){
    clearInterval(slides);
});
$('.travel-contain').mouseout(function(){
    slides = setInterval(slide,2000);
});
var _timer = {};
function delay_till_last(id, fn, wait) {
    if (_timer[id]) {
        window.clearTimeout(_timer[id]);
        delete _timer[id];
    }
 
    return _timer[id] = window.setTimeout(function() {
        fn();
        delete _timer[id];
    }, wait);
}
// $('.slide-btn').click(function(){
//     delay_till_last('id', function() {
//     clearInterval(slides);
//     slides = setInterval(slide,2000);
//     }, 300);

// });

//bottom
$(".nochecked div").mouseover(function(){
    var _index = $(this).index();
    $(".tips>img").eq(_index).addClass("active").siblings().removeClass("active")
    $(this).addClass("change").siblings().removeClass("change");
});
//trip

$('.trips .trips-container').mouseover(function(){
    var _index = $(this).index();
    $(".tour-con>div").eq(_index).addClass("active").siblings().removeClass("active");
    $(this).removeClass('triphidden').siblings().addClass('triphidden');
    // $(".trips-container .line2").toggleClass('hidden');
})
//tour
$('.grouptour .grouptour1').click(function(){
    window.location.href = '#';
});
$('.grouptour .grouptour2').click(function(){
    window.location.href = '#';
});
$('.grouptour .grouptour3').click(function(){
    window.location.href = '#';
});
$('.grouptour .grouptour4').click(function(){
    window.location.href = '#';
});
$('.fittour .fittour1').click(function(){
    window.location.href = '#';
});
$('.fittour .fittour2').click(function(){
    window.location.href = '#';
});
$('.fittour .fittour3').click(function(){
    window.location.href = '#';
});
$('.fittour .fittour4').click(function(){
    window.location.href = '#';
});
