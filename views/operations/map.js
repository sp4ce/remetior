function(doc) {
    // !code vendor/couchapp/_attachments/jquery.class.js
    // !code _attachments/script/Operation.js
    if (doc.type && doc.type == 'operation') {
        var operation = new Operation(new Date(doc.date), doc.label, doc.value);
        emit(operation.get_key());
    }
}
