function(callback) {
    var db = $$(this).app.db;
    var data = {
        total_operations: 0,
        total_new_operations: 0,
        total_outdated_operations: 0,
        total_analyzed_conversations: 0
    };

    // Create an analyzer.
    var analyzer = new Analyzer(db);

    // Get the total count of operations.
    var get_operations = function(callback) {
        analyzer.get_operations(function(view) {
            data.total_operations = view.total_rows;
            callback();
        });
    }; 

    // Get the newly inserted operations.
    var get_new_operations = function(callback) {
        analyzer.get_new_operations(function(view) {
            data.total_new_operations = view.total_rows;
            callback();
        });
    };

    // Get the operations that are outdated (new configuration)
    var get_outdated_operations = function(callback) {
        analyzer.get_outdated_operations(function(view) {
            data.total_outdated_operations = view.rows.length;
            callback();
        });
    };

    // Get the operations that analyzed.
    var get_analyzed_operations = function(callback) {
        analyzer.get_analyzed_operations(function(view) {
            data.total_analyzed_operations = view.rows.length;
            callback();
        });
    };

    fork([get_operations, get_new_operations, get_outdated_operations, get_analyzed_operations], function() {
        callback(data);
    });
}
