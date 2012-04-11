function(data) {
    // Build the charts
    data.charts = []
    data.options = [];

    // Build the chart for the month report.
    var chart = new google.visualization.DataTable();
    data.charts.push(chart);
    chart.addColumn('string', 'Month');
    data.options.push({
       title: 'Categories trends per month'
     });

    // Aggregate the result for month into one object per month.
    var categories = [];
    var aggregate = {};
    for (var i in data.categories_values_months) {
        var row = data.categories_values_months[i]; 
        var category = row.key.split('-')[0];
        var month = row.key.split('-')[1];
        var month_aggregate = aggregate[month] = aggregate[month] || {};
        month_aggregate[category] = row.value.sum;
        if ($.grep(categories, function(c) { return c == category; }).length == 0) {
            chart.addColumn('number', category);
            categories.push(category);
        }
    }
   
    // Build the google chart for the months
    var rows = [];
    for (var month in aggregate) {
       var row = [ month ];
       rows.push(row);
       for (var i in categories) {
           var category = categories[i];
           row.push(aggregate[month][category] || 0);
       }
    }
    chart.addRows(rows);

    return data;
}
