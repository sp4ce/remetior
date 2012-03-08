function() {
    // Get the category object.
    var name = $('#category-editor').data('category_name');
    var category = $('#configuration').data('configuration').get_category(name);

    // Update the category object.
    category.name = $('#category-editor input[name="name"]').val();
    category.description = $('#category-editor input[name="description"]').val();
    category.regexes = $('#category-editor .regexes li.item a').toArray().map(function(element) {
        return $(element).html();
    });

    // Update the category
    $('#configuration').data('configuration').save();
}
