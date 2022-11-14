
// function viz13(){
//     var svg = d3.select("#viz_1_3")
//     .append('svg')
//     .attr('width', width)
//     .attr('height', height)  
  
//     var defs = svg.append('defs')
    
//     defs.append('marker').attr('id','startarrow').attr('orient','auto').attr('markerHeight', '4')
//         .attr('refY', '2').attr('refX', '0').attr('markerWidth','4').attr('markerUnits','strokeWidth')
//         .append('polygon').attr('fill','white').attr('points', '4 0, 4 4, 0 2')
  
//     defs.append('marker').attr('id','endarrow').attr('orient','auto').attr('markerHeight', '4')
//         .attr('refY', '2').attr('refX', '0').attr('markerWidth','4').attr('markerUnits','strokeWidth')
//         .append('polygon').attr('fill','white').attr('points', '0 0, 4 2, 0 4')
  
//     var img = svg.append('image')
//      .attr('href', 'static/versicolor-photo.jpg')
//      .attr('height', '50%')
//      .attr('width', '50%')
//      .attr('transform', 'translate(170,120)')
  
//     const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
//     var sepallaxis = svg.append('line').attr('class','sepal')
//       .attr('stroke', 'white').attr('stroke-width', '2')
//       //.attr('stroke-dashoffset', '5').attr('stroke-dasharray', '4')
//       .attr('x1', '325').attr('x2', '325')
//       .attr('y1','260').attr('y2', '260')
//       .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//       .transition(transitionPath)
//       .attr('y1', '360')
  
//     var sepalwaxis = svg.append('line').attr('class','sepal')
//       .attr('stroke', 'white').attr('stroke-width', '2')
//       .attr('x1', '285').attr('x2', '285')
//       .attr('y1','290').attr('y2', '290')
//       .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//       .transition(transitionPath)
//       .attr('x1', '355')
  
//     svg.append('text').attr('class','label').attr('fill','white')
//     .attr('transform', 'translate(300,375)').text('Sepal').attr('opacity','0')
//     .transition(transitionPath)
//     .attr('opacity','1')
  
//     var petallaxis = svg.append('line').attr('class','petal')
//     .attr('stroke', 'white').attr('stroke-width', '2')
//     .attr('x1', '335').attr('x2', '335')
//     .attr('y1','155').attr('y2', '155')
//     .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//     .transition(transitionPath)
//     .attr('y2', '240')
  
//     var petalwaxis = svg.append('line').attr('class','petal')
//       .attr('stroke', 'white').attr('stroke-width', '2')
//       .attr('x1', '320').attr('x2', '320')
//       .attr('y1','190').attr('y2', '190')
//       .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//       .transition(transitionPath)
//       .attr('x1', '353')
  
//     svg.append('text').attr('class','label').attr('fill','white')
//     .attr('transform', 'translate(360,180)').text('Petal').attr('opacity','0')
//     .transition(transitionPath)
//     .attr('opacity','1')
//   }
  


// async function viz14(){
//     var svg = d3.select("#viz_1_3")
//     .select('svg')
  
//     const transitionPath = d3.transition().ease(d3.easeSin).duration(1000);
    
//     svg.select('image').attr('opacity',1).transition(transitionPath).attr('opacity', 0)
//     svg.select('defs').selectAll('marker').selectAll('polygon').transition(transitionPath).attr('fill','black')
//     svg.selectAll('line.sepal').transition(transitionPath).attr('stroke','black')
//     svg.selectAll('line.petal').transition(transitionPath).attr('stroke','white')
//     svg.selectAll('line.petal').remove()
//     svg.selectAll('text.label').remove()
  
//     await delay(500);
  
//     svg.selectAll('line')
  
//     svg.append('ellipse').attr('fill','none').attr('rx','400').attr('ry','400').attr('cx','320').attr('cy','310')
//         .attr('stroke','black').attr('stroke-dasharray','4')
//         .transition().duration(1000).attr('rx','50').attr('ry','70')
  
//     svg.append('text').attr('class','label').attr('fill','black')
//       .text('versicolor').attr('transform','translate(285,225)').attr('opacity','0')
//       .transition().duration(1000).attr('opacity','1')
  
//     await delay(500);
  
//     // Setosa:
//     svg.append('line').attr('class','sepal')
//       .attr('stroke', 'black').attr('stroke-width', '2')
//       .attr('x1', '325').attr('x2', '325')
//       .attr('y1','350').attr('y2', '270')
//       .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//       .transition().duration(2000)
//       .attr('x1', '160').attr('x2','160')
  
//     svg.append('line').attr('class','sepal')
//       .attr('stroke', 'black').attr('stroke-width', '2')
//       .attr('x1', '355').attr('x2', '285')
//       .attr('y1','290').attr('y2', '290')
//       .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//       .transition().duration(2000)
//       .attr('x1', '200').attr('x2','120')
//       .attr('y2','310').attr('y1','310')
  
//     svg.append('ellipse').attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','320').attr('cy','310')
//       .attr('stroke','black').attr('stroke-dasharray','4')
//       .transition().duration(2000)
//       .attr('rx','50').attr('ry','50').attr('cx','160')
      
//     svg.append('text').attr('class','label').attr('fill','black')
//       .text('setosa').attr('transform','translate(135,225)').attr('opacity','0')
//       .transition().duration(1000).attr('opacity','1')
  
//     // Virginica:
//     svg.append('line').attr('class','sepal')
//       .attr('stroke', 'black').attr('stroke-width', '2')
//       .attr('x1', '325').attr('x2', '325')
//       .attr('y1','365').attr('y2', '255')
//       .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//       .transition().duration(2000)
//       .attr('x1', '500').attr('x2','500')
  
//     svg.append('line').attr('class','sepal')
//       .attr('stroke', 'black').attr('stroke-width', '2')
//       .attr('x1', '355').attr('x2', '285')
//       .attr('y1','290').attr('y2', '290')
//       .attr('marker-start','url(#startarrow)').attr('marker-end','url(#endarrow)')
//       .transition().duration(2000)
//       .attr('x1', '540').attr('x2','460')
//       .attr('y2','310').attr('y1','310')
  
//     svg.append('ellipse').attr('fill','none').attr('rx','50').attr('ry','70').attr('cx','320').attr('cy','310')
//       .attr('stroke','black').attr('stroke-dasharray','4')
//       .transition().duration(2000)
//       .attr('rx','50').attr('ry','70').attr('cx','500')
      
//     svg.append('text').attr('class','label').attr('fill','black')
//       .text('virginica').attr('transform','translate(470,225)').attr('opacity','0')
//       .transition().duration(1000).attr('opacity','1')
  
//   }