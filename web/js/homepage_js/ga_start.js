require(["//img.tuniucdn.com/j/201506171835/common/ga.js"], function () {
    var startGa = function (pageView) {
        var _gaq = window._gaq || [];
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
        _gaq.push(["_setDomainName", "tuniu.com"]);
        _gaq.push(["_setAccount", "UA-4782081-5"]);
        _gaq.push(["_trackPageview", pageView]);
    };
    startGa(window.GaPageName);
});