/**
 * This class describes the configuration and do interaction with the database.
 */
var Configuration = Class.extend({

    /**
     * Initialize the object from the database.
     * @param db: the database object.
     * @param callback: what to do after object initialization.
     */
    init: function(db, callback) {
        this.db = db;
        var object = this;

        // Find the configuration the the database.
        db.openDoc('configuration', {
            success: function(doc) {
                object.doc = doc;
                if (callback) {
                    callback(object);
                }
            },
            // If the configuration is not found, create one.
            error: function(){
                var doc = { _id: 'configuration' };
                db.saveDoc(doc, {
                    success: function(doc) {
                        object.doc
                        if (callback) {
                            callback(doc);
                        }
                    }
                });
            },
        });
    },

    /**
     * Delete a category in the configuration
     * @param name: the name of the category to delete.
     */
    delete_category : function(name) {
       // Grep the category for the category with the same name.
       this.doc.categories = $.grep(this.doc.categories, function(category) {
           return category.name != name;
       });

       // Save the doc in the db.
       this.db.saveDoc(this.doc);
    },

    /**
     * Get the given category according to name.
     * @param name: the name of the category.
     */
    get_category: function(name) {
        var grep = $.grep(this.doc.categories, function(category) {
            return category.name == name;
        });

        return grep.length == 0 ? null : grep[0];
    },

    /**
     * Add a new category in the configuration
     * @param name: the name of the category.
     */
    add_category: function(name) {
        // Create the category object.
        var category = { name: name };

        // Modify the configuration object.
        if (this.doc.categories) {
            this.doc.categories.push(category);
        } else {
            this.doc.categories = [ category ];
        }

        // Save it to the database.
        this.db.saveDoc(this.doc);
    },

    /**
     * Save the doc in the database.
     */
    save: function() {
        this.db.saveDoc(this.doc);
    },
});
