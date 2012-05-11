function(callback) {
    var db = $$(this).app.db;
    var forks = [];
    var data = {
        total_operations: 0,
        total_new_operations: 0,
        total_outdated_operations: 0,
        total_analyzed_conversations: 0
    };

    // Create an analyzer.
    var analyzer = new Analyzer(db);

    // Get the total count of operations.
    forks.push(function(callback) {
        analyzer.get_operations(function(view) {
            data.total_operations = view.total_rows;
            callback();
        });
    });

    // Get the newly inserted operations.
    forks.push(function(callback) {
        analyzer.get_new_operations(function(view) {
            data.total_new_operations = view.total_rows;
            callback();
        });
    });

    // Get the operations that are outdated (new configuration)
    forks.push(function(callback) {
        analyzer.get_outdated_operations(function(view) {
            data.total_outdated_operations = view.rows.length;
            callback();
        });
    });

    // Get the operations that analyzed.
    forks.push(function(callback) {
        analyzer.get_analyzed_operations(function(view) {
            data.total_analyzed_operations = view.rows.length;
            callback();
        });
    });

    // Get the categories values for each month
    forks.push(function(callback) {
        db.view('remetior/categories_values_months', {
            success: function(view) {
                data.categories_values_months = view.rows;
                callback();
            },
            reduce: true,
            group: true
        });
    });

    // Get the categories values for each week
    forks.push(function(callback) {
        db.view('remetior/categories_values_weeks', {
            success: function(view) {
                data.categories_values_weeks = view.rows;
                callback();
            },
            reduce: true,
            group: true
        });
    });

    // Forks all the method and return the data.
    fork(forks, function() {
        callback(data);
    });
}
