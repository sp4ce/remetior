function(e) {
    e.preventDefault();
    var category = $('#configuration').data('configuration').get_category($(this).html());
    $.log(category);
}
