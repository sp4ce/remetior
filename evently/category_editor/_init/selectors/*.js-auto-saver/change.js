function() {
    // Get the category object.
    var name = $('#category-editor').data('category_name');
    var category = $('#configuration').data('configuration').get_category(name);

    // Update the category object.
    category.name = $('#category-editor input[name="name"]').val();
    category.description = $('#category-editor input[name="description"]').val();

    // Update the category
    $('#configuration').data('configuration').save();
}
