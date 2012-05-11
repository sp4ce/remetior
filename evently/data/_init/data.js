function(data) {
    // Build the charts
    data.charts = []
    data.options = [];

    create_chart_month(data);
    create_chart_week(data);

    return data;
}

/**
 * Create and aggregate the data for the month report.
 * @param data: the data object that will be returned at the end.
 */
function create_chart_month(data) {
    // Build the chart_month for the month report.
    var chart_month = new google.visualization.DataTable();
    data.charts.push(chart_month);
    chart_month.addColumn('string', 'Month');
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
            chart_month.addColumn('number', category);
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

    chart_month.addRows(rows);
}


/**
 * Create and aggregate the data for the week report.
 * @param data: the data object that will be returned at the end.
 */
function create_chart_week(data) {
    // Build the chart_week for the week report.
    var chart_week = new google.visualization.DataTable();
    data.charts.push(chart_week);
    chart_week.addColumn('string', 'week');
    data.options.push({
       title: 'Categories trends per week'
     });

    // Aggregate the result for week into one object per week.
    var categories = [];
    var aggregate = {};
    for (var i in data.categories_values_weeks) {
        var row = data.categories_values_weeks[i];
        var category = row.key.split('-')[0];
        var week = row.key.split('-')[1];
        var week_aggregate = aggregate[week] = aggregate[week] || {};
        week_aggregate[category] = row.value.sum;
        if ($.grep(categories, function(c) { return c == category; }).length == 0) {
            chart_week.addColumn('number', category);
            categories.push(category);
        }
    }

    // Build the google chart for the weeks
    var rows = [];
    for (var week in aggregate) {
       var row = [ week ];
       rows.push(row);
       for (var i in categories) {
           var category = categories[i];
           row.push(aggregate[week][category] || 0);
       }
    }

    chart_week.addRows(rows);
}

