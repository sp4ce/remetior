function(data) {
     for (var i in data.charts) {
         // Draw table.
         var table = new google.visualization.Table(document.getElementById('table_' + i));
         table.draw(data.charts[i]);

         // Draw chart.
         var chart = new google.visualization.LineChart(document.getElementById('chart_' + i));
         chart.draw(data.charts[i], data.options[i]);
     }
}
