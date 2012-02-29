function(callback, e, data) {
    if (data) {
        $(this).find('label').html(data);    
    } else {
        $(this).find('label').html('loading...');
    }    

    $(this).show().centerBox();
    $(this).find('.dialog-overlay').prependTo('body').width($(window).width()).height($(window).height());
}
