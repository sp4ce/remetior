function(callback) {
    var widget = this;

    // Fetch the configuration
    $$(this).app.db.openDoc('configuration', {
        success: function(data) {
            callback(data);
        },
        // If the configuration is not found, create one.
        error: function(){
            doc = { _id: 'configuration' };
            $$(widget).app.db.saveDoc(doc, {
                success: function(data) {
                    callback(data);
                }
            });
        },
    });
}
