function(data) {
     for (var i in data.charts) {
         var chart = new google.visualization.LineChart(document.getElementById('chart_' + i));
         chart.draw(data.charts[i], data.options[i]);
     }
}
