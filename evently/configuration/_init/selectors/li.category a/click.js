function(e) {
    e.preventDefault();
    $(this).trigger('select_category', $(this).attr('data-index'))
}
