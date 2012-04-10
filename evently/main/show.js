function(e, data) {
    // Clear the main panel to avoid having remaining events attached to the div container.
    $(this).empty().append('<div id="' + data + '"/>').find('div').evently(data, $$(this).app);
    $.evently.connect('#' + data, '#loading', ['loading', 'loaded', 'update_label']);

    // Display the selected menu.
    $(this).trigger('select', data);
}
