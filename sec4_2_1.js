//_4_comparison

function sec4_2_1(loaded){

  var svg;
  if (loaded){
      svg = d3.select("#sec4_2").select("svg").select("g.iris")
  } else {
    svg = d3.select('#sec4_2').append('svg')
      .attr('width', w_width).attr('height', w_height)
    svg = svg.append('g').attr("class", "iris")
      .attr('transform', function(d, i) {return 'translate('+ (w_width/2) +','+(w_height/2.2) +')'})
  }
  
  var lengthScale = d3.scaleLinear()
  .domain([4,8]).range([centered_x, -centered_x]);

  var widthScale = d3.scaleLinear()
  .domain([1.8,4.5]).range([-centered_x, centered_x]);

  function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
  }

  var lengthScalePetal = d3.scaleLinear()
  .domain([0.0, 8]).range([centered_x, -centered_x]);

  function scaleLengthPetal(PetalLengthCm) {
    return lengthScalePetal(PetalLengthCm);
  }

  function yaxisPetal(species){
    if (species == "Iris-versicolor"){
      return 0;
    } else if (species == "Iris-virginica"){
      return 75
    } else {
      return -75
    }
  }

  function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
  }

  var tooltip = floatingTooltip('gates_tooltip', 240);

  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Sepal Length: </span><span class="value">' +
      addCommas(d.SepalLengthCm) +
      'cm</span><br/>' +
      '<span class="name">Sepal Width: </span><span class="value">' +
      addCommas(d.SepalWidthCm) +
      'cm</span><br/>' +
      '<span class="name">Species: </span><span class="value">' +
      d.Species +
      '</span>';

    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    tooltip.hideTooltip();
  }

  d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return ("translate(" + scaleLengthPetal(d.PetalLengthCm) + "," + yaxisPetal(d.Species) + ")");
    })    
    .style("opacity", 0.7)

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+0+","+(-centered_x)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}))

    svg.append('g').attr('class', 'y axis')
    .attr("transform", "translate("+centered_x+",0)")
    .call(d3.axisLeft(widthScale))
    .attr("opacity","0")
    .transition().duration(1000)
    .attr("opacity","1")

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+-50+','+ (-centered_x + 50) +')')
      .text('Sepal Length')
      .attr("opacity","0")
      .transition().duration(1000)
      .attr("opacity","1")  

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+(centered_x - 50)+','+ -50 +') rotate(90)')
      .text('Sepal Width')
      .attr("opacity","0")
      .transition().duration(1000)
      .attr("opacity","1")  

    var circles = svg.selectAll("g")
          console.log('showing dots')
          g.append("circle")
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
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail)  
          .attr("r", 3.5)  
          .transition()
              .delay(function(d,i) {return i * 20;})
              .duration(750)
              .attr("transform", function(d) {
                return ("translate(" + (scaleLength(d.SepalLengthCm)-scaleLengthPetal(d.PetalLengthCm)) 
                + "," + (scaleWidth(d.SepalWidthCm)-yaxisPetal(d.Species)) + ")")
                })
              .style("opacity", 1)

            

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
