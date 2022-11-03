//var main = d3.select('#main');
irisLength = []
irisWidth = []


d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)

    for (i=0;i<dataset.length;i++){
        irisLength.push(dataset[i]['SepalLengthCm'])
        irisWidth.push(dataset[i]['SepalWidthCm'])
    }

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
    return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
    })

    /*
    var text = svg.selectAll("g")
    .data(dataset)
    .enter()
    g.append("text")
    .attr('class', 'info')
    .text(function(d) {
    return (d.Id)
    })
     */

    var circles = svg.selectAll("g")
    .data(dataset)
    .enter()
    g.append("circle")
    .attr("r", 2)

});

function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
}

function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
}
var svg = d3.select('svg');

var lengthScale = d3.scaleLinear()
    .domain([3.3,8.9]).range([60,700]);

var widthScale = d3.scaleLinear()
    .domain([1,5.4]).range([340,20]);

svg.append('g').attr('class', 'x axis')
    .attr('transform', 'translate(0,345)')
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

svg.append('g').attr('class', 'y axis')
    .attr('transform', 'translate(55,0)')
    .call(d3.axisLeft(widthScale));

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(360,390)')
    .text('Sepal Length');

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(15,200) rotate(90)')
    .text('Sepal Width');

