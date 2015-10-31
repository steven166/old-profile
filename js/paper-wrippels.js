
(function () {

    //Check dependency
    if (typeof(paper) === "undefined") {
        console.error("\'paper-wrippels\' dependence on \'paper\'");
    }

    paper.wrippels = {

        isLightBackground: function(comp) {
            try {
                if($(comp).attr("bg") === "light"){
                    return true;
                }
                if($(comp).attr("bg") === "dark"){
                    return false;
                }

                var bg = $(comp).css("background-color");
                if (bg === "transparent" || typeof(bg) === "undefined") {
                    return paper.wrippels.isLightBackground($(comp).parent());
                } else if (bg.indexOf("rgba") == 0) {
                    bg = bg.substring(5, bg.length - 1);
                    var clrs = bg.split(",");
                    if (parseInt(clrs[3]) == 0) {
                        return paper.wrippels.isLightBackground($(comp).parent());
                    } else {
                        return (parseInt(clrs[0]) + parseInt(clrs[1]) + parseInt(clrs[2])) / 3 > 150;
                    }
                } else {
                    bg = bg.substring(4, bg.length - 1);
                    var clrs = bg.split(",");
                    return (parseInt(clrs[0]) + parseInt(clrs[1]) + parseInt(clrs[2])) / 3 > 150;
                }
            } catch (e) {
                return true;
            }
        },

        setWrippels: function(element){
            $(element).addClass("wrippels");
        },

        removeWrippels: function(element){
            $(element).removeClass("wrippels");
        }

    };

    var mouseDown = function (event) {
        var tthis = this;

        //find background
        var isLight = paper.wrippels.isLightBackground(tthis);
        var cls = "overlay" + (isLight ? " dark" : "");

        //find border-radius
        var isRound = $(tthis).css("border-radius") === "100%";

        //calc size
        var w = $(tthis).width();
        w += parseInt($(tthis).css("padding-left"));
        w += parseInt($(tthis).css("padding-right"));
        var h = $(tthis).height();
        h += parseInt($(tthis).css("padding-top"));
        h += parseInt($(tthis).css("padding-bottom"));

        //if(!isLight || !isRound) {
            var size = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) * 2;

            //calc pos
            var offset = $(tthis).offset();
            var x = Math.round(event.pageX - offset.left) - size / 2;
            var y = Math.round(event.pageY - offset.top) - size / 2;
        //}else{
        //    var size = (w < h ? w : h);
        //    var x = 0;
        //    var y = 0;
        //}

        var html = "<div class='" + cls + "' style='width: " + size + "px; height: " + size + "px; top: " + y + "px; left: " + x + "px;'/>";
        var overlay = $(html).appendTo(tthis);
        setTimeout(function () {
            var tick = 5;
            var interval = window.setInterval(function () {
                tick += 3;
                var scale = tick / 100;
                overlay.css("transform", "scale(" + scale + ")");
                if (overlay.hasClass("wrippel-expand")) {
                    overlay.css("transform", "");
                    window.clearInterval(interval);
                }
                if (tick >= 100) {
                    window.clearInterval(interval);
                }
            }, 20);
        }, 10);
    };

    var mouseUp = function (e) {
        var tthis = this;
        var overlay = $(tthis).children(".overlay");
        overlay.addClass("wrippel-ani");
        setTimeout(function () {
            overlay.addClass("wrippel-expand");
            setTimeout(function () {
                overlay.addClass("wrippel-hide");
                setTimeout(function () {
                    overlay.remove();
                }, 300);
            }, 200);
        }, 10);
    };

    //if (paper.isTouchDevice) {
    //    $("body").on("touchstart, mousedown", ".wrippels", mouseDown);
    //    $("body").on("touchend, mouseup, blur, click", ".wrippels", mouseUp);
    //    $("body").on("touchmove", ".wrippels", mouseUp);
    //} else {
    $("body").ready(function(){
        $("body").on("mousedown", ".wrippels:not(.touchonly)", mouseDown);
        $("body").on("mouseup, blur, click", ".wrippels:not(.touchonly)", mouseUp);
        $("body").on("mousemove", ".wrippels:not(.touchonly)", mouseUp);
    });
    //}
})();