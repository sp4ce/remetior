function(e, data) {
    // Clear the main panel to avoid having remaining events attached to the div container.
    $(this).empty().append('<div/>').find('div').evently(data, $$(this).app);

    // Display the selected menu.
    $(this).trigger('select', data);
}
