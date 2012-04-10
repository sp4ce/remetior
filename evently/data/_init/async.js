function(callback) {
    var db = $$(this).app.db;
    var data = {
        total_operations: 0,
        total_new_operations: 0,
        total_outdated_operations: 0,
        total_analyzed_conversations: 0
    };

    // Get the total count of operations.
    var get_operations = function(callback) {
        db.view('remetior/operations', {
            success: function(view) {
                data.total_operations = view.total_rows;
                callback();
            }
        });
    }; 

    // Get the newly inserted operations.
    var get_new_operations = function(callback) {
        db.view('remetior/operations-new', {
            success: function(view) {
                data.total_new_operations = view.total_rows;
                callback();
            }
        });
    };

    // Get the operations that are outdated (new configuration)
    var get_outdated_operations = function(callback) {
        new Configuration(db, function(configuration) {
            db.view('remetior/operations-analyzed', {
                success: function(view) {
                    data.total_outdated_operations = view.total_rows;
                    callback();
                },
                startkey: configuration.doc.last_modification
            })
        });
    };

    // Get the operations that analyzed.
    var get_analyzed_operations = function(callback) {
        new Configuration(db, function(configuration) {
            db.view('remetior/operations-analyzed', {
                success: function(view) {
                    data.total_analyzed_operations = view.total_rows;
                    callback();
                },
                endkey: configuration.doc.last_modification
            })
        });
    };

    fork([get_operations, get_new_operations, get_outdated_operations, get_analyzed_operations], function() {
        callback(data);
    });
}
