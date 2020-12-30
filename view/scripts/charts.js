export default class Charts {
    createTrend(entries){
        createTrend(entries)
    }

    updateTrend(entries){
        updateTrend(entries)
    }
}

const createTrend = (entries) => {
    Highcharts.chart('trend-graph', {
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'hours',
            }
        },
        series: [{
            type: 'column',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
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
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 480
                },
                chartOptions: {
                    legend: {
                        enabled: false
                    }
                }
            }]
        }
    });
}


const updateTrend = (entries) => {
    Highcharts.charts[1].series[0].setData(
        entries
    )
}