//_4_comparison

function sec4_2_1(){

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
    var svg = d3.select('#sec4_2').append('svg')
    .attr('width', width)
    .attr('height', height)

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
    return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
    })

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

    svg.append('g').attr('class', 'y axis')
    .attr("transform", "translate("+(widthMargin+heightMargin)+",0)")
    .call(d3.axisLeft(widthScale));

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
      .text('Sepal Length');

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+widthMargin+','+(height - heightMargin)/2+') rotate(90)')
      .text('Sepal Width');

    var circles = svg.selectAll("g")
          console.log('showing dots')
          g.append("circle")
          .transition()
              .delay(function(d,i) {return i * 20;})
              .duration(750)
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

  });
}

//display chart
//var myChart421 = sec4_2_1(); @@JJ4 removed to load with scrolly telly

function display_sec4_2_1(error, data) {
  sec4_2_1()
  if (error) {
    console.log(error);

  }
}
