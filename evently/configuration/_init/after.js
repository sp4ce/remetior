function(data) {
    $(this).data('configuration', data);
    var app = $$(this).app;
    $(this).find('.categories').evently('list_item', app, {
        add_label: 'Add new category',
        items: (data.doc.categories || []).map(function(category) { return { label: category.name }; }),
        click: function(index) {
            $('#editor').show().evently('category_editor', app, index);
        },
        delete: function(index) {
            data.delete_category(index);
        },
        validate: function(value) { return data.validate_category(value); },
        add: function(name) {
            data.add_category(name);
        }
    });
}
