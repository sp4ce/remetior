function() {
    $('#uploader').evently('uploader', $$(this).app);
    $.evently.connect('#uploader', '#loading', ['loading', 'loaded']);
}
