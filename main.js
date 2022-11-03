//var main = d3.select('#main');

d3.csv('iris.csv').then(function(dataset) {
    console.table(dataset)
    console.log("Line 1: inside the callback function");

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")

    var circles = svg.selectAll("g")
    .data(dataset)
    .enter()
    g.append("circle")
    .attr("r", 2)

})

/*

var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  mode: 'markers',
  type: 'scatter'
};

var data = [trace1];

Plotly.newPlot('chart', data);

 */
