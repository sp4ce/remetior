function() {
    // Disable the button;
    $(this).enable(false);

    // Delete the category.
    $('#configuration').data('configuration').delete_category($(this).prev().html());
}
