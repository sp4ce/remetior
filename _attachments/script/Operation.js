/**
 * This class define an operation, it has a date, a value and a label.
 */
var Operation = Class.extend({

    /**
     * Initialize the operation with a given date, label and value.
     */
    init: function(date, label, value) {
        this.type = 'operation'
        this.date = date ? date.getTime(): null;
        this.label = label;
        this.value = value;
    },

    /**
     * Return true if the operation is valid (ie, contains valid data).
     */
    is_valid: function() {
        return this.date && this.label && this.value;
    },

    /**
     * Get a key for the operation in the view that get all the operations.
     */
    get_key: function() {
        return [this.date, this.label.toLowerCase().replace(/ +/g, '_'), this.value];
    },
});
