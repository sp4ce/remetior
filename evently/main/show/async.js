function(callback, e, data) {
    $(this).find('div').empty().evently(data, $$(this).app);
    $(this).trigger('select', data);
}
