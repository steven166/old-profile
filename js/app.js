/**
 * Created by steven on 21-10-2015.
 */
(function () {

    $("body").ready(function () {

        $("#more-button").click(function () {
            $("#me").addClass("fade");
            setTimeout(function(){
                $("#me").addClass("active").removeClass("fade");
                setTimeout(function () {
                    $("#more-button").remove();
                }, 1000);
            }, 20);
        });

        $("#contact-me").click(function(){
            if(!$(this).hasClass("selected")){
                $(this).addClass("selected");
                $("#my-projects").removeClass("selected");
                $("#content-frame > div").addClass("fade");
                setTimeout(function(){
                    $("#content-frame > div").addClass("hide").removeClass("fade");
                    $("#content-frame > #contact").addClass("fade").removeClass("hide");
                    setTimeout(function(){
                        $("#content-frame > #contact").removeClass("fade");
                    }, 20);
                }, 200);
            }
        });

        $("#my-projects").click(function(){
            if(!$(this).hasClass("selected")) {
                $(this).addClass("selected");
                $("#contact-me").removeClass("selected");
                $("#content-frame > div").addClass("fade");
                setTimeout(function(){
                    $("#content-frame > div").addClass("hide").removeClass("fade");
                    $("#content-frame > #showcase").addClass("fade").removeClass("hide");
                    setTimeout(function(){
                        $("#content-frame > #showcase").removeClass("fade");
                    }, 20);
                }, 200);
            }
        });

        $("#showcase .item").click(function () {
            var tthis = this;
            setTimeout(function () {
                if (!$(tthis).hasClass("active")) {
                    $("#showcase .item").removeClass("active");
                    $("#showcase .item").css("z-index", "");
                    $(tthis).addClass("active");
                    $(tthis).removeClass("wrippels");
                    $(tthis).css("z-index", 20);
                    $(tthis).find(".item-bottom").addClass("fade");
                    setTimeout(function () {
                        $(tthis).find(".item-bottom").removeClass("fade");
                    }, 500);
                }
            }, 200);
        });
        $("#showcase .item .button-hide").click(function () {
            var item = $(this).parent().parent();
            setTimeout(function () {
                item.removeClass("active");
                item.addClass("wrippels");
                item.find(".item-bottom").addClass("fade");
                setTimeout(function () {
                    item.css("z-index", "");
                    item.find(".item-bottom").removeClass("fade");
                }, 500);
            }, 200);
            return false;
        });

        paper.lang.installLanguage("en", {
            "lang": "English",
            "language": "Language",

            "my-name": "Steven Hermans",
            "title": "Software engineer",
            "country": "Country",
            "netherlands": "Netherlands",
            "age": "Age",
            "years": "years",
            "read-more": "Read more",
            "projects": "My Projects",
            "contact": "Contact me",

            "name": "Name",
            "email": "Email",
            "subject": "Subject",
            "description": "Description",
            "send": "Send"
        });

        paper.lang.installLanguage("nl", {
            "lang": "Nederlands",
            "language": "Taal",

            "my-name": "Steven Hermans",
            "title": "Software engineer",
            "country": "Land",
            "netherlands": "Nederland",
            "age": "Leeftijd",
            "years": "jaren",
            "read-more": "Lees meer",
            "projects": "Mijn projecten",
            "contact": "Neem contact op",

            "name": "Naam",
            "email": "Email",
            "subject": "Onderwerp",
            "description": "Beschrijving",
            "send": "Verstuur"
        });

        paper.lang.setSupportedLanguages(["nl", "en"]);



        $("#me #portrait").removeClass("hide");
        setTimeout(function(){
            $("#me #details").removeClass("hide");
            setTimeout(function(){
                $("#showcase").removeClass("hide").addClass("fade");
                setTimeout(function(){
                    $("#showcase").removeClass("fade");
                }, 20);
            }, 1000);
        }, 1000);

    });

})();