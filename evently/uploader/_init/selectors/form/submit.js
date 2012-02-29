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
                            parse_uploaded_document(doc_id, form, socgen_parser);
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
 * @param parser: the specific parser that will be called for each operations.
 */
function parse_uploaded_document(doc_id, form, parser) {
    // Get the uploaded document.
    $.get($$(form).app.db.uri + doc_id, function(data) {
        for (var attachment_id in JSON.parse(data)._attachments) {
            // Get the attachments of the document. we should have only one attachment here in fact.
            $.get($$(form).app.db.uri + doc_id + '/' + attachment_id, function(data) {
                // Read cvs formatted line.
                parser(data, function(operation) {
                    operation.type = 'operation';
                    $$(form).app.db.saveDoc(operation);
                });
                // Reset the state of the form and hide the loading bar.
                form.reset();
                $(form).trigger('loaded');
            });
        }
    });
}

/**
 * The parser takes the raw string data and call the call back for each operation.
 * @param data: the data file as string.
 * @param callback: teh callback for each operation.
 */
function socgen_parser(data, callback) {
    $.each(CSVToArray(data, ';'), function(index, line) {
        if (index < 3) {
            return; // offset in the csv file.
        }
        callback({
            date: socgen_parse_date(line[0]),
            label: $.trim(line[2]),
            value: parseFloat(line[3])
        });
    });
}

/**
 * Parse the date given
 * @param value: the string value of the date.
 * @return: the date object.
 */
function socgen_parse_date(value) {
    var values = value.split('/');
    var date = new Date();
    date.setDate(values[0]);
    date.setMonth(parseInt(values[1]) - 1);
    date.setFullYear(values[2]);
    return date;
}

/**
 * This will parse a delimited string into an array of
 * arrays. The default delimiter is the comma, but this
 * can be overriden in the second argument.
 * credits: http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
 * @param strData: the delimited string.
 * @param strDelimiter: the optional delimiter, ',' by default.
 */
function CSVToArray(strData, strDelimiter){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
            (
                    // Delimiters.
                    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                    // Quoted fields.
                    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                    // Standard fields.
                    "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                    strMatchedDelimiter.length &&
                    (strMatchedDelimiter != strDelimiter)
                    ){

                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push( [] );

            }


            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    var strMatchedValue = arrMatches[ 2 ].replace(
                            new RegExp( "\"\"", "g" ),
                            "\""
                            );

            } else {

                    // We found a non-quoted value.
                    var strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}
