var d = new Date();
var elk = "P_TOUR_ORDER_1";
+function () {
    window.M = window.M || {};
    var track_event_url = "http://tks.tuniu.com/monitor/PagePerformance";
    var errArray = [];
    var collecting = false;
    var error = function (msg, url, line, col, error) {
        if (msg != "Script error." && !url) {
            return true
        }
        var data = {};
        col = col || (window.event && window.event.errorCharacter) || 0;
        data.page = window.elk || "";
        data.type = "onerror";
        data.msg = msg;
        data.url = url || "";
        data.line = line;
        data.col = col;
        data.userAgent = navigator.userAgent;
        data.location = location.href;
        if (!!error && !!error.stack) {
            data.stack = error.stack.toString()
        } else {
            if (!!arguments.callee) {
                var ext = [];
                var f = arguments.callee.caller, c = 3;
                while (f && (--c > 0)) {
                    ext.push(f.toString());
                    if (f === f.caller) {
                        break
                    }
                    f = f.caller
                }
                ext = ext.join(",");
                data.stack = ext
            }
        }
        errArray.push(data);
        reportErrors();
        return false
    };

    function reportErrors() {
        if (!collecting) {
            collecting = true;
            var sendloop = setTimeout(function () {
                var params = {"loggedErrors": JSON.stringify(errArray)};
                var postData = (function (obj) {
                    var str = "";
                    for (var prop in obj) {
                        str += prop + "=" + obj[prop] + "&"
                    }
                    return str
                })(params);
                var req = new XMLHttpRequest();
                req.open("POST", track_event_url, true);
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                req.send(postData);
                errArray = [];
                collecting = false
            }, 3000)
        }
    }

    window.onerror = error;
    M.error = function (ex) {
        if (!(ex instanceof Error)) {
            return
        }
        var stack = ex.stack || ex.stacktrace;
        var data = {};
        data.page = window.elk || "";
        data.type = "try catch";
        data.msg = ex.message || ex.description;
        data.url = ex.fileName || "";
        data.userAgent = navigator.userAgent;
        data.stack = stack ? stack.toString() : "";
        data.location = location.href;
        errArray.push(data);
        reportErrors()
    }
}();

var cdnConfig = {
    url: 'http://img.tuniucdn.com'
};

//TA代码
var tuniuTracker = _tat.getTracker();
tuniuTracker.setPageName(pageCurrentData.taData);
tuniuTracker.trackPageView();
tuniuTracker.enableLinkTracking();