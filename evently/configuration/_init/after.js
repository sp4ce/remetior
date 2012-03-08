function(data) {
    $(this).find('.add-new-category form').hide().ajaxForm();
    $(this).data('configuration', data);
    var app = $$(this).app;
    $(this).find('.categories').evently('list_item', app, {
        add_label: 'Add new category',
        items: data.doc.categories.map(function(category) { return { label: category.name }; }),
        click: function(index) {
            $('#editor').show().evently('category_editor', app, index);
        },
        delete: function(index) {
            data.delete_category(index);
        },
        validate: function(value) {
            // Check the string value.
            var regex_result = /([a-z]|[A-Z])\w*/.exec(value);
            if (!regex_result || regex_result.length == 0 || regex_result[0] != value) {
                return false;
            }

            // Check it is a unique category.
            var categories = data.doc.categories || [];
            for(var i = 0; i < categories.length; i++) {
                if (categories[i].name == value) {
                    $(this.form).find('input[type="submit"]').hide();
                    $(this.form).find('label').show();
                    return false;
                }
            }

            return true;
        },
        add: function(name) {
            data.add_category(name);
        }
    });
}
