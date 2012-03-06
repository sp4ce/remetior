function() {
    var button = this;

    // Disable the button;
    $(button).enable(false);

    // Get the name of the category
    var name = $(button).prev().html();

    // Fetch the config and delete the category.
    $$(button).app.db.openDoc('configuration', {
        success: function(doc) {
            // Grep the category for the category with the same name.
            doc.categories = $.grep(doc.categories, function(category) {
                return category.name != name;
            });

            // Save the doc in the db.
            $$(button).app.db.saveDoc(doc);
        }
    });
}
