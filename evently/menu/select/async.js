function(callback, e, data) {
    $(this).find('li').removeClass('selected');
    $(this).find('a[href="' + data + '"]').parent('li').addClass('selected');
}
