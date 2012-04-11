function(e) {
    var app = $$(this).app;
    e.preventDefault();
    var analyzer = new Analyzer($$(this).app.db);
    analyzer.get_operations(function(view) {
        var data = {
            caption: "Operations",
            items: view.rows.map(function(row) {
                return row.doc;
            })
        };
        $('#main').empty().evently('operations', app, data);
    }, true);
}
