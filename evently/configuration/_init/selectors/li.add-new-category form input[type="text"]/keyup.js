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
    var categories = $('#configuration').data('configuration').doc.categories || [];
    for(var i = 0; i < categories.length; i++) {
        if (categories[i].name == value) {
            $(this.form).find('input[type="submit"]').hide();
            $(this.form).find('label').show();
            return;
        }
    }

    $(this.form).find('input[type="submit"]').show();
    $(this.form).find('label').hide();
}
