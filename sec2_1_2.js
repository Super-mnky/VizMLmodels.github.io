function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }
  

async function sec2_1_2(){
    var svg = d3.select("#sec2_1")
    .select('svg')
  
    const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
    
    svg.select('image').attr('opacity',1).transition(transitionPath).attr('opacity', 0)
    svg.select('defs').selectAll('marker').selectAll('polygon').transition(transitionPath).attr('fill','black')
    svg.selectAll('line.sepal').transition(transitionPath).attr('stroke','black')
    svg.selectAll('line.petal').transition(transitionPath).attr('stroke','white')
    svg.selectAll('line.petal').remove()
    svg.selectAll('text.label').remove()
  
    await delay(500);
  
    svg.selectAll('line')
  
    svg.append('ellipse').attr('fill','none').attr('rx','400').attr('ry','400').attr('cx','320').attr('cy','310')
        .attr('stroke','black').attr('stroke-dasharray','4')
        .transition().duration(1000).attr('rx','50').attr('ry','70')
  
    svg.append('text').attr('class','label').attr('fill','black')
      .text('versicolor').attr('transform','translate(285,225)').attr('opacity','0')
      .transition().duration(1000).attr('opacity','1')
  
    await delay(1500);
  
    // Setosa:
    svg.append('line').attr('class','sepal')
      .attr('stroke', 'black').attr('stroke-width', '2')
      .attr('x1', '325').attr('x2', '325')
      .attr('y1','350').attr('y2', '270')
      .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
      .transition().duration(2000)
      .attr('x1', '160').attr('x2','160')
  
    svg.append('line').attr('class','sepal')
      .attr('stroke', 'black').attr('stroke-width', '2')
      .attr('x1', '355').attr('x2', '285')
      .attr('y1','290').attr('y2', '290')
      .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
      .transition().duration(2000)
      .attr('x1', '200').attr('x2','120')
      .attr('y2','310').attr('y1','310')
  
    svg.append('ellipse').attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','320').attr('cy','310')
      .attr('stroke','black').attr('stroke-dasharray','4')
      .transition().duration(2000)
      .attr('rx','50').attr('ry','50').attr('cx','160')
      
    svg.append('text').attr('class','label').attr('fill','black')
      .text('setosa').attr('transform','translate(135,225)').attr('opacity','0')
      .transition().duration(1000).attr('opacity','1')
  
    // Virginica:
    svg.append('line').attr('class','sepal')
      .attr('stroke', 'black').attr('stroke-width', '2')
      .attr('x1', '325').attr('x2', '325')
      .attr('y1','365').attr('y2', '255')
      .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
      .transition().duration(2000)
      .attr('x1', '500').attr('x2','500')
  
    svg.append('line').attr('class','sepal')
      .attr('stroke', 'black').attr('stroke-width', '2')
      .attr('x1', '355').attr('x2', '285')
      .attr('y1','290').attr('y2', '290')
      .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
      .transition().duration(2000)
      .attr('x1', '540').attr('x2','460')
      .attr('y2','310').attr('y1','310')
  
    svg.append('ellipse').attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','320').attr('cy','310')
      .attr('stroke','black').attr('stroke-dasharray','4')
      .transition().duration(2000)
      .attr('rx','50').attr('ry','70').attr('cx','500')
      
    svg.append('text').attr('class','label').attr('fill','black')
      .text('virginica').attr('transform','translate(470,225)').attr('opacity','0')
      .transition().duration(1000).attr('opacity','1')
  
  }
  