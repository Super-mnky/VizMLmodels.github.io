//center dot three
async function sec2_1_1_1(loaded) {
  var svg;
  if (loaded) {
    svg = d3.select("#sec2_1_1")
      .select('svg')
  } else {
  svg = d3.select("#sec2_1_1").append("svg")
      .attr("width", w_width).attr("height", w_height)
  visContainer = svg.append('g').attr("class", "iris")
      .attr('transform', function(d, i) {return 'translate('+ (w_width/2) +','+(w_height/2.2) +')'})
  }

  var radius = 400;
  var size = 5.1 
  var size1 = 3.3

  d3.select("#sec2_1").select("svg").select("defs").remove()
  var defs = svg.append('defs')

  defs.append('marker').attr('id', 'startarrow').attr('orient', 'auto').attr('markerHeight', '4')
    .attr('refY', '2').attr('refX', '0').attr('markerWidth', '4').attr('markerUnits', 'strokeWidth')
    .append('polygon').attr('fill', mainColor['darkblue']).attr('points', '4 0, 4 4, 0 2')

  defs.append('marker').attr('id', 'endarrow').attr('orient', 'auto').attr('markerHeight', '4')
    .attr('refY', '2').attr('refX', '0').attr('markerWidth', '4').attr('markerUnits', 'strokeWidth')
    .append('polygon').attr('fill', mainColor['darkblue']).attr('points', '0 0, 4 2, 0 4')
  
  svg.select('image').attr('opacity',1).transition(transition_500).attr('opacity', 0)
  svg.select('defs').selectAll('marker').selectAll('polygon').transition(transition_800).attr('fill',mainColor['darkblue'])
  svg.selectAll('line.sepal').transition(transition_800).attr('stroke',mainColor['darkblue'])
  // svg.selectAll('line.petal').transition(transitionPath).attr('stroke','white')
  svg.selectAll('line.petal').remove()
  svg.selectAll('line.sepalAnnotate').remove()
  // svg.selectAll('line.sepal').remove()
  svg.selectAll('text.label').remove()
  svg.selectAll('circle.bcCircle').remove()

  //versicolor, center circle
  var centerCircle = visContainer.append('ellipse').attr("class", "irisCircle")
    .attr('fill', mainColor['yellow'])
    .attr('rx',radius*0.5).attr('ry', radius*0.5).attr('cx',0).attr('cy',0)
    .attr('stroke',mainColor['darkblue']).attr('stroke-dasharray','4')
    .attr('rx',radius*0.5).attr('ry', radius*0.5).attr('cx',0).attr('cy',0)
    .attr('stroke',mainColor['darkblue']).attr('stroke-dasharray','4')
    .attr('stroke-width','1')
    .transition(transition_500)
    .attr('rx',radius*0.2).attr('ry', radius*0.2)
    .attr('fill', "none")
    .attr('stroke',mainColor['yellow'])
    .attr('stroke-width','3')

  var sepallaxis = visContainer.append('line').attr('class','sepal sepalAxisX')
    .attr('stroke', mainColor['darkblue']).attr('stroke-width', '2')
    .attr('x1','0').attr('x2', '0')
    .attr('y1','124').attr('y2', '10')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
  
  var sepalwaxis = visContainer.append('line').attr('class','sepal sepalAxisY')
    .attr('stroke', mainColor['darkblue']).attr('stroke-width', '2')
    .attr('x1','57').attr('x2', '-52')
    .attr('y1','60').attr('y2', '60')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
 
    await delay(500);

    svg.selectAll('line')
    //versicolor
    visContainer.append('text').attr('class','label_iris irisCircle').attr('fill',mainColor['darkblue'])
    .text('Versicolor').attr('transform','translate(-48, -110)').attr('opacity','0')
    .transition(transition_1000).attr('opacity','1')

    svg.selectAll('line.sepalAxisX').transition(transition_800).attr('y1','78').attr('y2', '-73')
    svg.selectAll('line.sepalAxisY').transition(transition_800).attr('x1', '78').attr('x2', '-72').attr('y1', '15').attr('y2', '15')

    await delay(800);

    //Setosa:
    visContainer.append('ellipse').attr("class", "irisCircle")
    .attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','0').attr('cy','0')
    .attr('stroke', mainColor['yellow']).attr('stroke-dasharray','4')
    .attr('stroke-width','1')
    .transition().duration(duration_800)
    .attr('rx','70').attr('ry','58').attr('cx','250')
    .attr('stroke-width','3')

    visContainer.append('text').attr("class", "label_iris irisCircle")
    .attr('fill',mainColor['darkblue'])
    .text('Setosa').attr('transform','translate(215,-110)').attr('opacity','0')
    .transition().duration(duration_800).attr('opacity','1')

    visContainer.append('line').attr('class','sepal irisCircle')
    .attr('stroke', mainColor['darkblue']).attr('stroke-width', '2')
    .attr('x1', '0').attr('x2', '0')
    .attr('y1','57').attr('y2', '-48')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(duration_800)
    .attr('x1', '261').attr('x2','261')

    visContainer.append('line').attr('class','sepal irisCircle')
    .attr('stroke', mainColor['darkblue']).attr('stroke-width', '2')
    .attr('x1', '0').attr('x2', '0')
    .attr('y1','0').attr('y2', '0')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(duration_800)
    .attr('x1', '180').attr('x2','310')

    // Virginica:
    visContainer.append('ellipse').attr("class", "irisCircle")
    .attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','0').attr('cy','0')
    .attr('stroke',mainColor['yellow']).attr('stroke-dasharray','4')
    .attr('stroke-width','1')
    .transition().duration(duration_800)
    .attr('rx','50').attr('ry','70').attr('cx','-250')
    .attr('stroke-width','3')

    visContainer.append('text').attr('class','label_iris irisCircle')
    .attr('fill',mainColor['darkblue'])
    .text('Virginica').attr('transform','translate(-290, -110)').attr('opacity','0')
    .transition().duration(duration_800).attr('opacity','1')

    visContainer.append('line').attr('class','sepal irisCircle')
    .attr('stroke', mainColor['darkblue']).attr('stroke-width', '2')
    .attr('x1', '0').attr('x2', '0')
    .attr('y1','66').attr('y2', '-56')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(duration_800)
    .attr('x1', '-261').attr('x2','-261')

    visContainer.append('line').attr('class','sepal irisCircle')
    .attr('stroke', mainColor['darkblue']).attr('stroke-width', '2')
    .attr('x1', '0').attr('x2', '0')
    .attr('y1','0').attr('y2', '0')
    .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
    .transition().duration(duration_800)
    .attr('x1', '-200').attr('x2','-290')



  /*
  svg.select('image').attr('opacity',1).transition(transitionPath).attr('opacity', 0)
  svg.select('defs').selectAll('marker').selectAll('polygon').transition(transitionPath).attr('fill','black')
  svg.selectAll('line.sepal').transition(transitionPath).attr('stroke','black')
  svg.selectAll('line.petal').transition(transitionPath).attr('stroke','white')
  svg.selectAll('line.petal').remove()
  svg.selectAll('text.label').remove()

  await delay(500);
  */

  // d3.select("#sec2_1").select("svg").select("defs").remove()
  // var defs = svg.append('defs')

  // defs.append('marker').attr('id', 'startarrow').attr('orient', 'auto').attr('markerHeight', '4')
  //   .attr('refY', '2').attr('refX', '0').attr('markerWidth', '4').attr('markerUnits', 'strokeWidth')
  //   .append('polygon').attr('fill', 'black').attr('points', '4 0, 4 4, 0 2')

  // defs.append('marker').attr('id', 'endarrow').attr('orient', 'auto').attr('markerHeight', '4')
  //   .attr('refY', '2').attr('refX', '0').attr('markerWidth', '4').attr('markerUnits', 'strokeWidth')
  //   .append('polygon').attr('fill', 'black').attr('points', '0 0, 4 2, 0 4')
  
  // const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
  // var sepallaxis = svg.append('line').attr('class', 'sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '0').attr('x2', '0')
  //   .attr('y1','57').attr('y2', '-48')
  //   .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')


  // var sepalwaxis = svg.append('line').attr('class', 'sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '355').attr('x2', '285')
  //   .attr('y1', '290').attr('y2', '290')
  //   .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')

  // svg.selectAll('line')

  // svg.append('ellipse').attr('fill', 'none').attr('rx', '300').attr('ry', '300').attr('cx', '320').attr('cy', '310')
  //   .attr('stroke', 'black').attr('stroke-dasharray', '4')
  //   .transition().duration(1000).attr('rx', '50').attr('ry', '70')

  // svg.append('text').attr('class', 'label').attr('fill', 'black')
  //   .text('versicolor').attr('transform', 'translate(285,225)').attr('opacity', '0')
  //   .transition().duration(1000).attr('opacity', '1')

  // await delay(1500);

  // // Setosa:
  // svg.append('line').attr('class', 'sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '325').attr('x2', '325')
  //   .attr('y1', '350').attr('y2', '270')
  //   .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('x1', '160').attr('x2', '160')

  // svg.append('line').attr('class', 'sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '355').attr('x2', '285')
  //   .attr('y1', '290').attr('y2', '290')
  //   .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('x1', '200').attr('x2', '120')
  //   .attr('y2', '310').attr('y1', '310')

  // svg.append('ellipse').attr('fill', 'none').attr('rx', '50').attr('ry', '70').attr('cx', '320').attr('cy', '310')
  //   .attr('stroke', 'black').attr('stroke-dasharray', '4')
  //   .transition().duration(2000)
  //   .attr('rx', '50').attr('ry', '50').attr('cx', '160')

  // svg.append('text').attr('class', 'label').attr('fill', 'black')
  //   .text('setosa').attr('transform', 'translate(135,225)').attr('opacity', '0')
  //   .transition().duration(1000).attr('opacity', '1')

  // // Virginica:
  // svg.append('line').attr('class', 'sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '325').attr('x2', '325')
  //   .attr('y1', '365').attr('y2', '255')
  //   .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('x1', '500').attr('x2', '500')

  // svg.append('line').attr('class', 'sepal')
  //   .attr('stroke', 'black').attr('stroke-width', '2')
  //   .attr('x1', '355').attr('x2', '285')
  //   .attr('y1', '290').attr('y2', '290')
  //   .attr('marker-start', 'url(#startarrow)').attr('marker-end', 'url(#endarrow)')
  //   .transition().duration(2000)
  //   .attr('x1', '540').attr('x2', '460')
  //   .attr('y2', '310').attr('y1', '310')

  // svg.append('ellipse').attr('fill', 'none').attr('rx', '50').attr('ry', '70').attr('cx', '320').attr('cy', '310')
  //   .attr('stroke', 'black').attr('stroke-dasharray', '4')
  //   .transition().duration(2000)
  //   .attr('rx', '50').attr('ry', '70').attr('cx', '500')

  // svg.append('text').attr('class', 'label').attr('fill', 'black')
  //   .text('virginica').attr('transform', 'translate(470,225)').attr('opacity', '0')
  //   .transition().duration(1000).attr('opacity', '1')

}
