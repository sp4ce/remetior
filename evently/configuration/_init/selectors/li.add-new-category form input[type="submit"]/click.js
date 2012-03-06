function() {
    var submit = this;
    var name = submit.form.category.value;
    if (!name) {
        alert('Please give a category name');
        return;
    }

    // Disable form to figure the loading
    $(submit.form).find('input').enable(false)

    // Create the category object.
    var category = { name: name };

    // Save it to the database.
    $$(submit).app.db.openDoc('configuration', {
        success: function(doc) {

            if (doc.categories) {
                doc.categories.push(category);
            } else {
                doc.categories = [ category ];
            }

            $$(submit).app.db.saveDoc(doc);
        }
    });
}
