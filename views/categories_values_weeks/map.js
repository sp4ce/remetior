function(doc) {
    // !code _attachments/script/Date.js

    if (doc.type && doc.type == 'operation' && doc.categories) {
        var date = new Date(doc.date);
        for(var i in doc.categories) {
            emit(doc.categories[i] + '-' + date.getFullYear() + '_' + date.getWeek(), doc.value);
        }
    }
}
