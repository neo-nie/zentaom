/**
 * Created with JetBrains WebStorm.
 * User: NieHL
 * Date: 12-6-12
 * Time: 下午5:02
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    $.support.cors = true;

    if (location.protocol.substr(0, 4) === 'file' ||
        location.protocol.substr(0, 11) === '*-extension' ||
        location.protocol.substr(0, 6) === 'widget') {
        $.mobile.ajaxEnabled = false;
    }

    if (!window.console) console = {};
    console.log = console.log || function () { };
    console.warn = console.warn || function () { };
    console.error = console.error || function () { };
    console.info = console.info || function () { };

    // Check if a new cache is available on page load.
    var appCache = window.applicationCache;
    appCache.addEventListener('updateready', function (e) {
        if (appCache.status == appCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            // Swap it in and reload the page to get the new hotness.
            appCache.swapCache();
            window.location.reload();
//            if (confirm('A new version of this site is available. Load it?')) {
//                window.location.reload();
//            }
        } else {
            // Manifest didn't changed. Nothing new to server.
        }
    }, false);

    //禁止文档触摸拖动
    //$(document).on("touchmove", false);
    document.addEventListener('touchmove', function (e) {e.preventDefault();}, false);

    //禁用点击隐藏工具栏
    var $page = $("[data-id='news']"),
        $toolbars = $("[data-id='header'],[data-id='footer']");
    $toolbars.fixedtoolbar({ tapToggle:false });

    //监听滚动开始事件
    /*var positionY = 0,
        isShow = true;
    $("[data-id='content']").live("scrollupdate", function (e, data) {
//        $toolbars = $toolbars || $("[data-position='fixed']");
//        $page = $page || $("[data-role='page']");

        var scrollY = data.y;//position of the scrollbar

        if (scrollY > 0 || scrollY < -800) return;
        //        console.log(scrollY);
        if (scrollY - positionY > 20 && !isShow) {
            $page
                .removeClass("nopadding")
                .addClass("haspadding");
            $toolbars.fixedtoolbar('show');
//            $page.animate({padding:"43px 0 55px 0"}, 300);
            isShow = true;
        }
        else if (scrollY - positionY < -20 && isShow) {
            $page
                .removeClass("haspadding")
                .addClass("nopadding");
            $toolbars.fixedtoolbar('hide');
//            $page.animate({padding:"0"}, 200);
            isShow = false;
        }
        positionY = scrollY;
    });*/

//    var Main, plTimer, loadedTime = +(new Date);
    //监听缓存事件并记录日志
    ["checking", "downloading", "progress", "cached", "noupdate", "updateready", "error", "obsolete"].forEach(function (a) {
        var b = applicationCache;
        b.progress = 0, b.addEventListener(a, function (a) {
            var c = a.type;
            console.log(c + ": " + b.status), c == "progress" && b.progress++
        }, !1)
    });

    //自动隐藏地址栏
    /*var ua = navigator.userAgent.toLowerCase();
    if (navigator.standalone === !1 && location.search != "?debug" && /iphone/.test(ua) && /safari/.test(ua) && !/mqqbrowser/.test(ua)) {
        function onOriChange() {
            var a = document.body.style, b = window.screen.availHeight, c = window.orientation;
            a.height = c == 0 || c == 180 ? "417px" : "269px", setTimeout(scrollTo, 100, 0, 1);
        }

        addEventListener("orientationchange", onOriChange, !1);
        addEventListener("scroll", function () {!pageYOffset && setTimeout(scrollTo, 2000, 0, 1)}, !1);
        onOriChange();
    }*/
});