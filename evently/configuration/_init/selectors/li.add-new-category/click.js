function(e) {
    e.preventDefault();
    $(this).find('a').hide();
    $(this).find('form').show();
    $(this).find('form input[type="submit"]').hide();
}
