function sec11_to_sec211_transition(loaded){
  var svg;
  if (loaded) {
    svg = d3.select("#sec2_1").select("svg")
  } else {
    svg = d3.select("#sec2_1")
      .append('svg')
      .attr('width', width)
      .attr('height', height)
  }

  svg.append("text").attr("class","intro-heading")
  .attr("transform","translate(100,315)")
  .text("Visualizing ML Model Selection").attr("opacity","1")
  .transition().duration(1000).attr("opacity","0")

  svg.append("text").attr("class","intro-subheading")
  .attr("transform","translate(100,350)")
  .text("Created by. Jerry Jones, Hyemi Song, and Kaitlyn Yang").attr("opacity","1")
  .transition().duration(1000).attr("opacity","0")

  var bigCircle = svg.append('circle').attr('fill', 'none')
  .attr('r', '300').attr('cx', '340').attr('cy', '290')
  .attr('stroke', 'black').attr('stroke-dasharray', '4')
  .transition().duration(1000).attr('r','250')
  
  var smallCircle = svg.append('circle').attr('fill', 'none')
  .attr('r', '150').attr('cx', '600').attr('cy', '450')
  .attr('stroke', 'black').attr('stroke-dasharray', '8')
  .transition().duration(1000).attr('r','900')

  smallCircle.remove();
}

async function sec2_1_1(loaded) {
  sec11_to_sec211_transition(loaded);

  await delay(750);
  var svg = d3.select("#sec2_1").select("svg")

  var defs = svg.append('defs')

  defs.append('marker').attr('id', 'startarrow').attr('orient', 'auto').attr('markerHeight', '4')
    .attr('refY', '2').attr('refX', '0').attr('markerWidth', '4').attr('markerUnits', 'strokeWidth')
    .append('polygon').attr('fill', 'white').attr('points', '4 0, 4 4, 0 2')

  defs.append('marker').attr('id', 'endarrow').attr('orient', 'auto').attr('markerHeight', '4')
    .attr('refY', '2').attr('refX', '0').attr('markerWidth', '4').attr('markerUnits', 'strokeWidth')
    .append('polygon').attr('fill', 'white').attr('points', '0 0, 4 2, 0 4')

  var img = svg.append('image')
    .attr('href', 'static/versicolor-photo.jpg')
    .attr('height', '50%')
    .attr('width', '50%')
    .attr('transform', 'translate(170,120)')
    .attr('opacity',0)
    .transition().duration(500).attr('opacity','1')

  const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
  var sepallaxis = svg.append('line').attr('class', 'sepal')
    .attr('stroke', 'white').attr('stroke-width', '2')
    //.attr('stroke-dashoffset', '5').attr('stroke-dasharray', '4')
    .attr('x1', '325').attr('x2', '325')
    .attr('y1', '260').attr('y2', '260')
    .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
    .transition(transitionPath)
    .attr('y1', '360')

  var sepalwaxis = svg.append('line').attr('class', 'sepal')
    .attr('stroke', 'white').attr('stroke-width', '2')
    .attr('x1', '285').attr('x2', '285')
    .attr('y1', '290').attr('y2', '290')
    .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
    .transition(transitionPath)
    .attr('x1', '355')

  svg.append('text').attr('class', 'label').attr('fill', 'white')
    .attr('transform', 'translate(300,375)').text('Sepal').attr('opacity', '0')
    .transition(transitionPath)
    .attr('opacity', '1')

  var petallaxis = svg.append('line').attr('class', 'petal')
    .attr('stroke', 'white').attr('stroke-width', '2')
    .attr('x1', '335').attr('x2', '335')
    .attr('y1', '155').attr('y2', '155')
    .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
    .transition(transitionPath)
    .attr('y2', '240')

  var petalwaxis = svg.append('line').attr('class', 'petal')
    .attr('stroke', 'white').attr('stroke-width', '2')
    .attr('x1', '320').attr('x2', '320')
    .attr('y1', '190').attr('y2', '190')
    .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
    .transition(transitionPath)
    .attr('x1', '353')

  svg.append('text').attr('class', 'label').attr('fill', 'white')
    .attr('transform', 'translate(360,180)').text('Petal').attr('opacity', '0')
    .transition(transitionPath)
    .attr('opacity', '1')
}


