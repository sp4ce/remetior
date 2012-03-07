function(data) {
    $(this).find('.add-new-category form').hide().ajaxForm();
    $(this).data('configuration', data);
}
