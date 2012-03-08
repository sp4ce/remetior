function() {
    var list_item = $(this).parents('.list-item').data('list_item');
    if (list_item && list_item.validate && !list_item.validate(this.value)) {
        $(this.form).find('input[type="submit"]').hide();
        $(this.form).find('label').show();
    } else {
        $(this.form).find('input[type="submit"]').show();
        $(this.form).find('label').hide();
    }
}
