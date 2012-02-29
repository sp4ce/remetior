function(e) {
    e.preventDefault();
    var form = this;
 
    // Check the status of the form. 
    if (form._attachments.value == '') {
        alert('Please provide a file.');
        return;
    }

    // Show the loading widget.
    $(form).trigger('loading', 'uploading...');

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
                            $(form).trigger('update_label', 'parsing...'); 
                            parse_uploaded_document(doc_id, form); 
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
 * @param form: the html form element used to send the file.
 */
function parse_uploaded_document(doc_id, form) {
    //TODO

    // Reset the state of the form and hide the loading bar.
    form.reset();
    $(form).trigger('loaded');
}

