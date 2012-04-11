function() {
    var configuration = $('#configuration').data('configuration');
    var value = $(this).val();
    if (configuration.validate_category(value)) {
        $(this).next().hide();
        $('#editor input.save').enable(true);
    } else {
        $(this).next().show();
        $('#editor input.save').enable(false);
    }
}
