function(doc) {
    if (doc.type && doc.type == 'operation' && !doc.analyzed_date) {
        emit(null, doc);
    }
}
