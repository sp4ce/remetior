function(doc) {
    if (doc.type && doc.type == 'operation' && doc.categories) {
        var date = new Date(doc.date);
        for(var i in doc.categories) {
            emit(doc.categories[i] + '_' + (date.getMonth() + 1), doc.value);
        }    
    }
}
