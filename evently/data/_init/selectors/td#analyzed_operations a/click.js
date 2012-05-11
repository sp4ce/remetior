function(e) {
    var app = $$(this).app;
    e.preventDefault();
    var analyzer = new Analyzer($$(this).app.db);
    analyzer.get_analyzed_operations(function(view) {
        var data = {
            caption: "Analyzed operations",
            items: view.rows.map(function(row) {
                return row.value;
            })
        };
        $('#main').empty().evently('operations', app, data);
    });
}
