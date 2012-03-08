function(e) {
    e.preventDefault();
    $(this).hide();
    $(this).parent().find('form').show();
    $(this).parent().find('form input[type="text"]').keyup();
}
