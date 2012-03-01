function(e) {
    e.preventDefault();
    $(this).trigger('show', $(this).attr('href'));
}

