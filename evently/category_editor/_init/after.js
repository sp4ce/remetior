function(e, data) {
    // Set the category name inside the editor
    $('#category-editor').data('category_name', data);

    // Get the category object.
    var category = $('#configuration').data('configuration').get_category(data);

    // Set the list item for the regexes.
    $(this).find('.regexes').evently('list_item', $$(this).app, {
       add_label: 'Add new regex',
       items: (category.regexes || []).map(function(regex) { $.log(regex); return { label: regex }; }),
       delete: function(index) {
           this.items = this.items.filter(function(item, idx) {
               return idx != index;
           });

           $('#category-editor .regexes').trigger('_init', this);
       },
       validate: function(value) {
           try {
               eval('/' + value + '/');
               return true;
           } catch(err) {
               return false;
           }
       },
       add: function(value) {
          this.items.push({ label: value});
          $('#category-editor .regexes').trigger('_init', this);
       },
    });
}
