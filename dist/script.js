$(".tree li").click(function (e) {
    var clicked = $(e.target);
    if (clicked.hasClass("open")) {
        clicked.removeClass("open");
        clicked.children("ul").slideUp();
    }
    else {
        clicked.addClass("open");
        clicked.children("ul").slideDown();
    }

    e.stopPropagation();
});