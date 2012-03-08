function(e, data) {
    $(this).find('.list-item').data('list_item', data);
    $(this).find('.add form').hide().ajaxForm();
}
