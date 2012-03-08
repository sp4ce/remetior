function() {
    var list_item = $(this).parents('.list-item').data('list_item');
    if (list_item && list_item.add) {
        // Disable form to figure the loading
        $(this.form).find('input').enable(false)

        // Add the category in the DB and the object.
        list_item.add(this.form.name.value);
    }
    
}
