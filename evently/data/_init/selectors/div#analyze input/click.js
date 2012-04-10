function() {
    $(this).trigger('loading', 'analyzing...');
    $$(this).app.db.views('remetior/operations', {
        success: function(view) {
        
        },
        include_doc: true
    }); 
}

