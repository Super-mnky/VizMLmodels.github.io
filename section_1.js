// function viz11(dataset){
//     var svg = d3.select('#viz_1_1').append('svg')
//     .attr('width', width)
//     .attr('height', height)

//     var g = svg.selectAll("g")
//     .data(dataset)
//     .enter()
//     .append("g")
//     .attr("transform", function(d) {
//     return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
//     })

//     svg.append('g').attr('class', 'x axis')
//     .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
//     .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

//     svg.append('g').attr('class', 'y axis')
//     .attr("transform", "translate("+(widthMargin+heightMargin)+",0)")
//     .call(d3.axisLeft(widthScale));

//     svg.append('text')
//       .attr('class', 'label')
//       .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
//       .text('Sepal Length');

//     svg.append('text')
//       .attr('class', 'label')
//       .attr('transform','translate('+widthMargin+','+(height - heightMargin)/2+') rotate(90)')
//       .text('Sepal Width');

//     d3.selectAll('#b2')
//     .on('click', function(d){
//         // Remove the currently selected classname from that element
//           var circles = svg.selectAll("g")
//           .data(dataset)
//           .enter()
//           g.append("circle")
//           .attr("r", 3.5)
//           .attr('fill', function(d) {
//             if (d.Species == 'Iris-virginica') {
//               return 'orange';
//             } else {
//             if (d.Species == 'Iris-versicolor') {
//               return 'red';
//             } else {
//             if (d.Species == 'Iris-setosa') {
//               return 'blue';
//             }}}})});

//     d3.selectAll('#b1')
//     .on('click', function(){
//         // Remove the currently selected classname from that element
//       var circles = svg.selectAll("g")
//           .data(dataset)
//           .enter()
//           g.append("circle")
//           .attr("r", 3.5)
//           .attr('fill','black')


//     });
// }