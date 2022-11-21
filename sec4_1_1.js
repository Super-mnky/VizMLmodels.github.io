//_4_comparison

function sec4_1_1(){

  var lengthScale = d3.scaleLinear()
  .domain([4,8]).range([heightMargin, height-heightMargin]);

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


    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
    return ("translate(" + scaleLength(d.SepalLengthCm) + "," + 325 + ")")  //magic number to bring down dots
    //return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
    })

    var circles = svg.selectAll("g")
          .data(dataset)
          .enter()
          g.append("circle")
          .attr("r", 3.5)
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

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

    svg.append('text')
      .attr('class', 'label')
      .attr('id', 'sepal_length_label')
      .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
      .text('Click Me');



    d3.selectAll('#sepal_length_label')
    .on('click', function(d){
        // Remove the currently selected classname from that element
      console.log("Clicked the animation button")

      svg.selectAll("g")
          .data(dataset)
          .enter()
      svg.selectAll("circle")
          .transition()
          .duration(752)
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
    });
  });
}

//display chart
var myChart411 = sec4_1_1();

function display_sec4_1_1(error, data) {
    if (error) {
      console.log(error);
    }
}
  