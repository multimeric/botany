$.fn.botany = function () {

    //Error checking
    if (!(this.hasClass("botany") && this.prop("tagName") == "UL"))
        throw new Error("The target of $().botany must be a <ul> element with the class .botany");

    //Whenever any tree element is clicked, bubble up to find the nearest node, and close/open it
    $(this).on('click', 'li, ul, .botany-open, .botany-closed', function (e) {

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

        else {

            //If there are subnodes, add the class before sliding down so that jQuery can work out its
            //height correctly, but hide it so this isn't visible to the user
            if (childList.children().length > 0) {
                childList.hide();
                clicked.addClass("open");
                childList.slideDown();
            }

            //If there aren't subnodes, just remove the class
            else
                clicked.addClass("open");
        }

        e.stopPropagation();
    });
};