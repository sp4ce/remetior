function() {
    // Disable form to figure the loading
    $(this.form).find('input').enable(false)

    // Add the category in the DB and the object.
    var name = this.form.category.value;
    $('#configuration').data('configuration').add_category(name);
}
