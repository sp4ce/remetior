function(e) {
    e.preventDefault();
    var form = this;
 
    // Check the status of the form. 
    if (this._attachments.value == '') {
        alert('Please provide a file.');
        return;
    }

    // Generate the document id.
    var now = new Date();
    var doc_id = 'upload_' + now.getTime(); 

    // Create a document and add attachements to it.
    $$(this).app.db.saveDoc({
            _id: doc_id,
        }, {
            success: function(result) { 
                // Update the _rev value of the created document.
                form._rev.value = result.rev;

                // Send the attachments of the form. 
                $(form).ajaxSubmit({
                    url: $$(form).app.db.uri + doc_id,
                    success: function(resp) {
                        if (resp.match('ok')){ 
                            parse_uploaded_document(doc_id); 
                        } else if (resp.match('error')) { 
                            alert('error'); 
                        } 
                    } // End of form ajax submit success callback.
                }); // End of form ajax submit.
            } // End of save doc success callback.
        } // End of save doc options.
    ); // End of save doc.
}

/**
 * Parse the uploaded document to store entries in the couch db database.
 * @param doc_id: the document id where the attachement is.
 */
function parse_uploaded_document(doc_id) {
    //TODO
    alert('parsing');
}

