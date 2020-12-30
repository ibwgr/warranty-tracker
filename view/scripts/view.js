export default class View {

    constructor(actionBarRootSelector, graph) {
        this.graph = graph
        this.graph.createTrend(0)
    }

    createTrend(entries) {
        this.charts.createTrend(entries)
    }

    updateTrend(entries) {
        this.charts.updateTrend(entries)
    }

}