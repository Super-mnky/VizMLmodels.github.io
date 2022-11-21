//_4_comparison

function sec4_1_1(){

  var lengthScale = d3.scaleLinear()
  .domain([0.0,8]).range([heightMargin, height-heightMargin]);


  var widthScale = d3.scaleLinear()
  .domain([1.8,4.5]).range([height-heightMargin, heightMargin]);

  function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
  }

  function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
  }

  d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)

    var svg = d3.select('#sec4_1').append('svg')
    .attr('width', width)
    .attr('height', height)

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

    svg.append('text')
      .attr('class', 'label')
      .attr('id', 'sepal_length_label')
      .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
      .text('Length');

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
            return ("translate(" + scaleLength(d.SepalLengthCm) + "," + 325 + ")")  //magic number to bring down dots
    })

    svg.selectAll("g")
      .data(dataset)
      .enter()
      g.append("circle")
      .attr("r", 4.5)
      .attr('class','circle-a')
      .style("opacity", 0.7)
      .attr('fill', function(d) {
        if (d.Species == 'Iris-virginica') {
          return 'orange';
        } else {
        if (d.Species == 'Iris-versicolor') {
          return 'red';
        } else {
        if (d.Species == 'Iris-setosa') {
          return 'blue';
        }}}})

    svg.selectAll("g")
      g.append("circle")
      .attr('class','circle-b')
      .attr("r", 2.5)
      .style("opacity", 1)


    svg.selectAll("circle")
      .transition().delay(function(d,i) {return i * 20;})
      .duration(1500)
      .attr("transform", function(d) {
        if (d.Species == 'Iris-virginica') {
          return ("translate(" + 0 + "," + 75 + ")");
        } else {
        if (d.Species == 'Iris-versicolor') {
          return ("translate(" + 0 + "," + 0 + ")");
        } else {
        if (d.Species == 'Iris-setosa') {
          return ("translate(" + 0 + "," + -75 + ")");
        }}}
      })

  svg.selectAll(".circle-a")
      .transition()
      .delay(7000)
      .duration(1500)
      .attr("transform", function(d) {
        if (d.Species == 'Iris-virginica') {
          return ("translate(" + 0 + "," + 65 + ")");
        } else {
        if (d.Species == 'Iris-versicolor') {
          return ("translate(" + 0 + "," + 10 + ")");
        } else {
        if (d.Species == 'Iris-setosa') {
          return ("translate(" + 0 + "," + -65 + ")");
        }}}
      })

  svg.selectAll(".circle-b")
      .transition()
      .delay(7000)
      .duration(1500)
      .attr("transform", function(d) {
        if (d.Species == 'Iris-virginica') {
          return ("translate(" + 0 + "," + 85 + ")");
        } else {
        if (d.Species == 'Iris-versicolor') {
          return ("translate(" + 0 + "," + -10 + ")");
        } else {
        if (d.Species == 'Iris-setosa') {
          return ("translate(" + 0 + "," + -85 + ")");
        }}}
      })
  });
}

//display chart
//var myChart411 = sec4_1_1(); @@JJ4 Commented out to roll with ST

function display_sec4_1_1(error, data) {
    sec4_1_1()
    if (error) {
      console.log(error);
    }
}
  