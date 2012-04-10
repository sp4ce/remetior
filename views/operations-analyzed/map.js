function(doc) {
   if (doc.type && doc.type == 'operation' && doc.analyzed_date) {
       emit(doc.analyzed_date, doc);
   } 
}

