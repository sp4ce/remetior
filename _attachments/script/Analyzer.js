/**
 * This class describes the analyer. All the work that should be done
 * to analyze the operations stored in the data base.
 */
var Analyzer = Class.extend({

    /**
     * Initialize the object from the database.
     * @param db: the database object.
     */
    init: function(db) {
        this.db = db;
    },

    /**
     * Get the total count of operations.
     * @param callback: call with the view data.
     * @param include: include the operation document in the result).
     */
    get_operations: function(callback, include) {
        this.db.view('remetior/operations', {
            success: callback,
            include_docs: include || false
        });
    },

    /**
     * Get the newly inserted operations.
     * @param callback: call with the view data.
     */
    get_new_operations: function(callback) {
        this.db.view('remetior/operations-new', {
            success: callback
        });
    },

    /**
     * Get the operations that are outdated (new configuration)
     * @param callback: call with the view data.
     */
    get_outdated_operations: function(callback) {
        var db = this.db;
        new Configuration(db, function(configuration) {
            db.view('remetior/operations-analyzed', {
                success: callback,
                endkey: configuration.doc.last_modification
            })
        });
    },

    /**
     * Get the operations that analyzed.
     * @param callback: call with the view data.
     */
    get_analyzed_operations: function(callback) {
        var db = this.db;
        new Configuration(db, function(configuration) {
            db.view('remetior/operations-analyzed', {
                success: callback,
                startkey: configuration.doc.last_modification
            })
        });
    },

    /**
     * Analyze the list of operation that belong to the view.
     * @param view: the view that contains the operation to analyze.
     * @param configuration: the configuration object class.
     * @param callback: the callback to execute after the analysis.
     */
    analyze_operations: function(view, configuration, callback) {
        // Get the db object for closure usage.
        var db = this.db;

        // Get each operation and create a save method.
        var saves =  view.rows.map(function(row) {
            // Get all operations and clear the categories array list.
            var operation = row.value;
            operation.categories = [];

            // For each existing categories in the configuration, test it.
            for (var j in configuration.doc.categories) {
                var category = configuration.doc.categories[j];
                for (var k in category.regexes) {
                     var regex = eval('/' + category.regexes[k] + '/');
                     // Test that the categiy is not already added to the list and that the regex work.
                     if ($.grep(operation.categories, function(c) { return c == category.name; }).length == 0
                         && regex.test(operation.label)) {
                         operation.categories.push(category.name);
                     }
                }
            }

            // Update the operation.
            operation.analyzed_date = new Date().getTime();
            return function(callback) { db.saveDoc(operation, { success: callback }); };
        });

        // Fork the save method to have synchronization
        fork(saves, callback);
    },
});
