function(e, data) {
    data.items = data.items.map(function(operation) {
        operation.date = new Date(operation.date).toLocaleDateString();
        return operation;
    });

    return data;
}
