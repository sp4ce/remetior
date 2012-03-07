function(e) {
    e.preventDefault();
    $('#editor').show().evently('category_editor', $$(this).app, $(this).attr('data-index'));
}
