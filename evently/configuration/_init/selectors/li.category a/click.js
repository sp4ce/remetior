function(e) {
    e.preventDefault();
    $('#editor').show().evently('category_editor', $$(this).app, $(this).html());
}
