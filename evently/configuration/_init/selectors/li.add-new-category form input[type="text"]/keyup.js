function() {
    var value = this.value;

    // Check the value with a regex.
    var regex_result = /([a-z]|[A-Z])\w*/.exec(value);
    if (!regex_result || regex_result.length == 0 || regex_result[0] != value) {
        $(this.form).find('input[type="submit"]').hide();
        $(this.form).find('label').show();
        return;
    }

    // Get all the existing category.
    var existing_categories = $(this).parents('ul').find('li.category span');
    for(var i = 0; i < existing_categories.length; i++) {
        if ($(existing_categories[i]).html() == value) {
            $(this.form).find('input[type="submit"]').hide();
            $(this.form).find('label').show();
            return;
        }
    }

    $(this.form).find('input[type="submit"]').show();
    $(this.form).find('label').hide();
}
