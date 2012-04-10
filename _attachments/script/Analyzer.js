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
     */
    get_operations: function(callback) {
        this.db.view('remetior/operations', {
            success: callback
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
                startkey: configuration.doc.last_modification
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
                endkey: configuration.doc.last_modification
            })
        });
    },
});
