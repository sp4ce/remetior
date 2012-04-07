function(e) {
    e.preventDefault();
    var list_item = $(this).parents('.list-item').data('list_item')
    if (list_item && list_item.click) {
        list_item.click($(this).attr('data-index'));
    }
}
