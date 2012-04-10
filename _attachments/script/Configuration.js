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
                var doc = { _id: 'configuration', last_modification: new Date() };
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
     * @param index: the index of the category to delete.
     */
    delete_category : function(index) {
       // Grep the category for the category with the same name.
       this.doc.categories = this.doc.categories.filter(function(category, idx) {
           return idx != index;
       });

       // Save the doc in the db.
       this.save();
    },

    /**
     * Get the given category according to name.
     * @param name: the index of the category.
     */
    get_category: function(index) {
        if (this.doc.categories && index < this.doc.categories.length) {
            return this.doc.categories[index];
        }

        return null;
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
        this.save();
    },

    /**
     * Save the doc in the database.
     */
    save: function() {
        this.doc.last_modification = new Date();
        this.db.saveDoc(this.doc);
    },
});
