function() {
    $(this).show().centerBox();
    $(this).find('.dialog-overlay').prependTo('body').width($(window).width()).height($(window).height());
}
