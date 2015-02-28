//Whenever any tree element is clicked, bubble up to find the nearest node, and close/open it
$('.tree').on('click', 'li, ul, .botany-open, .botany-closed', function (e) {

    //Find the closest node
    var clicked = $(e.target).closest("li");

    //Find its list of children (<ul>)
    var childList = $(clicked).children("ul");

    if (clicked.hasClass("open")) {

        //If there are subnodes, then run the slideUp animation before removing the open class
        if (childList.children().length > 0)
            childList.slideUp(function () {
                clicked.removeClass("open");
            });

        //Otherwise just remove the class straight away (so there is no delay due to animation)
        else
            clicked.removeClass("open");

    }

    //Same logic as above
    else {
        if (childList.children().length > 0)
            childList.slideDown(function () {
                clicked.addClass("open");
            });
        else
            clicked.addClass("open");
    }

    e.stopPropagation();
});