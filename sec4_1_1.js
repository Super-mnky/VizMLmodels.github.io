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
    console.log(dataset.length)

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
      .text('Petal Length');

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate('+widthMargin+','+(height - heightMargin - 250)+') rotate(0)')
        .text('Vericolor');

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate('+widthMargin+','+(height - heightMargin - 180)+') rotate(0)')
        .text('Virginica');

    svg.append('text')
        .attr('class', 'label')
        .attr('transform','translate('+widthMargin+','+(height - heightMargin - 325)+') rotate(0)')
        .text('Setosa');

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
        return ("translate(" + scaleLength(d.PetalLengthCm) + "," + 325 + ")")  //magic number to bring down dots
    })

    svg.selectAll("g")
        .data(dataset)
        .enter()
        g.append("circle")
        .attr("r", 4.5)
        .attr('class','circle-a')
        .style("opacity", 0.7)


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
      .attr('fill', function(d) {
            if (d.Species == 'Iris-virginica') {
             console.log('Virginica detected')
              return 'orange';
            } else {
            if (d.Species == 'Iris-versicolor') {
             console.log('Vericolor detected')
              return 'red';
            } else {
            if (d.Species == 'Iris-setosa') {
             console.log('Setosa detected')
              return 'blue';
            }}}})
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
  