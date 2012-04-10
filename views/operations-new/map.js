function(doc) {
    if (doc.type && doc.type == 'operation' && !doc.analyze_date) {
        emit(null, doc);
    }
}
