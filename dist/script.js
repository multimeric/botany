//Whenever any tree element is clicked, bubble up to find the
$('.tree').on('click', 'li, ul, .botany-open, .botany-closed', function (e) {
    var clicked = $(e.target).closest("li");
    var children = $(clicked).children("ul");

    if (clicked.hasClass("open")) {

        if (children.children().length > 0)
            children.slideUp(function () {
                clicked.removeClass("open");
            });
        else
            clicked.removeClass("open");

    }
    else {
        if (children.children().length > 0)
            children.slideDown(function () {
                clicked.addClass("open");
            });
        else
            clicked.addClass("open");
    }

    e.stopPropagation();
});