import AreaChart from './AreaChart.js';
import StackedAreaChart from './StackedAreaChart.js';

let unemployed;

d3.csv('unemployment.csv', d3.autoType).then(data => {
    unemployed = data;
    console.log(data);

    var categories = data.columns.slice(1, -1);
    unemployed.categories = categories;
    
    for (let i = 0; i < data.length; i++) {
        unemployed[i].date = new Date(data[i].date);
    }

    var area = AreaChart('.area-chart');
    area.update(unemployed);  
    area.on('brushed', function(range) {
        stacked.filterByDate(range);
    });

    var stacked = StackedAreaChart('.stacked-chart');
    stacked.update(unemployed);

});