$(function ($) {
    animate();
});

function animate() {
    var atNa = 'liWithHan';
    var atNaN = 'liWithHans';
    $(document).on('click', '.an_mo['+atNa+'] a', function (e) {
	var position = [];
	var aa = 0;
        var TJ = '';
        var getIndex = function ($element) {
            var i = $element.prevAll($element.get(0).tagName).length;
            position.unshift([$element.get(0).tagName,i + 1]);
            var $parent = $element.parent();
            if (!$parent.hasClass('an_mo')) {
                getIndex($parent);
            } else {
                position.unshift([atNa,$parent.attr(atNa),$parent.prevAll('[' + atNa + '=' + $parent.attr(atNa) + ']').length + 1]);
                if ($element.siblings('textarea').first().hasClass('TomJerry')) {
                    TJ = $element.siblings('textarea').first().text();
                }
            }
        };
        getIndex($(this));
        var X = $(this).offset().top;
        var Y = $(this).offset().left;
        var location = [Math.round(X),Math.round(Y - ($(document).width() / 2))];
        var fromUrl = window.location.href;
        var visitUrl = $(this).attr('href');
        var pageSize = [$(window).height(),$(window).width()];
        var resolution = screenInfo();
        var system = getPlatformInfo();
        var browserInfo = getBrowserInfo();
        var screenColor = screen.colorDepth;
        var flashVision = getFlashVision();
        var javaEnabled = navigator.javaEnabled() ? 1 : 0;
        var cookieEnabled = navigator.cookieEnabled ? '1' : '0';
        var title = document.title;
        var pageName = '';
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '//www.tuniu.com/LiAndHan/index',
            data: {
                'position': position,
                'location': location,
                'fromUrl': fromUrl,
                'visitUrl': visitUrl,
                'resolution': resolution,
                'pageSize': pageSize,
                'operatingSystem': system,
                'browserInfo': browserInfo,
                'screenColor': screenColor,
                'flashVision': flashVision,
                'javaEnabled': javaEnabled,
                'cookieEnabled': cookieEnabled,
                'title': title,
                'pageName': pageName,
                'tj': TJ
            },
            success: function (msg) {
            }
        });
        return true;
    });
    
    $('.an_mo['+atNaN+'] a').live('click', function(event) {
      event.preventDefault();
    }); 
 
    $(document).on('click', '.an_mo['+atNaN+'] a', function (e) {
	var position = [];
        var aa = 0;
        var TJ = '';
        var getIndex = function ($element) {
            var i = $element.prevAll($element.get(0).tagName).length;
            position.unshift([$element.get(0).tagName,i + 1]);
            var $parent = $element.parent();
            if (!$parent.hasClass('an_mo')) {
                getIndex($parent);
            } else {
                position.unshift([atNaN,$parent.attr(atNaN),$parent.prevAll('[' + atNaN + '=' + $parent.attr(atNaN) + ']').length + 1]);
                if ($element.siblings('textarea').first().hasClass('TomJerry')) {
                    TJ = $element.siblings('textarea').first().text();
                }
            }
        };
        getIndex($(this));
        var X = $(this).offset().top;
        var Y = $(this).offset().left;
        var location = [Math.round(X),Math.round(Y - ($(document).width() / 2))];
        var fromUrl = window.location.href;
        var visitUrl = $(this).attr('href');
        var pageSize = [$(window).height(),$(window).width()];
        var resolution = screenInfo();
        var system = getPlatformInfo();
        var browserInfo = getBrowserInfo();
        var screenColor = screen.colorDepth;
        var flashVision = getFlashVision();
        var javaEnabled = navigator.javaEnabled() ? 1 : 0;
        var cookieEnabled = navigator.cookieEnabled ? '1' : '0';
        var title = document.title;
        var pageName = '';
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '//www.tuniu.com/LiAndHan/index',
            data: {
                'position': position,
                'location': location,
                'fromUrl': fromUrl,
                'visitUrl': visitUrl,
                'resolution': resolution,
                'pageSize': pageSize,
                'operatingSystem': system,
                'browserInfo': browserInfo,
                'screenColor': screenColor,
                'flashVision': flashVision,
                'javaEnabled': javaEnabled,
                'cookieEnabled': cookieEnabled,
                'title': title,
                'pageName': pageName,
                'tj': TJ
            },
            success: function (msg) {
            }
        });
        window.location.href = visitUrl;
        return true;
    }); 

   
}

function getBrowserInfo() {
    browserType = (navigator.userAgent.toLowerCase().match(/(?:firefox|opera|safari|chrome|msie|micromessenger)/)) [0];
    browserVersion = $.browser.version;
    return [browserType,
    browserVersion];
}
function screenInfo() {
    screenHeight = screen.height;
    screenWidth = screen.width;
    return [screenHeight,
    screenWidth];
}
function getPlatformInfo() {
    var platform = 'not set',
    isWin = (navigator.platform == 'Win32') || (navigator.platform == 'Windows'),
    isMac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC') || (navigator.platform == 'Macintosh'),
    isUnix = (navigator.platform == 'X11') && !isWin && !isMac;
    if (isMac) {
        platform = 'Mac';
    }
    if (isUnix) {
        platform = 'Unix';
    }
    if ((String(navigator.platform).indexOf('Linux') > - 1)) {
        platform = 'Linux';
    }
    if (isWin) {
        if (navigator.userAgent.indexOf('Win95') > - 1 || navigator.userAgent.indexOf('Windows 95') > - 1) {
            platform = 'windows 95';
        }
        if (navigator.userAgent.indexOf('Win98') > - 1 || navigator.userAgent.indexOf('Windows 98') > - 1) {
            platform = 'windows 98';
        }
        if (navigator.userAgent.indexOf('Windows 9x 4.90') > - 1 || navigator.userAgent.indexOf('Windows ME') > - 1) {
            platform = 'windows ME';
        }
        if (navigator.userAgent.indexOf('Windows NT 5.0') > - 1 || navigator.userAgent.indexOf('Windows 2000') > - 1) {
            platform = 'windows 2000';
        }
        if (navigator.userAgent.indexOf('Windows NT 5.1') > - 1 || navigator.userAgent.indexOf('Windows XP') > - 1) {
            platform = 'windows XP';
        }
        if (navigator.userAgent.indexOf('Windows NT 5.2') > - 1 || navigator.userAgent.indexOf('Windows 2003') > - 1) {
            platform = 'windows 2003';
        }
        if (navigator.userAgent.indexOf('Windows NT 6.0') > - 1 || navigator.userAgent.indexOf('Windows Vista') > - 1) {
            platform = 'Windows Vista';
        }
        if (navigator.userAgent.indexOf('Windows NT 6.1') > - 1 || navigator.userAgent.indexOf('Windows 7') > - 1) {
            platform = 'Win7';
        }
        if (navigator.userAgent.indexOf('Windows NT 6.2') > - 1 || navigator.userAgent.indexOf('Windows 8') > - 1) {
            platform = 'Win8';
        }
    }
    android = navigator.userAgent.match(/(Android)[\s\/]+([\d\.]+)/);
    iPad = navigator.userAgent.match(/iPad/i);
    iPhone = navigator.userAgent.match(/iPhone/i);
    iPod = navigator.userAgent.match(/iPod/i);
    windowsPhone = navigator.userAgent.match(/(Windows\s+Phone)\s([\d\.]+)/);
    if (android) {
        platform = 'Android';
    }
    if (iPad) {
        platform = 'iOS-Pad';
    }
    if (iPhone) {
        platform = 'iOS-Phone';
    }
    if (iPod) {
        platform = 'iOS-Pod';
    }
    if (windowsPhone) {
        platform = 'WindowsPhone';
    }
    return platform;
}
function getFlashVision() {
    var f = '-',
    fl;
    if (navigator.plugins && navigator.plugins.length) {
        for (var ii = 0; ii < navigator.plugins.length; ii++) {
            if (navigator.plugins[ii].name.indexOf('Shockwave Flash') != - 1) {
                f = navigator.plugins[ii].description.split('Shockwave Flash ') [1];
                break;
            }
        }
    } else {
        try {
            fl = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
            f = fl.GetVariable('$version');
        } catch (e) {
        }
        if (f == '-') {
            try {
                fl = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                f = 'WIN 6,0,21,0';
                fl.AllowScriptAccess = 'always';
                f = fl.GetVariable('$version');
            } catch (e) {
            }
        }
        if (f == '-') {
            try {
                fl = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                f = fl.GetVariable('$version');
            } catch (e) {
            }
        }
        if (f != '-') {
            f = f.split(' ') [1].split(',');
            ;
            f = f[0] + '.' + f[1] + ' r' + f[2];
        }
    }
    return f;
}