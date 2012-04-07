function(callback) {
    $$(this).app.db.view('remetior/operations', {
        success: function(data) {
            callback(data);
        }
    }); 
}
