export default class Charts {

    createTrend(){
        const defaultMonths = ["", "", "", "", "", "", "", "", "", "", "", ""];
        const defaultData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        createTrend(defaultMonths, defaultData);
    }

    updateTrend(categories, data){
        updateTrend(categories, data);
    }
}

const createTrend = (categories, data) => {
    Highcharts.chart('trend-graph', {
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'hours',
            }
        },
        series: [{
            type: 'column',
            data: data,
            showInLegend: false
        }],
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: '#808080',
                fontWeight: 'bold',
                fontSize: '14px'
            },
            symbolRadius: 0
        },
        chart: {
            height: 300
        }
    });
}

const updateTrend = (categories, data) => {
    Highcharts.charts[0].xAxis[0].update({categories: categories});
    Highcharts.charts[0].series[0].update({data: data});
}