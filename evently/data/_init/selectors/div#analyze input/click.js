function() {
    // Trigger the loading dialog.
    $(this).trigger('loading', 'analyzing...');

    // Create an analyzer and configuration.
    var analyzer = new Analyzer($$(this).app.db);

    // Create the configuration and do the analisys in the callback.
    var configuration = new Configuration($$(this).app.db, function(configuration) {
        analyze(analyzer, configuration);
    });

}

/**
 * Do the analysis
 * @param analyzer: an instance of the Analyzer object
 * @param configuration: an instance of the configuration object.
 */
function analyze(analyzer, configuration) {
    // Method that analyze the newly imported operations.
    var analyze_new_operations = function(callback) {
        analyzer.get_new_operations(function(view) {
            analyzer.analyze_operations(view, configuration, callback);
        });
    };

    // Method that analyze the outdated operations (configuration has changed).
    var analyze_outdated_operations = function(callback) {
        analyzer.get_outdated_operations(function(view) {
            analyzer.analyze_operations(view, configuration, callback);
        });
    };

    // Analyze the type kind and then hide the loader.
    fork([ analyze_new_operations, analyze_outdated_operations], function() {
        $('#data').trigger('loaded');
    });
}
