function(e, data) {
    if (!data) {
        $('#editor').show().evently('category_editor', $$(this).app, data);
    } else {
        $('#editor').empty().hide();
    }
}
