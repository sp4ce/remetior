function() {
    var list_item = $(this).parents('.list-item').data('list_item');
    if (list_item && list_item.delete) {
        // Disable the button.
        $(this).enable(false);

        // Call the callback.
        list_item.delete($(this).prev().attr('data-index'));
    }
}
